import React from "react";
import { motion } from "framer-motion";
import TypewriterEffect from "./TypewriterEffect";
import { ChevronDown } from "lucide-react";

const FallbackSphere = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-64 h-64 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 opacity-90 relative overflow-hidden border-4 border-gray-700 shadow-2xl"
      >
        {/* Profile image inside the sphere - no rotation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
            alt="Profile"
            className="w-48 h-48 rounded-full object-cover border-4 border-gray-600"
          />
        </div>
        {/* Overlay gradient for effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/30 to-transparent rounded-full" />
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const skills = [
    "Cross-Platform App Developer",
    "React & Laravel Developer",
    "Tech Enthusiast",
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl lg:text-7xl font-bold text-white mb-6"
            >
              Hi, I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Samrat Karki
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl lg:text-3xl text-gray-300 mb-8"
            >
              I'm a{" "}
              <TypewriterEffect
                words={skills}
                className="text-blue-400 font-semibold"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg text-gray-400 mb-8 max-w-2xl"
            >
              Never hurt others, learn about science, universe and it's inception
              aim to solve a particular hard thing in life that's my entire life
              goal
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View My Work
              </button>
              <button
                className="border-2 border-blue-400 text-blue-400 px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 hover:text-gray-900 transition-colors shadow-lg"
                onClick={() =>
                  document
                    .getElementById("resume")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Download Resume
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-96 lg:h-[500px]"
          >
            <FallbackSphere />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="cursor-pointer"
          onClick={() =>
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <ChevronDown
            size={32}
            className="text-gray-400 hover:text-blue-400 transition-colors"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
