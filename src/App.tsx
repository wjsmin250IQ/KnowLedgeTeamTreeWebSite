import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"; // Exemple avec ShadCN UI
import "./App.css";

const App: React.FC = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <motion.div 
      className="app-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="app-title">🚀 Bienvenue sur mon application React+TS ! 🎉</h1>
      <p>Commencez à coder en modifiant <code>src/App.tsx</code>.</p>

      <Button onClick={toggleTheme} className="theme-button">
        Changer de Thème 🌗
      </Button>
    </motion.div>
  );
};

export default App;
