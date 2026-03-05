import React from "react";
import Navbar from "./Navbar";
import { useTheme } from "../../context/ThemeContext";

const Layout = ({ children }) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#16213e]"
          : "bg-gradient-to-br from-[#f0f9ff] via-[#e0e7ff] to-[#f8fafc]"
      }`}
    >
      <Navbar />
      <main className="min-h-screen">{children}</main>
    </div>
  );
};
export default Layout;
