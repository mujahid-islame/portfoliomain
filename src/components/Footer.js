"use client";

import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef, useEffect } from "react";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/mujahid-islame",
    color: "#181717",
    icon: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
  },
  {
    name: "LinkedIn",
    url: "linkedin.com/in/mujahid-islam-933a3541a",
    color: "#0077b5",
    icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/share/18srvVB5E8/",
    color: "#1877F2",
    icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
  },
  {
    name: "Contact",
    url: "#contact",
    color: "#00C18E",
    icon: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
  }
];

const MagneticSocialLink = ({ social }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const itemRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!itemRef.current) return;
    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const center = { x: left + width / 2, y: top + height / 2 };
    const distance = { x: e.clientX - center.x, y: e.clientY - center.y };
    x.set(distance.x * 0.2);
    y.set(distance.y * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={itemRef}
      href={social.url}
      target={social.url.startsWith("http") ? "_blank" : "_self"}
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-slate-900 rounded-full cursor-pointer overflow-hidden transition-colors duration-300 z-10"
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ backgroundColor: social.color }}
      />
      <svg 
        viewBox="0 0 24 24" 
        className="relative z-10 w-8 h-8 md:w-10 md:h-10 fill-white transition-transform duration-300 group-hover:scale-110" 
      >
        <path d={social.icon} />
      </svg>
      {/* Tooltip */}
      <span className="absolute -top-10 px-3 py-1 bg-slate-800 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap">
        {social.name}
      </span>
    </motion.a>
  );
};

const Footer = () => {
  const footerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!footerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.footer 
      ref={footerRef}
      style={{ opacity }}
      className="relative bg-slate-950 text-white pt-32 pb-10 overflow-hidden"
    >
      {/* Interactive Mouse Spotlight in Footer */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 md:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 193, 142, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* Decorative Top Wave / Curve (Optional, using a border radius for modern feel) */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-container to-transparent opacity-50" />
      
      <motion.div style={{ y }} className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Big Call to Action */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-6xl md:text-9xl font-black tracking-tighter"
          >
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-emerald-400 italic">Talk</span>.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-slate-400 text-lg md:text-2xl font-medium max-w-2xl mx-auto"
          >
            Have a project in mind? Let's build something amazing together.
          </motion.p>
        </div>

        {/* Social Links Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 md:gap-10 mb-24 p-8 md:p-12 bg-white/5 backdrop-blur-2xl rounded-[3rem] md:rounded-[4rem] border border-white/10 shadow-2xl"
        >
          {socialLinks.map((social) => (
            <MagneticSocialLink key={social.name} social={social} />
          ))}
        </motion.div>

        {/* Custom "Designed & Built by" Section */}
        <div className="w-full border-t border-white/10 pt-10 flex flex-col items-center justify-center gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center text-center"
          >
            <div className="flex items-center gap-2 text-slate-300 text-sm md:text-base font-medium mb-2">
              <span>Designed & Built with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-red-500"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </motion.div>
              <span>by</span>
            </div>
            
            {/* The signature / Creator name */}
            <motion.a 
              href="https://github.com/mujahid-islame"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="group relative inline-block"
            >
              <h3 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 tracking-tighter uppercase cursor-pointer hover:from-primary-container hover:to-emerald-300 transition-all duration-500">
                Mujahid Islam
              </h3>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-primary-container scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
            </motion.a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-slate-500 text-xs md:text-sm font-label-caps tracking-[0.2em] uppercase mt-4"
          >
            © {new Date().getFullYear()} All Rights Reserved.
          </motion.div>
        </div>

      </motion.div>
      
      {/* Background large decorative text */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[150%] text-center pointer-events-none select-none z-0">
        <h1 className="text-[15rem] md:text-[25rem] font-black text-white/[0.02] tracking-tighter leading-none whitespace-nowrap">
          MUJAHID
        </h1>
      </div>
    </motion.footer>
  );
};

export default Footer;
