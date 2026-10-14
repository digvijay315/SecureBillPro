import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Landing Pages
import LandingLayout from "./pages/Landing/LandingLayout";
import Hero from "./pages/Landing/Hero";
import Features from "./pages/Landing/Features";
import Pricing from "./pages/Landing/Pricing";
import About from "./pages/Landing/About";
import Contact from "./pages/Landing/Contact";

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingLayout><Hero /></LandingLayout>} />
        <Route path="/features" element={<LandingLayout><Features /></LandingLayout>} />
        <Route path="/pricing" element={<LandingLayout><Pricing /></LandingLayout>} />
        <Route path="/about" element={<LandingLayout><About /></LandingLayout>} />
        <Route path="/contact" element={<LandingLayout><Contact /></LandingLayout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
