import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const features = [
    {
      icon: "🎵",
      title: "Discover Music",
      description: "Find your next favorite song with our AI-powered recommendations"
    },
    {
      icon: "▶️",
      title: "Create Playlists",
      description: "Curate your perfect collection of tracks effortlessly"
    },
    {
      icon: "🎤",
      title: "Voice Control",
      description: "Control your music hands-free with voice commands"
    }
  ];

  return (
    <motion.div 
      className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="w-full min-h-screen flex items-center justify-center px-4 py-16"
        variants={itemVariants}
      >
        <div className="max-w-6xl w-full mx-auto">
          <motion.h1 
            className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 text-center"
            whileHover={{ scale: 1.05 }}
          >
            Welcome to Our Platform
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 mb-16 text-center"
            variants={itemVariants}
          >
            Your own music platform provided by InflosoAI
          </motion.p>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer bg-gray-800 rounded-lg p-8 border border-gray-700 h-full"
              >
                <div className="flex flex-col items-center h-full">
                  <span className="text-5xl mb-6">{feature.icon}</span>
                  <h3 className="text-2xl font-semibold mb-4 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-center text-lg">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <motion.button
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-4 rounded-full font-medium text-xl shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;