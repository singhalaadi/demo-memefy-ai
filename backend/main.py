from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib, requests, random, time, os
import numpy as np
from collections import defaultdict
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

IMGFLIP_USERNAME = os.getenv("IMGFLIP_USERNAME")
IMGFLIP_PASSWORD = os.getenv("IMGFLIP_PASSWORD")
GEMINI_API_KEY   = os.getenv("GEMINI_API_KEY")

if not IMGFLIP_USERNAME or not IMGFLIP_PASSWORD:
    raise ValueError("IMGFLIP credentials not found in environment variables!")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in environment variables!")

client = genai.Client(api_key=GEMINI_API_KEY)

tfidf = joblib.load("artifacts/tfidf_baseline.joblib")
clf   = joblib.load("artifacts/logreg_baseline.joblib")

app = FastAPI(title="Memefy-AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MemeRequest(BaseModel):
    idea: str | None = None
    caption: str | None = None
    template_id: str | None = None

def check_safety(text, threshold=0.5):
    vec = tfidf.transform([text])
    prob = clf.predict_proba(vec)[0][1]
    return prob < threshold, float(prob)

def sentiment_label(prob):
    if prob < 0.15:
        return "Positive / Safe"
    elif prob < 0.35:
        return "Neutral / Sarcastic"
    else:
        return "Risky / Negative"

def gemini_prompt(idea):
    return f"""
You are a meme creator.
Generate a short meme caption.
Style: Hinglish, internet slang.
Tone: Funny, sarcastic, non-offensive.
1–2 lines only.

Idea: {idea}

Caption:
"""

def generate_gemini_caption(idea):
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=gemini_prompt(idea),
            config=types.GenerateContentConfig(
                temperature=0.9,
                max_output_tokens=40
            )
        )
        return response.text.strip() if response.text else f"When {idea} hits different"
    except Exception:
        return f"When {idea} hits different"

def normalize_caption(text):
    for p in ["caption:", "Caption:", "CAPTION:"]:
        if text.startswith(p):
            text = text.replace(p, "", 1)
    return text.replace('"', "").replace("'", "").strip()

def generate_safe_caption(idea, attempts=3):
    for _ in range(attempts):
        raw = generate_gemini_caption(idea)
        caption = normalize_caption(raw)
        safe, prob = check_safety(caption)
        if safe:
            return caption, prob
    return "When the joke is too risky to post 👀", 1.0

# -------------------- IMGFLIP --------------------


def pick_template(templates, box_count):
    candidates = [t for t in templates if t["box_count"] == box_count]
    return random.choice(candidates if candidates else templates)

def fit_caption_to_boxes(caption, box_count):
    if box_count == 1:
        return [caption]
    if box_count == 2:
        return ["", caption]
    return [caption] + [""] * (box_count - 1)

def create_meme(template_id, captions):
    payload = {
        "template_id": template_id,
        "username": IMGFLIP_USERNAME,
        "password": IMGFLIP_PASSWORD
    }
    for i, text in enumerate(captions):
        payload[f"boxes[{i}][text]"] = text
    return requests.post(
        "https://api.imgflip.com/caption_image",
        data=payload
    ).json()

def fetch_templates():
    try:
        response = requests.get("https://api.imgflip.com/get_memes")
        data = response.json()
        if data["success"]:
            return data["data"]["memes"]
        return []
    except Exception:
        return []

template_usage = defaultdict(list)

def update_template_trend(template_id):
    template_usage[template_id].append(time.time())

def is_template_trending(template_id, window=3600, threshold=5):
    now = time.time()
    recent = [t for t in template_usage[template_id] if now - t < window]
    return len(recent) >= threshold, len(recent)

@app.get("/")
def health_check():
    return {"status": "healthy", "message": "Memefy-AI Backend is running!"}

@app.post("/generate-meme")
def generate_meme(req: MemeRequest):

    templates = fetch_templates()

    if req.caption:
        caption = normalize_caption(req.caption)
        _, toxicity = check_safety(caption)
    else:
        idea = req.idea or "life"
        caption, toxicity = generate_safe_caption(idea)

    sentiment = sentiment_label(toxicity)

    # Use provided template ID or let backend pick one
    if req.template_id:
        # Find the specific template by ID
        template = next((t for t in templates if str(t["id"]) == str(req.template_id)), None)
        if not template:
            # Fallback if template not found
            template = pick_template(templates, 1)
    else:
        # Auto-pick template
        template = pick_template(templates, 1)
    
    caption_lines = fit_caption_to_boxes(caption, template["box_count"])

    update_template_trend(template["id"])
    trending, usage = is_template_trending(template["id"])

    result = create_meme(template["id"], caption_lines)

    return {
        "caption": caption,
        "sentiment": sentiment,
        "toxicity_score": round(toxicity, 3),
        "template": template["name"],
        "template_trending": trending,
        "template_recent_usage": usage,
        "meme_url": result["data"]["url"]
    }