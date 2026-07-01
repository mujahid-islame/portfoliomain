"use client";

import { motion } from "framer-motion";

const EducationCard = ({ year, degree, institution, details, marker, isLeft }) => (
  <div
    className={`relative flex items-center justify-between w-full mb-12 md:mb-20 ${isLeft ? "flex-row-reverse" : "flex-row"}`}
  >
    {/* Empty space for the other side */}
    <div className="hidden md:block w-[42%]" />

    {/* Year Node on the Timeline */}
    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        className="px-3 md:px-4 h-10 md:h-12 rounded-full bg-white border-4 border-primary-container shadow-[0_0_20px_rgba(0,193,142,0.3)] flex items-center justify-center font-black text-[8px] md:text-[10px] text-primary-container whitespace-nowrap"
      >
        {marker}
      </motion.div>
      <div className="h-full w-1 bg-linear-to-b from-primary-container to-transparent absolute top-10 md:top-12 bottom-0" />
    </div>

    {/* The Content Card */}
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, type: "spring" }}
      className={`w-full md:w-[42%] ml-24 md:ml-0 bg-white/40 backdrop-blur-3xl border border-white/40 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-2xl relative group overflow-hidden`}
    >
      {/* Accent Glow */}
      <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-primary-container/5 blur-2xl md:blur-3xl group-hover:bg-primary-container/10 transition-colors" />

      <div className="flex flex-col gap-3 md:gap-4">
        <span className="text-primary-container font-black text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase px-4 md:px-6 py-1.5 md:py-2 bg-slate-50 rounded-full border border-slate-100 self-start">
          {year}
        </span>
        <h4 className="text-xl md:text-4xl font-black text-slate-900 tracking-tighter leading-tight">
          {degree}
        </h4>
        <h5 className="text-sm md:text-lg font-bold text-slate-500 italic">
          {institution}
        </h5>
        <div className="w-10 md:w-12 h-1 bg-slate-100 my-1 md:my-2" />
        <p className="text-xs md:text-slate-400 font-medium leading-relaxed">{details}</p>
      </div>
    </motion.div>
  </div>
);

const Education = () => {
  const educationData = [
    {
      year: "2022 - 2026",
      marker: "2026 Running",
      degree: "Diploma in Computer Engineering",
      institution: "Model Institute Of Science And Technology",
      details: "Currently pursuing a Diploma in Computer Engineering. Focusing on advanced technical skills and software development. [Current Status: Running]",
    },
    {
      year: "2020 - 2022",
      marker: "2022",
      degree: "Secondary School Certificate (SSC)",
      institution: "Kalkini Pilot govt Hi School",
      details: "Successfully completed the Secondary School Certificate (SSC) in 2022 with a focus on core sciences and technology foundations.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden relative" id="education">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-80 md:w-125 h-80 md:h-125 bg-primary-container/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 md:w-125 h-80 md:h-125 bg-blue-500/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 md:mb-8"
          >
            <span className="text-primary-container font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-xs px-6 md:px-10 py-2 md:py-3 bg-white rounded-full border border-slate-100 shadow-sm">
              My Journey
            </span>
          </motion.div>
          <h3 className="text-5xl md:text-9xl font-black text-slate-900 tracking-tighter leading-tight md:leading-none">
            Educational <span className="text-slate-200">Qualification.</span>
          </h3>
        </div>

        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-linear-to-b from-slate-100 via-slate-200 to-transparent" />

          {educationData.map((edu, index) => (
            <EducationCard key={index} {...edu} isLeft={index % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
