"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useState } from "react";

const ContactCard = ({ info }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["15deg", "-15deg"]
  );

  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-15deg", "15deg"]
  );

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

  const isWebLink = info.link.startsWith("http");

  return (
    <motion.a
      href={info.link}
      target={isWebLink ? "_blank" : "_self"}
      rel={isWebLink ? "noopener noreferrer" : undefined}
      draggable={false}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full flex flex-col items-center gap-4 md:gap-8 p-6 sm:p-8 md:p-12 rounded-[2rem] md:rounded-[4rem] bg-white/60 md:bg-white/40 backdrop-blur-md md:backdrop-blur-3xl border border-white/50 shadow-xl md:shadow-2xl transition-all duration-500 group cursor-pointer hover:shadow-primary-container/20"
    >
      {/* Glow */}
      <div
        className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2rem] md:rounded-[4.5rem] blur-2xl md:blur-3xl pointer-events-none"
        style={{
          backgroundColor: `${info.color}15`,
        }}
      />

      {/* Icon */}
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-24 md:h-24 flex items-center justify-center shrink-0">
        <div
          style={{
            backgroundColor: info.color,
          }}
          className="absolute inset-0 rounded-2xl md:rounded-[2.5rem] opacity-10 group-hover:opacity-20 transition-opacity duration-500"
        />

        <div className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 md:w-12 md:h-12 flex items-center justify-center transition-transform duration-500 group-hover:scale-125">
          <svg
            viewBox="0 0 24 24"
            className="w-full h-full drop-shadow-xl"
            style={{
              fill: info.color,
            }}
          >
            <path d={info.svgPath} />
          </svg>
        </div>

        {/* Ring */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
          }}
          className="absolute inset-0 border-2 rounded-2xl md:rounded-[2.5rem]"
          style={{
            borderColor: info.color,
          }}
        />
      </div>

      {/* Text */}
      <div className="flex flex-col items-center text-center gap-1.5 md:gap-3 w-full pointer-events-none">
        <span className="text-[9px] sm:text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em] text-slate-400">
          {info.label}
        </span>

        <span className="text-sm sm:text-base md:text-xl lg:text-2xl font-black text-slate-900 tracking-tighter w-full break-words px-2">
          {info.value}
        </span>
      </div>

      {/* Border */}
      <div className="absolute inset-0 rounded-[2rem] md:rounded-[4rem] border-2 border-transparent group-hover:border-primary-container/20 transition-colors duration-700 pointer-events-none" />
    </motion.a>
  );
};

const InputField = ({
  label,
  type = "text",
  name,
  isTextArea = false,
  required = true,
  focusedField,
  setFocusedField,
}) => (
  <div className="relative">
    <motion.div
      animate={{
        borderColor:
          focusedField === name
            ? "#00C18E"
            : "rgba(0,0,0,0.05)",
      }}
      className={`w-full rounded-2xl md:rounded-[2rem] border-2 overflow-hidden bg-white/50 backdrop-blur-sm transition-all ${
        isTextArea ? "h-40" : "h-16 md:h-20"
      }`}
    >
      {isTextArea ? (
        <textarea
          name={name}
          required={required}
          onFocus={() => setFocusedField(name)}
          onBlur={() => setFocusedField(null)}
          placeholder={label}
          className="w-full h-full bg-transparent px-6 md:px-10 py-5 md:py-7 outline-none text-slate-900 font-bold resize-none placeholder:text-slate-300"
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          onFocus={() => setFocusedField(name)}
          onBlur={() => setFocusedField(null)}
          placeholder={label}
          className="w-full h-full bg-transparent px-6 md:px-10 outline-none text-slate-900 font-bold placeholder:text-slate-300"
        />
      )}
    </motion.div>
  </div>
);

const Contact = () => {
  const [focusedField, setFocusedField] = useState(null);
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("sending");

    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData.entries());

    try {
      const FORMSPREE_URL =
        "https://formspree.io/f/xojygpdb";

      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
      console.error(error);
    }

    setTimeout(() => {
      setStatus("idle");
    }, 5000);
  };

  const contactData = [
    {
      label: "Email Me",
      value: "islamemdmujahid@gmail.com",
      color: "#EA4335",

      link:
        "https://mail.google.com/mail/?view=cm&fs=1&to=islmaemdmujahid@gmail.com",

      svgPath:
        "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
    },

    {
      label: "Call Me",
      value: "+8801321904531",
      color: "#3B82F6",

      // BEST FIX
      link: "tel:01321904531",

      svgPath:
        "M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.58l2.2-2.21c.28-.27.36-.66.25-1.01A11.36 11.36 0 018.57 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.58c0-.55-.45-1-1-1z",
    },

    {
      label: "WhatsApp Me",
      value: "Chat Now",
      color: "#25D366",

      link: "https://wa.me/8801321904531",

      svgPath:
        "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487z",
    },
  ];

  return (
    <section
      className="py-20 md:py-28 bg-white relative overflow-hidden"
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter">
            Let's Connect.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20 md:mb-24">
          {contactData.map((info, i) => (
            <ContactCard key={i} info={info} />
          ))}
        </div>

        {/* Form */}
        <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-3xl border border-slate-100 rounded-[3rem] p-8 md:p-20 shadow-2xl relative overflow-hidden">
          {status === "success" && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="absolute inset-0 z-20 bg-white/90 backdrop-blur-xl flex flex-col items-center justify-center text-center p-10"
            >
              <div className="w-20 h-20 bg-primary-container rounded-full flex items-center justify-center mb-6">
                <svg
                  viewBox="0 0 24 24"
                  className="w-10 h-10 text-white fill-current"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>

              <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
                Message Sent!
              </h3>

              <p className="text-slate-500 font-medium max-w-xs">
                Thank you for reaching out.
              </p>
            </motion.div>
          )}

          <form
            className="flex flex-col gap-8"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InputField
                label="Full Name"
                name="name"
                focusedField={focusedField}
                setFocusedField={setFocusedField}
              />

              <InputField
                label="Email Address"
                type="email"
                name="email"
                focusedField={focusedField}
                setFocusedField={setFocusedField}
              />
            </div>

            <InputField
              label="Project Subject"
              name="subject"
              focusedField={focusedField}
              setFocusedField={setFocusedField}
            />

            <InputField
              label="Tell me about your project"
              name="message"
              isTextArea={true}
              focusedField={focusedField}
              setFocusedField={setFocusedField}
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="group w-full h-16 md:h-20 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.3em] hover:bg-primary-container transition-all relative overflow-hidden disabled:opacity-70"
            >
              <span
                className={`relative z-10 ${
                  status === "sending"
                    ? "opacity-0"
                    : "opacity-100"
                }`}
              >
                Send Message
              </span>

              {status === "sending" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;