# 🚀 MEMEFY AI - Next-Gen Meme Generator

[![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-9.0+-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> **Create viral content in seconds • No cap 📈**

A modern, AI-powered meme generator built for Gen-Z creators. Features Google authentication, real-time database, and a sleek dark/light theme interface.

![Memefy AI Preview](https://via.placeholder.com/800x400/1a1a2e/ffffff?text=MEMEFY+AI+Preview)

## ✨ Features

### 🎨 **Meme Creation**
- **Template Library**: Curated collection of popular meme templates
- **Custom Text**: Add top/bottom text with various styling options
- **Text Effects**: Shadow, outline, glow, and neon effects
- **Live Preview**: Real-time meme preview as you type
- **AI Suggestions**: Smart text suggestions for viral content

### 🔐 **Authentication & User Management**
- **Google Sign-in**: One-click authentication with Google
- **Demo Mode**: Try the app without signing up
- **User Profiles**: Personalized dashboards and analytics
- **Profile Pictures**: Automatic Google profile integration

### 📊 **Analytics & Dashboard**
- **Meme Analytics**: Track views, shares, and engagement
- **User Statistics**: Personal meme creation metrics  
- **Trending Data**: 7-day performance charts
- **Gallery Management**: Save and organize your creations

### 🎨 **Modern UI/UX**
- **Dark/Light Theme**: Toggle between themes seamlessly
- **Responsive Design**: Works perfectly on all devices
- **Smooth Animations**: Framer Motion powered interactions
- **Glassmorphism**: Modern glass-effect design elements

### 🚀 **Technical Features**
- **Real-time Database**: Firebase Firestore integration
- **Cloud Storage**: Firebase Storage (optional)
- **Progressive Web App**: PWA-ready architecture
- **Offline Support**: Works without internet connection
- **SEO Optimized**: Meta tags and social sharing ready

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern React with hooks
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **React Hot Toast** - Beautiful notifications

### **Backend & Services**
- **Firebase Auth** - Google authentication
- **Firestore** - Real-time NoSQL database  
- **Firebase Storage** - Cloud file storage (optional)
- **HTML2Canvas** - Meme generation and download

### **Development Tools**
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Firebase account (optional for demo mode)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/memefy-ai.git
cd memefy-ai
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

4. **Configure Firebase** (Optional - see [Firebase Setup Guide](FIREBASE_SETUP.md))
   - Update `.env` with your Firebase credentials
   - Or skip to use demo mode

5. **Start development server**
```bash
npm run dev
```

6. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Start creating memes! 🎭

## 🔥 Firebase Setup

For full functionality including user authentication and data persistence:

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create new project
   - Enable Authentication and Firestore

2. **Configure Environment**
   ```env
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
   ```

3. **Detailed Setup Guide**
   - See [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for complete instructions

## 🎨 Meme Templates (Imgflip API)

The app automatically loads popular meme templates from the Imgflip API:

✅ **No API Key Required** - Works out of the box!

**Features:**
- 💯+ Popular meme templates from Imgflip
- 🔄 Auto-categorized templates (Popular, Classic, Gaming, Reaction, Trending)
- 📱 High-quality images
- 🚀 Real-time template loading
- 🔒 No rate limits or authentication needed

**Fallback System:**
- If Imgflip API is unavailable, built-in templates are used
- Seamless user experience regardless of connectivity

## 📱 Demo Mode

Try the app instantly without any setup:
- **Demo Authentication**: No sign-up required
- **Mock Data**: Pre-loaded with sample content  
- **Full Features**: Complete UI/UX experience
- **Local Storage**: Data persisted in browser

Perfect for testing, development, and showcasing!

## 🎮 Usage

### Creating Your First Meme

1. **Choose Template**
   - Browse categories (Popular, Trending, Classic, etc.)
   - Click any template to select

2. **Customize Text**  
   - Add top and bottom text
   - Choose colors and effects
   - Adjust font size

3. **Generate & Save**
   - Preview in real-time
   - Download or save to profile
   - Share with friends

### User Features

- **Profile Dashboard**: View your meme collection and stats
- **Analytics**: Track performance of your creations
- **Gallery**: Browse and favorite community memes
- **Themes**: Switch between dark and light modes

## 🏗️ Project Structure

```
memefy-ai/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── layout/       # Navigation, layout components
│   │   └── ...
│   ├── pages/            # Route components
│   │   ├── Landing.jsx   # Home page
│   │   ├── Generator.jsx # Meme creation
│   │   ├── Gallery.jsx   # Meme gallery
│   │   ├── Dashboard.jsx # User dashboard
│   │   └── Profile.jsx   # User profile
│   ├── context/          # React context providers
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useMemes.js
│   │   └── useAnalytics.js
│   ├── config/           # Configuration files
│   │   └── firebase.js   # Firebase setup
│   ├── data/             # Mock data and constants
│   └── styles/           # Global styles and themes
├── public/               # Static assets
├── .env.example          # Environment variables template
├── FIREBASE_SETUP.md     # Firebase configuration guide
└── README.md             # This file
```

## 🎨 Customization

### Themes
- Modify `src/context/ThemeContext.jsx` for custom themes
- Update Tailwind config for new color schemes
- Add new theme variables in CSS

### Meme Templates
- Add new templates in `src/data/memeData.js`
- Include category, image URL, and metadata
- Templates support various aspect ratios

### Text Effects
- Extend `textEffects` array in `Generator.jsx`  
- Add CSS text-shadow and color properties
- Create custom animation effects

## 🚀 Deployment

### Netlify
```bash
npm run build
# Drag dist folder to Netlify dashboard
```

### Firebase Hosting
```bash
firebase init hosting
npm run build
firebase deploy
```

## 🤝 Contributing

We love contributions! Here's how to get started:

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit changes** (`git commit -m 'Add AmazingFeature'`)
4. **Push to branch** (`git push origin feature/AmazingFeature`)
5. **Open Pull Request**

### Development Guidelines
- Follow React best practices
- Use TypeScript for new features (migration in progress)
- Maintain responsive design principles
- Add tests for new functionality
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern Gen-Z aesthetic and meme culture
- **Icons**: Emoji and custom SVG icons
- **Images**: Curated meme templates from various sources
- **Community**: Feedback from beta testers and users

## 📧 Contact & Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/singhalaadi/memefy-ai/issues)
- **Discussions**: [Join the community](https://github.com/singhalaadi/memefy-ai/discussions)
- **Email**: singhal26aaditya@gmail.com

## 🌟 Show Your Support

If you found this project helpful, please give it a ⭐ on GitHub!

**Made with ❤️ for the meme community**

*Keep creating, keep memeing! 🎭✨*