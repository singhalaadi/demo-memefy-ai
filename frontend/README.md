# 🎨 MEME FACTORY

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-9-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

Modern meme generator with AI assistance running in permanent demo mode - no login required!

[MEMEFY-AI PREVIEW: Click Here](https://memefy-ai.netlify.app/)

## 🎮 Demo Mode Always Active

This version has been modified to run in **permanent demo mode** - no authentication required!

- ✅ Instant access to all features
- ✅ No login screens or signup required
- ✅ Full functionality available immediately
- ✅ All meme creation and editing tools accessible

## ✨ Features

- 🤖 **AI-Powered Meme Creation** - Smart text suggestions and concept generation
- 🖼️ **Rich Template Library** - 100+ popular memes from Imgflip API
- 🎨 **Advanced Editor** - Live preview, custom fonts, text effects, positioning
- 🤖 **AI Assistant** - Generate memes from concepts, improve text, suggest templates
- 🎮 **Demo Mode Always On** - No login required, instant access to all features
- 📱 **Responsive Design** - Works on all devices with optimized layouts
- 🌙 **Dark/Light Themes** - Toggle between modern UI themes
- 📊 **User Analytics** - Track meme performance and engagement
- 💾 **Local Storage** - Save and manage your meme collection locally
- ⬇️ **Easy Export** - Download memes in high quality

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/singhalaadi/memefy-ai.git
cd memefy-ai

# Install dependencies
npm install

# Set up environment (optional for demo mode)
cp .env.example .env

# Start development server
npm run dev
```

Visit `http://localhost:5173` and start creating! 🎉

## 🔥 Firebase Setup (Optional)

1. Create [Firebase project](https://console.firebase.google.com)
2. Enable Authentication (Google) and Firestore
3. Update `.env` with your config:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
# ... other Firebase config
```

See [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for detailed instructions.

## 📋️ Project Structure

```text
src/
├── components/           # UI components
│   ├── AIMemeEditor.jsx # Advanced meme editor
│   └── layout/          # Navigation, layout
├── pages/               # Route components
│   ├── Generator.jsx    # Main meme creation
│   ├── Gallery.jsx      # Meme gallery
│   ├── Dashboard.jsx    # User dashboard
│   └── Profile.jsx      # User profile
├── context/             # React contexts
├── hooks/               # Custom hooks (useMemes, useAnalytics)
├── services/            # API services (Firebase AI, meme API)
└── config/              # Firebase configuration
```

## 🎯 Key Components

- **Generator**: Template selection, text customization, live preview
- **AI Meme Editor**: Advanced editor with AI assistance and smart suggestions
- **Gallery**: Browse community memes with filtering and favorites
- **Dashboard**: Analytics and user statistics
- **Profile**: Personal meme collection and account management

## 🤖 AI Features

- **Smart Text Generation**: Generate meme text from concepts
- **Template Suggestions**: AI recommends templates based on your idea
- **Text Improvement**: Enhance existing text for better impact
- **Concept-to-Meme**: Describe your idea, get complete meme suggestions

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
- **Backend**: Firebase (Auth, Firestore, Functions)
- **AI**: Firebase Generative AI, Gemini
- **APIs**: Imgflip (templates), HTML2Canvas (export)

## 🚀 Deployment

**Netlify:**

```bash
npm run build
# Deploy dist/ folder
```

**Firebase Hosting:**

```bash
firebase init hosting
npm run build
firebase deploy
```

## 🤝 Contributing

1. Fork the repo
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file.

---

Create viral content in seconds • No cap 📈
