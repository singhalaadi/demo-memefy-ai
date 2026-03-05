# Memefy - AI-Powered Meme Generator

A modern meme generator with AI-powered features, built with React and FastAPI.

## Features

- 🎨 AI-powered meme generation using Google Gemini
- 🖼️ Multiple meme templates from Imgflip
- 🎯 Smart text placement and styling
- 💾 Save and manage your memes
- 🔒 User authentication with Firebase
- 📱 Responsive design
- ✨ Real-time meme preview

## Tech Stack

**Frontend:**

- React + Vite
- TailwindCSS
- Firebase (Auth, Firestore, Storage)
- Framer Motion
- React Hot Toast

**Backend:**

- FastAPI (Python)
- Google Gemini AI
- Scikit-learn (ML models)
- Imgflip API

## Installation

### Prerequisites

- Node.js 16+
- Python 3.9+
- Firebase account
- Google Gemini API key
- Imgflip account

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
1. Install dependencies:


2. Install dependencies:
```bash
npm install
```

1. Create `.env` file:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_BACKEND_API_URL=http://localhost:8000
```

1. Start development server:

```bash
npm run dev
```

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

1. Create virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

1. Install dependencies:

```bash
pip install -r requirements.txt
```

1. Create `.env` file:

```env
IMGFLIP_USERNAME=your_imgflip_username
IMGFLIP_PASSWORD=your_imgflip_password
GEMINI_API_KEY=your_gemini_api_key
```

1. Start the server:

```bash
python start.py
```

## Deployment

### Frontend Deployment (Netlify)

1. Build the frontend:

```bash
cd frontend
npm run build
```

1. Deploy to Netlify:

- Connect your GitHub repository to Netlify
- Set build command: `npm run build`
- Set publish directory: `dist`
- Add environment variables in Netlify dashboard

### Backend Deployment

#### Option 1: Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Add environment variables

#### Option 2: Railway

1. Create a new project on Railway
2. Connect your GitHub repository
3. Add environment variables
4. Railway will automatically detect and deploy the FastAPI app

#### Option 3: Google Cloud Run

1. Install Google Cloud SDK
1. Build and deploy:

```bash
cd backend
gcloud run deploy memefy-backend --source . --region us-central1
```

#### Option 4: AWS EC2

1. Launch an EC2 instance (Ubuntu)
1. SSH into the instance
1. Install dependencies:

```bash
sudo apt update
sudo apt install python3-pip python3-venv nginx

1. Clone repository and setup
1. Configure nginx as reverse proxy
1. Configure nginx as reverse proxy
6. Use systemd or PM2 to keep the service running

### Update Frontend with Backend URL

After deploying the backend, update the `VITE_BACKEND_API_URL` in your Netlify environment variables with your backend production URL.

## Environment Variables

### Frontend (.env)

- `VITE_FIREBASE_API_KEY` - Firebase API key
- `VITE_FIREBASE_AUTH_DOMAIN` - Firebase auth domain
- `VITE_FIREBASE_PROJECT_ID` - Firebase project ID
- `VITE_FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `VITE_FIREBASE_APP_ID` - Firebase app ID
- `VITE_FIREBASE_MEASUREMENT_ID` - Firebase measurement ID
- `VITE_GEMINI_API_KEY` - Google Gemini API key
- `VITE_BACKEND_API_URL` - Backend API URL

### Backend (.env)

- `IMGFLIP_USERNAME` - Imgflip account username
- `IMGFLIP_PASSWORD` - Imgflip account password
- `GEMINI_API_KEY` - Google Gemini API key

## API Endpoints

### Backend API

- `GET /` - Health check
- `POST /generate-meme` - Generate meme with AI
  - Body: `{ "idea": "string", "caption": "string", "template_id": "string" }`

## License

MIT

## Contributing

Pull requests are welcome. For major changes, please open an issue first.
