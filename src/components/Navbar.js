"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ["home", "about", "skills", "services", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home", id: "home" },
    { name: "About", href: "#about", id: "about" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-xl border-slate-100 py-4 shadow-sm" 
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="text-2xl font-black tracking-tighter text-slate-900 uppercase">
          MUJAHID
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`relative px-4 py-2 text-sm font-black uppercase tracking-widest transition-all duration-300 ${
                activeSection === link.id ? "text-primary-container" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {link.name}
              {activeSection === link.id && (
                <motion.div
                  layoutId="active-nav-indicator"
                  className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary-container rounded-full"
                />
              )}
            </a>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <a href="#contact" className="hidden sm:block bg-slate-900 text-white px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-primary-container transition-all shadow-xl shadow-slate-900/10 text-center">
            Let's Talk
          </a>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-slate-900"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span 
                animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-current rounded-full origin-left"
              />
              <motion.span 
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-full h-0.5 bg-current rounded-full"
              />
              <motion.span 
                animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-current rounded-full origin-left"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-4 lg:hidden shadow-2xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-xl font-black uppercase tracking-tighter ${
                  activeSection === link.id ? "text-primary-container" : "text-slate-500"
                }`}
              >
                {link.name}
              </a>
            ))}
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block w-full text-center bg-slate-900 text-white py-4 font-black uppercase tracking-widest rounded-2xl mt-4 hover:bg-primary-container transition-colors">
              Get In Touch
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};


export default Navbar;
