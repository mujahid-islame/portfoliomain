"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Download, ExternalLink } from "lucide-react";
import Link from "next/link";
import { a } from "framer-motion/client";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const containerRef = useRef(null);

  const texts = [
    "Mujahid Islam",
    "Frontend Architect",
    "Creative Developer",
    "Problem Solver",
  ];

  // Mouse tilt effect values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      handleType();
    }, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, typingSpeed]);

  const handleType = () => {
    const i = loopNum % texts.length;
    const fullText = texts[i];
    setDisplayText(
      isDeleting
        ? fullText.substring(0, displayText.length - 1)
        : fullText.substring(0, displayText.length + 1),
    );
    setTypingSpeed(isDeleting ? 50 : 150);
    if (!isDeleting && displayText === fullText) {
      setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    }
  };

  const floatingIcons = [
    { name: "React", color: "#61DAFB", delay: 0 },
    { name: "Next.js", color: "#000000", delay: 1 },
    { name: "JS", color: "#F7DF1E", delay: 2 },
    { name: "Tailwind", color: "#38B2AC", delay: 3 },
  ];

  const GithubIcon = () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );

  const LinkedinIcon = () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );

  const FacebookIcon = () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-32 pb-20 px-6 lg:px-24 overflow-hidden bg-white"
      id="home"
    >
      {/* Dynamic Mesh Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary-container/30 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-emerald-100 rounded-full blur-[120px]"
        />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
        {/* LEFT SIDE: Content */}
        <div className="flex flex-col gap-10 text-center lg:text-left">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 text-slate-500 font-bold text-xs uppercase tracking-widest"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-container"></span>
              </span>
              Available for New Projects
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
              Crafting <br />
              <span className="text-primary-container italic font-serif">
                Digital
              </span>{" "}
              <br />
              <span className="relative">
                Experience
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  className="absolute bottom-2 left-0 h-3 bg-primary-container/10 -z-10"
                />
              </span>
            </h1>

            <div className="h-12 flex items-center justify-center lg:justify-start">
              <span className="text-xl md:text-2xl font-medium text-slate-400">
                I am{" "}
                <span className="text-slate-900 font-bold border-b-2 border-primary-container/30">
                  {displayText}
                </span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-1 h-[0.8em] bg-primary-container ml-1"
                />
              </span>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium"
          >
            A forward-thinking developer specializing in high-performance
            Next.js architectures and premium user interfaces.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-4 items-center justify-center lg:justify-start"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 bg-slate-900 text-white font-black rounded-2xl overflow-hidden transition-all shadow-2xl shadow-slate-900/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                Download Resume <Download size={20} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-container to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>

            <motion.a
              href="#projects"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(0,193,142,0.05)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 border-2 border-slate-100 text-slate-900 font-black rounded-2xl transition-all flex items-center gap-2"
            >
              View Projects <ExternalLink size={20} />
            </motion.a>
          </motion.div>

          {/* Social Floating Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex gap-4 items-center justify-center lg:justify-start"
          >
            {[
              { 
                icon: GithubIcon, 
                color: "hover:text-primary-container",
                link: "https://github.com/mujahid-islame"
              },
              { 
                icon: LinkedinIcon, 
                color: "hover:text-primary-container",
                link: "https://www.linkedin.com/in/mujahid-islam-933a3541a"
              },
              { 
                icon: FacebookIcon, 
                color: "hover:text-primary-container",
                link: "https://www.facebook.com/share/18srvVB5E8/"
              },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className={`w-12 h-12 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-all border border-slate-100 shadow-sm ${social.color}`}
              >
                <social.icon />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* RIGHT SIDE: Interactive Image */}
        <div className="relative flex justify-center perspective-1000">
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY }}
            className="relative w-72 h-72 md:w-[500px] md:h-[500px] group transition-transform duration-200"
          >
            {/* Animated Orbiting Elements */}
            {floatingIcons.map((icon, index) => (
              <motion.div
                key={icon.name}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: icon.delay,
                  ease: "easeInOut",
                }}
                className="absolute z-20 p-4 bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl shadow-slate-200/50 hidden md:flex items-center gap-2"
                style={{
                  top: index === 0 ? "10%" : index === 1 ? "60%" : "auto",
                  bottom: index === 2 ? "10%" : index === 3 ? "60%" : "auto",
                  left: index === 0 || index === 2 ? "-10%" : "auto",
                  right: index === 1 || index === 3 ? "-10%" : "auto",
                }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: icon.color }}
                />
                <span className="text-sm font-black text-slate-900">
                  {icon.name}
                </span>
              </motion.div>
            ))}

            {/* Profile Frame */}
            <div className="relative w-full h-full rounded-[4rem] overflow-hidden border-[16px] border-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] bg-slate-50">
              <img
                src="/mujahid.jpg"
                alt="Mujahid Islam"
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-container/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>

            {/* Decorative Background Shape */}
            <div className="absolute -inset-4 border-2 border-primary-container/10 rounded-[4.5rem] -z-10 group-hover:-inset-8 transition-all duration-700" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-slate-900 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
