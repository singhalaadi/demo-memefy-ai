import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth";
import toast from "react-hot-toast";

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Auto-login with demo user - no login required
    const initializeDemoUser = () => {
      const demoUser = {
        id: "demo-user-123",
        name: "Meme Master",
        email: "demo@memefy.ai",
        avatar: "🤖",
        isPremium: false,
        createdAt: new Date().toISOString(),
      };
      
      setUser(demoUser);
      setLoading(false);
      return;
    };

    if (typeof window !== 'undefined') {
      try {
        const existingDemoUser = localStorage.getItem("demoUser");
        if (existingDemoUser) {
          try {
            const parsedDemoUser = JSON.parse(existingDemoUser);
            setUser(parsedDemoUser);
            setLoading(false);
            return;
          } catch (error) {
            localStorage.removeItem("demoUser");
          }
        }
        // If no existing demo user, create one
        initializeDemoUser();
      } catch (error) {
        initializeDemoUser();
      }
    } else {
      // Server-side or no window, still initialize demo user
      initializeDemoUser();
    }

    // Optional: Still allow Firebase auth if someone manually tries to sign in
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          toast.success(`Welcome ${result.user.displayName}! 🎉`);
        }
      } catch (error) {
      }
    };

    // Only check Firebase auth if not in permanent demo mode
    checkRedirectResult();

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const user = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || "Meme Master",
          email: firebaseUser.email,
          avatar: firebaseUser.photoURL || "👤",
          isPremium: false, 
          createdAt: firebaseUser.metadata.creationTime,
        };
        setUser(user);
      }
      // Note: We don't set loading to false here anymore since we handle it in initializeDemoUser
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });

      try {
        const result = await signInWithPopup(auth, provider);
        toast.success(`Welcome ${result.user.displayName}! 🎉`);
      } catch (popupError) {
        if (
          popupError.code === "auth/popup-blocked" ||
          popupError.code === "auth/popup-closed-by-user" ||
          popupError.message.includes("Cross-Origin-Opener-Policy")
        ) {
          toast.loading("Redirecting to Google...", { id: "google-redirect" });
          await signInWithRedirect(auth, provider);
        } else {
          throw popupError;
        }
      }
    } catch (error) {
      if (error.code !== "auth/popup-closed-by-user") {
        toast.error("Authentication failed. Please try again.");
      }
    }
  };

  const signOut = async () => {

    const demoUser = localStorage.getItem("demoUser");
    if (demoUser) {
      localStorage.removeItem("demoUser");
      setUser(null);
      toast.success("Demo session ended! 👋");
      return;
    }

    try {
      await firebaseSignOut(auth);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const signInWithDemo = () => {
    const demoUser = {
      id: "demo-user-123",
      name: "Meme Master",
      email: "demo@memefy.ai",
      avatar: "🤖",
      isPremium: false,
      createdAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem("demoUser", JSON.stringify(demoUser));
    } catch (error) {
    }
    setUser(demoUser);
    toast.success("Welcome to Memefy! 🎮");
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signInWithDemo,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
