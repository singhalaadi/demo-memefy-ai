import React, { useState, useRef } from 'react';
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useMemes } from "../hooks/useMemes";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import AIMemeEditor from "../components/AIMemeEditor"; 
import firebaseAIService from "../services/firebaseAI";

const GeneratorSimple = () => {
  // Test all hooks and imports at once
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const { templates, templatesLoading, createMeme } = useMemes(user);
  const memeRef = useRef(null);
  
  // Test state
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">🎨 Meme Generator</h1>
        <p className="text-xl mb-4">Testing all core dependencies...</p>
        <div className="bg-white/10 rounded-lg p-6 space-y-2">
          <p>✅ useAuth: {user ? '✅ Logged in' : '❌ Not logged in'}</p>
          <p>✅ useTheme: {isDarkMode ? '🌙 Dark' : '☀️ Light'}</p>
          <p>✅ useMemes: {templatesLoading ? '⏳ Loading...' : `✅ ${templates.length} templates`}</p>
          <p>✅ html2canvas: {html2canvas ? '✅ Loaded' : '❌ Failed'}</p>
          <p>✅ framer-motion: {motion ? '✅ Loaded' : '❌ Failed'}</p>
          <p>✅ toast: {toast ? '✅ Loaded' : '❌ Failed'}</p>
          <p>✅ uuid: {uuidv4 ? '✅ Loaded' : '❌ Failed'}</p>
          <p>✅ useState/useRef: ✅ Working</p>
          <p>✅ AIMemeEditor: {AIMemeEditor ? '✅ Loaded' : '❌ Failed'}</p>
          <p>✅ firebaseAI: {firebaseAIService ? '✅ Loaded' : '❌ Failed'}</p>
          <p className="text-green-400 mt-4 font-bold">🎉 ALL IMPORTS WORKING - Generator should work now!</p>
        </div>
      </div>
    </div>
  );
};

export default GeneratorSimple;