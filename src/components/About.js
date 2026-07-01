"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const xLeft = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const xRight = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <section 
      ref={containerRef}
      className="py-20 md:py-28 relative overflow-hidden bg-white" 
      id="about"
    >
      {/* Background Decorative Text - Adjusted for Mobile */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.03]">
        <motion.div 
          style={{ x: xLeft }}
          className="text-[30vw] md:text-[20vw] font-black leading-none whitespace-nowrap text-slate-900 -mt-10 md:-mt-20"
        >
          CREATIVE DEVELOPER CREATIVE DEVELOPER
        </motion.div>
        <motion.div 
          style={{ x: xRight }}
          className="text-[30vw] md:text-[20vw] font-black leading-none whitespace-nowrap text-slate-900 text-right mt-10 md:mt-0"
        >
          PASSIONATE CODER PASSIONATE CODER
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center">
          {/* Section Header */}
          <motion.div {...fadeInUp} className="text-center mb-16 md:mb-24">
            <h2 className="text-primary-container font-black uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4 md:mb-6 block">
              Identity
            </h2>
            <h3 className="text-5xl sm:text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.95] md:leading-[0.9]">
              About <span className="text-slate-300">Me</span>
            </h3>
          </motion.div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
            {/* Left Decor / Quote - Visible on Mobile but styled differently */}
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="lg:col-span-4 border-l-4 border-primary-container/20 pl-6 md:pl-8"
            >
              <p className="text-xl md:text-2xl font-medium text-slate-400 italic leading-snug">
                "Turning complex problems into elegant, functional digital solutions."
              </p>
            </motion.div>

            {/* Right Main Text */}
            <div className="lg:col-span-8 space-y-8 md:space-y-12">
              <motion.div 
                {...fadeInUp}
                transition={{ delay: 0.3 }}
                className="space-y-6 md:space-y-8"
              >
                <p className="text-xl sm:text-2xl md:text-3xl text-slate-600 leading-tight">
                  I am <span className="text-slate-900 font-black">Mujahid Islam</span>, a passionate 
                  <span className="bg-gradient-to-r from-primary-container to-emerald-500 bg-clip-text text-transparent font-black px-2">
                    Full Stack Flutter Developer
                  </span>. 
                  My journey started with a deep curiosity about the architecture of the Android & ios applications.
                </p>
                
                <p className="text-base sm:text-lg md:text-xl text-slate-500 leading-relaxed font-medium">
                  Now, I specialize in crafting modern, responsive, and user-centric Android & ios applications. 
                  I find my flow in the intersection of <span className="text-slate-900 font-bold underline decoration-primary-container/30 decoration-4 underline-offset-4">Frontend Excellence</span> and robust backend logic. 
                  Every line of code I write is driven by the goal of creating seamless user experiences.
                </p>

                <div className="flex flex-wrap gap-3 md:gap-4 pt-4">
                   {["Visionary", "Goal Oriented", "Adaptive", "Lifelong Learner"].map((trait, i) => (
                     <motion.span 
                       key={trait}
                       initial={{ opacity: 0, scale: 0.8 }}
                       whileInView={{ opacity: 1, scale: 1 }}
                       viewport={{ once: true }}
                       transition={{ delay: 0.5 + (i * 0.1) }}
                       className="px-4 md:px-6 py-2 rounded-full border border-slate-200 text-slate-500 text-xs md:text-sm font-bold hover:border-primary-container/40 hover:text-primary-container transition-colors cursor-default"
                     >
                       {trait}
                     </motion.span>
                   ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

