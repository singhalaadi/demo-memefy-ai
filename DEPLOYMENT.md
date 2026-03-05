# Deployment Guide for Memefy

This guide covers detailed deployment instructions for both frontend and backend.

## Frontend Deployment (Netlify) ✅

### Steps

1. Push your code to GitHub
2. Go to [Netlify](https://app.netlify.com/)
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repository
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Base directory:** `frontend`

6. Add environment variables in Netlify dashboard:
   - Go to Site settings → Environment variables
   - Add all your `VITE_*` variables from your `.env` file

7. Deploy!

### Custom Domain (Optional)

- Go to Domain settings → Add custom domain
- Follow Netlify's instructions to configure DNS

---

## Backend Deployment🚀

### 1: Render

**Pros:** Free tier, easy setup, auto-deploy from GitHub
**Cons:** Free tier sleeps after inactivity

#### Setup Steps

1. **Create account** at [Render](https://render.com/)

2. **Create new Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure the service:**
   - **Name:** `memefy-backend`
   - **Region:** Choose closest to your users
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`

4. **Add Environment Variables:**

   ```text
   IMGFLIP_USERNAME=your_username
   IMGFLIP_PASSWORD=your_password
   GEMINI_API_KEY=your_api_key
   ```

5. **Deploy** - Render will automatically build and deploy
6. **Update Frontend:**
   - Go to your Netlify dashboard
   - Update `VITE_BACKEND_API_URL` to your Render URL (e.g., `https://memefy-backend.onrender.com`)
   - Redeploy frontend

---

## Recommended Approach for Beginners: 🌟

1. **Backend:** Use **Render** (free, easy, no credit card needed for free tier)
2. **Frontend:** Keep using **Netlify** (already done)

### Quick Setup with Render

1. Go to render.com → Sign up
2. New → Web Service → Connect GitHub
3. Root Directory: `backend`
4. Build: `pip install -r requirements.txt`
5. Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Add env vars
7. Deploy
8. Copy URL → Update Netlify's `VITE_BACKEND_API_URL`
9. Done! 🎉

---

## After Deployment Checklist ✅

- [ ] Backend is accessible (test the `/` endpoint)
- [ ] Update frontend `VITE_BACKEND_API_URL` with production backend URL
- [ ] Redeploy frontend on Netlify
- [ ] Test meme generation from deployed frontend
- [ ] Check all features work (AI generation, save, download)
- [ ] Monitor backend logs for any errors
- [ ] (Optional) Setup custom domain
- [ ] (Optional) Setup monitoring/alerts

---

## Common Issues & Solutions

### Issue: CORS errors

**Solution:** Ensure backend has CORS middleware configured properly (already done in main.py)

### Issue: Backend sleeps on Render free tier

**Solution:**

- Implement a keep-alive ping from frontend
- Upgrade to paid tier
- Or accept 30-second cold start

### Issue: Environment variables not working

**Solution:**

- Double-check variable names match exactly
- Don't use quotes around values in hosting platforms
- Restart/redeploy after changing env vars

### Issue: Build fails on backend

**Solution:**

- Check Python version compatibility
- Verify all dependencies in requirements.txt
- Check build logs for specific errors

---

## Cost Estimation

### Free Tier Setup

- **Netlify (Frontend):** Free forever for personal projects
- **Render (Backend):** Free (sleeps after 15 min inactivity)
- **Total:** $0/month

### Production Setup

- **Netlify Pro:** $19/month
- **Render Standard:** $7/month
- **Total:** $26/month

### Scalable Setup

- **Netlify Business:** $99/month
- **Google Cloud Run:** ~$10-50/month (depending on usage)
- **Total:** $109-149/month

---

## Need Help?

If you encounter issues:

1. Check the hosting platform's documentation
2. Review error logs in the dashboard
3. Test backend locally first
4. Ensure all environment variables are set correctly

Good luck with your deployment! 🚀
