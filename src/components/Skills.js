"use client";

import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const skillCategories = [
  {
    "title": "Frontend Development",
    "icon": "M3 3h18a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2zm0 2v14h18V5H3zm2 2h14v2H5V7zm0 4h14v2H5v-2z",
    "skills": [
      { "name": "FLUTTER", "color": "#E34F26", "path": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 13.5L7 12l3.5-3.5L14 12l-3.5 3.5z" },
      { "name": "FIGMA", "color": "#1572B6", "path": "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 18.75c-3.728 0-6.75-3.022-6.75-6.75S8.272 5.25 12 5.25s6.75 3.022 6.75 6.75-3.022 6.75-6.75 6.75z" },
      { "name": "DART", "color": "#F7DF1E", "path": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" },
      { "name": "GETX", "color": "#61DAFB", "path": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" },
      { "name": "BLOCK", "color": "#000000", "path": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 5-5 5 5-5 5z" },
      { "name": "PROVIDER", "color": "#06B6D4", "path": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93z" }
    ]
  },
  {
    "title": "Backend Development",
    "icon": "M12 2c5.523 0 10 1.79 10 4s-4.477 4-10 4S2 8.21 2 6s4.477-4 10-4zm0 6c4.912 0 9.073-1.393 9.873-3.238C21.144 6.42 17.202 7.5 12 7.5S2.856 6.42 2.127 4.762C2.927 6.607 7.088 8 12 8zm0 2c5.523 0 10 1.79 10 4v4c0 2.21-4.477 4-10 4s-10-1.79-10-4v-4c0-2.21 4.477-4 10-4zm0 2c-4.912 0-9.073 1.393-9.873 3.238.729 1.658 4.671 2.762 9.873 2.762s9.144-1.104 9.873-2.762C21.073 13.393 16.912 12 12 12z",
    "skills": [
      { "name": "LARAVEL", "color": "#339933", "path": "M12 0L0 6.928v13.856L12 27.713l12-6.929V6.928L12 0zm0 2.309l10 5.774v11.547l-10 5.774-10-5.774V8.083l10-5.774z" },
      { "name": "STRAPI CMS", "color": "#000000", "path": "M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-13.05-1.95l-1.95-1.95-3.3 3.3-3.3-3.3L3 12l6.3 6.3 8.4-8.4-3.75-3.75-2.25 2.25-1.95 1.95z" },
      { "name": "SUPABASE", "color": "#47A248", "path": "M17.193 9.555c-1.354-4.37-4.103-7.23-5.044-8.125a.39.39 0 0 0-.643.18c-.477 1.83-1.063 5.484.053 9.47-1.115-3.986-1.7-7.64-1.223-9.47a.39.39 0 0 1 .643-.18c.94.895 3.69 3.755 5.044 8.125a.393.393 0 0 1-.223.473.395.395 0 0 1-.5-.133c-1.32-2.18-3.39-3.41-4.14-3.86a.395.395 0 0 0-.583.424c.05.51.196 1.393.196 1.393s.06 1.636.01 3.25c-.05 1.614-.26 3.21-.26 3.21s-.11 1.6-.584 3.09c-.473 1.49-.66 1.9-.66 1.9s.114-1.25.132-2.47c.018-1.22-.05-2.61-.05-2.61s-.15-2.17-.67-3.95c-.52-1.78-1.19-3.56-1.19-3.56a.39.39 0 0 0-.69.09c.47-1.84 1.05-5.49-.06 9.47-1.11-3.98-1.69-7.63-1.22-9.47a.39.39 0 0 1 .64-.18c.94.89 3.69 3.75 5.04 8.12a.39.39 0 0 1-.22.47.39.39 0 0 1-.5-.13c-1.32-2.18-3.39-3.41-4.14-3.86a.395.395 0 0 0-.58.42c.05.51.2 1.39.2 1.39s.06 1.64.01 3.25c-.05 1.61-.26 3.21-.26 3.21s.11-1.6.58-3.09c.47-1.49.66-1.9.66-1.9s-.11 1.25-.13 2.47c-.02 1.22.05 2.61.05 2.61s.15 2.17.67 3.95c.52 1.78 1.19 3.56 1.19 3.56a.39.39 0 0 0 .69-.09Z" },
      { "name": "Firebase", "color": "#FFCA28", "path": "M3.89 15.672L6.255.461A.542.542 0 0 1 7.27.288l2.543 4.771-5.923 10.613zm15.787 0l-3.32-10.456a.542.542 0 0 0-1.026.046l-2.022 3.93-5.922-10.613A.542.542 0 0 0 6.27.288L3.89 15.672 11.75 20.08a.54.54 0 0 0 .524 0l7.403-4.408z" },
      { "name": "Better Auth", "color": "#3B82F6", "path": "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zm0-18.5l-6 2.25v7.75c0 3.75 4.5 7.5 6 8.5 1.5-1 6-4.75 6-8.5V5.75L12 3.5z" }
    ]
  },
  {
    "title": "Tools & Platforms",
    "icon": "M12.7 2.3c-.4-.4-1-.4-1.4 0l-9 9c-.4.4-.4 1 0 1.4s1 .4 1.4 0L12 4.4l8.3 8.3c.4.4 1 .4 1.4 0s.4-1 0-1.4l-9-9zM12 8.4l-7.3 7.3c-.4.4-.4 1 0 1.4.2.2.5.3.7.3s.5-.1.7-.3L12 11.2l5.9 5.9c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L12 8.4z",
    "skills": [
      { "name": "VS Code", "color": "#007ACC", "path": "M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" },
      { "name": "Git", "color": "#F05032", "path": "M23.546 10.93L13.067.452a2.825 2.825 0 0 0-3.996 0l-2.02 2.02 3.125 3.124a2.38 2.38 0 0 1 2.826 2.826l3.124 3.125a2.38 2.38 0 0 1-2.826 2.826 2.38 2.38 0 0 1-2.826-2.826l-3.125-3.124-4.88 4.88a2.825 2.825 0 0 0 0 3.996l10.479 10.479a2.825 2.825 0 0 0 3.996 0l10.48-10.479a2.825 2.825 0 0 0 0-3.996z" },
      { "name": "GitHub", "color": "#181717", "path": "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" },
      { "name": "NPM", "color": "#CB3837", "path": "M0 7.334v8h24v-8H0zm11.466 6.8h-2.13v-4.13h-1.6v4.13h-4.4v-5.46h8.13v5.46zm5.867 0h-2.13v-5.46h5.33v4.13h-1.6v1.33h-1.6zm0-2.8h-1.6v-1.33h1.6v1.33zm-7.466 0h-1.6v-1.33h1.6v1.33z" },
      { "name": "Vercel", "color": "#000000", "path": "M24 22.525H0l12-21.05 12 21.05z" },
      { "name": "Netlify", "color": "#00C7B7", "path": "M5.006 20.301l4.743 3.698L24 10.024 16.924 0l-5.636 5.09-8.497-2.613L0 12.43z" }
    ]
  }

];

const SkillChip = ({ skill }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.5, rotate: -10 },
        visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 260, damping: 20 } }
      }}
      whileHover={{ 
        y: -10, 
        scale: 1.1, 
        rotate: [0, -2, 2, 0],
        transition: { duration: 0.3 } 
      }}
      className="group relative flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/40 backdrop-blur-md border border-white/40 shadow-sm hover:shadow-2xl hover:border-white/60 transition-all duration-300 cursor-default"
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-opacity duration-300 pointer-events-none"
        style={{ backgroundColor: skill.color }}
      />
      <svg viewBox="0 0 24 24" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 drop-shadow-sm" style={{ fill: skill.color }}>
        <path d={skill.path} />
      </svg>
      <span className="font-bold text-slate-800 text-sm tracking-tight">{skill.name}</span>
    </motion.div>
  );
};

const CategoryCard = ({ category, index }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 30 });

  function handleMouseMove(event) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2, type: "spring", bounce: 0.2 }}
      className="relative w-full bg-white/20 backdrop-blur-2xl border border-white/30 p-8 md:p-12 rounded-[3rem] shadow-2xl transition-all duration-500 overflow-hidden group perspective-1000"
    >
      {/* 3D Floating Element Effect */}
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="relative z-10"
      >
        <div className="flex items-center gap-6 mb-12">
          <div className="w-16 h-16 rounded-3xl bg-white/80 shadow-inner flex items-center justify-center group-hover:bg-primary-container transition-colors duration-500">
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-slate-800 group-hover:fill-white transition-colors">
              <path d={category.icon} />
            </svg>
          </div>
          <h4 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase italic">{category.title}</h4>
        </div>
        
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-4"
        >
          {category.skills.map((skill, i) => (
            <SkillChip key={i} skill={skill} />
          ))}
        </motion.div>
      </div>

      {/* Background Animated Gradient */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary-container/20 to-transparent rounded-full blur-[120px] pointer-events-none"
      />
    </motion.div>
  );
};

const Skills = () => {
  const containerRef = useRef(null);
  const { mouseX, mouseY } = useMousePosition(containerRef);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="skills" className="py-20 md:py-28 bg-white overflow-hidden relative cursor-crosshair"> 
      {/* Dynamic Cursor Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 md:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              800px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 193, 142, 0.05),
              transparent 80%
            )
          `,
        }}
      />

      {/* Floating Background Particles */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              className="absolute w-2 h-2 bg-primary-container/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      )}

      {/* Large Parallax Background Text */}
      <motion.div 
        style={{
          x: useTransform(mouseX, [0, 2000], [50, -50]),
          y: useTransform(mouseY, [0, 2000], [50, -50]),
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none opacity-[0.03] z-0"
      >
        <h2 className="text-[25rem] md:text-[50rem] font-black tracking-tighter text-slate-900 uppercase">
          Digital Arsenal
        </h2>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-6 py-2 rounded-full border border-slate-200 bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-[0.4em] mb-8"
          >
            My Tech Stack
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-7xl md:text-[12rem] font-black text-slate-900 tracking-tighter leading-none"
          >
            SKILLS <span className="text-slate-200">NOW</span>
          </motion.h3>
        </div>

        <div className="flex flex-col gap-20">
          {skillCategories.map((category, index) => (
            <CategoryCard key={index} category={category} index={index} />
          ))}
        </div>
      </div>
      
      {/* Side Color Fades */}
      <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-primary-container/5 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-blue-500/5 to-transparent pointer-events-none" />
    </section>
  );
};

// Custom Hook for Mouse Position with smoothing
function useMousePosition(ref) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [ref, mouseX, mouseY]);

  return { mouseX, mouseY };
}

export default Skills;
