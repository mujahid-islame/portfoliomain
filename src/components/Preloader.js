"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden";
    
    // Total loading time: 2.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "unset";
    }, 2500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  const text = "MUJAHID";

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-slate-900"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="flex overflow-hidden pb-4">
              {text.split("").map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  className="text-6xl md:text-8xl font-black text-white tracking-[0.1em] md:tracking-[0.2em] uppercase inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="h-1 w-full bg-primary-container origin-left rounded-full"
            />
            
            <div className="overflow-hidden pt-2">
              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
                className="text-slate-400 text-xs md:text-sm font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase text-center"
              >
                Welcome to Mujahid Islam Portfolio
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
