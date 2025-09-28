import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check if user is demo user
  const isDemoUser = user && localStorage.getItem("demoUser");

  const handleLogout = async () => {
    await signOut();
    navigate("/");
    setIsMenuOpen(false);
  };

  const navLinks = [
    { label: "Home", path: "/", icon: "🏠" },
    { label: "Generator", path: "/generator", icon: "🤖" },
    { label: "Gallery", path: "/gallery", icon: "🎨" },
    ...(user
      ? [
          { label: "Dashboard", path: "/dashboard", icon: "📊" },
          { label: "Profile", path: "/profile", icon: "👤" },
        ]
      : []),
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="text-2xl"
            >
              🚀
            </motion.div>
            <span className="text-xl font-bold gradient-text">MEMEFY AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 hover:bg-white/10 ${
                  location.pathname === link.path
                    ? `bg-gradient-to-r from-pink-500/20 to-cyan-500/20 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`
                    : `${
                        isDarkMode
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-gray-900"
                      }`
                }`}
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-3 glass-dark rounded-full hover:bg-white/10 transition-all duration-300"
              title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
            >
              <span className="text-xl">{isDarkMode ? "🌙" : "☀️"}</span>
            </motion.button>

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center gap-3">
                {isDemoUser && (
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-semibold rounded-full">
                    DEMO
                  </span>
                )}
                <div className="flex items-center gap-2 px-4 py-2 glass-dark rounded-full">
                  {user.avatar && user.avatar.startsWith("http") ? (
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-xl">{user.avatar || "👤"}</span>
                  )}
                  <span className="font-medium text-sm">
                    {user.name || "User"}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-full font-medium transition-all duration-300 flex items-center gap-2"
                >
                  <span>Logout</span>
                  <span>👋</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-pink-500 to-cyan-500 px-6 py-2 rounded-full font-semibold text-white hover:from-cyan-500 hover:to-pink-500 transition-all duration-300 flex items-center gap-2"
              >
                <span>Login</span>
                <span>✨</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div className="flex flex-col gap-1">
              <div
                className={`w-6 h-0.5 bg-white transition-transform ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 bg-white transition-opacity ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 bg-white transition-transform ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></div>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? "auto" : 0,
            opacity: isMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? `bg-gradient-to-r from-pink-500/20 to-cyan-500/20 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`
                    : `${
                        isDarkMode
                          ? "text-gray-300 hover:text-white hover:bg-white/10"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`
                }`}
              >
                <span className="text-xl">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}

            {/* Theme Toggle in Mobile */}
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl font-medium transition-all duration-300 ${
                isDarkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span className="text-xl">{isDarkMode ? "🌙" : "☀️"}</span>
              <span>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
            </button>

            {user ? (
              <div className="border-t border-white/10 pt-4 mt-4">
                <div className="flex items-center gap-3 px-4 py-3">
                  {user.avatar && user.avatar.startsWith("http") ? (
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl">{user.avatar || "👤"}</span>
                  )}
                  <div>
                    <p className="font-medium">{user.name || "User"}</p>
                    {isDemoUser && (
                      <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                        Demo Mode
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/20 rounded-xl font-medium transition-all duration-300"
                >
                  <span className="text-xl">👋</span>
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="border-t border-white/10 pt-4 mt-4">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full bg-gradient-to-r from-pink-500 to-cyan-500 px-4 py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2"
                >
                  <span>Login</span>
                  <span>✨</span>
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
