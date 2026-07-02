"use client";

import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ExternalLink, X, Sparkles } from "lucide-react";

const GithubIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Project Data
const projects = [
  {
    id: 1,
    name: "KeenKeeper",
    category: "Productivity",
    image: "/keenKeeper.png",
    stack: ["React", "Tailwind CSS", "Context API"],
    description: "A sophisticated productivity and task management application focused on helping users organize daily routines, track goals, and maintain high efficiency.",
    live: "https://keenkeeperctv.netlify.app/",
    github: "https://github.com/mujahid-islame/KeenKeeper",
    features: [
      "Drag-and-drop task management",
      "Real-time progress tracking",
      "Responsive across all devices",
      "Interactive dashboard UI"
    ],
    color: "from-blue-500/20 to-cyan-500/20",
    accent: "text-blue-500",
    bgAccent: "bg-blue-500"
  },
  {
    id: 2,
    name: "Lawyer Appointment",
    category: "Booking System",
    image: "/lawyer.png",
    stack: ["React", "Tailwind CSS", "React Router"],
    description: "Seamlessly connect clients with legal professionals. Features real-time booking, user authentication, and an intuitive dashboard for managing schedules.",
    live: "https://lawyer-appoinmnet.netlify.app/",
    github: "https://github.com/mujahid-islame/Lawyer-Appointment-Booking-Application",
    features: [
      "Real-time appointment scheduling",
      "Secure user authentication",
      "Dynamic dashboard for lawyers",
      "Automated status updates"
    ],
    color: "from-amber-500/20 to-orange-500/20",
    accent: "text-amber-500",
    bgAccent: "bg-amber-500"
  },
  {
    id: 3,
    name: "FlagshipFaceOff",
    category: "Comparison",
    image: "/flagship.png",
    stack: ["React", "Tailwind CSS", "API Integration"],
    description: "Compare the latest flagship smartphones side-by-side with detailed specifications and user reviews to make informed buying decisions.",
    live: "https://flagshipphones.netlify.app/",
    github: "https://github.com/mujahid-islame/FlagshipFaceOff",
    features: [
      "Side-by-side spec comparison",
      "Dynamic filtering & search",
      "Interactive data visualization",
      "Detailed device insights"
    ],
    color: "from-emerald-500/20 to-teal-500/20",
    accent: "text-emerald-500",
    bgAccent: "bg-emerald-500"
  },
];

const ProjectCard = ({ project, onClick, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

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

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative h-[480px] w-full rounded-[2.5rem] cursor-pointer group perspective-1000"
      onClick={() => onClick(project)}
    >
      <motion.div 
        layoutId={`project-card-${project.id}`}
        className="absolute inset-0 bg-white rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden border border-slate-100 transition-all duration-500 group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] group-hover:border-slate-200"
      >
        {/* Top Image Area */}
        <div className="relative h-[60%] w-full overflow-hidden bg-slate-50">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-40 z-10 transition-opacity duration-500 group-hover:opacity-20`} />
          <motion.img 
            layoutId={`project-image-${project.id}`}
            src={project.image} 
            alt={project.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Category Badge */}
          <div className="absolute top-6 left-6 z-20">
            <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black tracking-widest uppercase text-slate-900 shadow-sm">
              {project.category}
            </span>
          </div>
        </div>

        {/* Bottom Content Area */}
        <div className="relative h-[40%] w-full bg-white p-6 md:p-8 flex flex-col transition-transform duration-500 group-hover:-translate-y-2">
          <motion.h4 
            layoutId={`project-title-${project.id}`}
            className="text-2xl font-black text-slate-900 mb-2 group-hover:text-primary-container transition-colors"
          >
            {project.name}
          </motion.h4>
          
          <p className="text-slate-500 text-sm line-clamp-2 font-medium mb-4">
            {project.description}
          </p>

          <div className="flex items-center gap-2 mt-auto">
            {project.stack.slice(0, 3).map((tech, i) => (
              <span key={i} className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                {tech}
              </span>
            ))}
          </div>

          {/* Hover Reveal Button */}
          <div className="absolute bottom-6 right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
            <div className={`w-12 h-12 rounded-full ${project.bgAccent} text-white flex items-center justify-center shadow-lg shadow-${project.bgAccent.split('-')[1]}-500/30`}>
              <ExternalLink size={20} strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        layoutId={`project-card-${project.id}`}
        className="w-full max-w-5xl bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative flex flex-col lg:flex-row max-h-[95vh] lg:max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 bg-white/80 hover:bg-white text-slate-900 rounded-full flex items-center justify-center z-50 transition-all backdrop-blur-md shadow-sm border border-slate-100 hover:scale-105"
        >
          <X size={20} className="md:w-6 md:h-6" />
        </button>

        {/* Image Section */}
        <div className="w-full lg:w-[45%] h-56 sm:h-72 lg:h-auto relative overflow-hidden bg-slate-50 shrink-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 z-10`} />
          <motion.img
            layoutId={`project-image-${project.id}`}
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Content Section */}
        <div 
          className="w-full lg:w-[55%] p-6 md:p-10 lg:p-12 flex flex-col overflow-y-auto bg-white"
          style={{ scrollbarWidth: 'none' }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className={`px-4 py-2 bg-slate-50 inline-flex w-max rounded-full text-[10px] font-black tracking-widest uppercase mb-4 md:mb-6 shadow-sm border border-slate-100 ${project.accent}`}
          >
            {project.category}
          </motion.div>

          <motion.h2
            layoutId={`project-title-${project.id}`}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 md:mb-6 leading-tight"
          >
            {project.name}
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-slate-500 text-sm md:text-base font-medium leading-relaxed mb-8"
          >
            {project.description}
          </motion.p>

          <div className="space-y-8 mb-8 flex-1">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h4 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Sparkles size={16} className={project.accent} /> Key Features
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {project.features.map((feature, i) => (
                  <li 
                    key={i} 
                    className="flex items-center gap-3 text-slate-600 font-medium text-xs md:text-sm bg-slate-50 p-3 rounded-xl border border-slate-100"
                  >
                    <div className={`w-2 h-2 rounded-full ${project.bgAccent} shrink-0`} />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <h4 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-4 h-px bg-slate-300" /> Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech, i) => (
                  <span key={i} className="px-4 py-2 bg-slate-50 border border-slate-100 text-slate-600 font-bold text-[10px] md:text-xs rounded-xl uppercase tracking-wider">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="mt-auto flex flex-col sm:flex-row gap-3 md:gap-4 pt-6 md:pt-8 border-t border-slate-100 shrink-0"
          >
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 py-4 md:py-5 ${project.bgAccent} text-white font-black text-xs md:text-sm tracking-widest uppercase rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all hover:-translate-y-1 hover:shadow-lg shadow-${project.bgAccent.split('-')[1]}-500/30`}
            >
              Live Demo <ExternalLink size={18} />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-4 md:py-5 bg-slate-900 text-white font-black text-xs md:text-sm tracking-widest uppercase rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-all hover:-translate-y-1 hover:shadow-lg shadow-slate-900/20"
            >
              Source Code <GithubIcon size={18} />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  
  return (
    <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden" id="projects">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary-container/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="w-10 h-px bg-primary-container/50"></div>
            <span className="text-primary-container font-black uppercase tracking-[0.4em] text-xs">
              Portfolio
            </span>
            <div className="w-10 h-px bg-primary-container/50"></div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[1.1] mb-6"
          >
            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">Works.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-500 font-medium text-base md:text-lg max-w-2xl mx-auto"
          >
            A curated collection of my recent web development projects, showcasing modern UI/UX and robust architectures.
          </motion.p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={setSelectedProject}
              index={index}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
