"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Position values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Modern snappy spring configurations
  const outerSpringConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const innerSpringConfig = { damping: 30, stiffness: 700, mass: 0.1 };

  const x = useSpring(mouseX, outerSpringConfig);
  const y = useSpring(mouseY, outerSpringConfig);
  
  const dotX = useSpring(mouseX, innerSpringConfig);
  const dotY = useSpring(mouseY, innerSpringConfig);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleHover = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("clickable")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleHover);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleHover);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <>
      {/* Modern Frosted Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] flex items-center justify-center overflow-hidden"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 64 : 40,
          height: isHovered ? 64 : 40,
          backgroundColor: isHovered ? "rgba(0, 193, 142, 0.15)" : "transparent",
          borderColor: isHovered ? "rgba(0, 193, 142, 0.4)" : "rgba(15, 23, 42, 0.15)",
          borderWidth: isHovered ? "1.5px" : "1px",
          scale: isClicking ? 0.85 : 1,
          backdropFilter: isHovered ? "blur(4px)" : "blur(0px)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
      
      {/* High-Precision Snappy Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 8 : 6,
          height: isHovered ? 8 : 6,
          backgroundColor: isHovered ? "#00C18E" : "#0F172A",
          scale: isClicking ? 0.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
      />
      
      {/* Subtle Glow to make the cursor pop on dark sections */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 rounded-full pointer-events-none z-[9997] blur-2xl opacity-30 bg-primary-container"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.5 : 0,
        }}
      />
    </>
  );
};

export default CustomCursor;



