import React from 'react';
import { HERO_CONTENT } from "../constants";
import { HOW_IT_WORKS_CONTENT } from "../constants";
import { KEY_FEATURES_CONTENT } from "../constants";
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import Robo from "../assets/robo.png";
import V1 from "../assets/video1.mp4";
import { motion } from 'framer-motion';
import '../App.css'; 

const Homepage = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };
  
  return (
    <div className='max-w-7xl mx-auto px-4 flex flex-col items-center text-center mt-32'>
     <div className='border-neutral-800 px-3 py-2 rounded-full text-xs  bg-gradient-to-b from-neutral-50 via-neutral-300 to-neutral-700 bg-clip-text  shadow-[0_0_20px_4px_rgba(255,0,0,0.7)] hover:shadow-[0_0_20px_4px_rgba(0,200,255,0.7)] transition-all duration-300 ease-in-out '>
        {HERO_CONTENT.badgeText}
      </div>
      <h1 className='text-5xl lg:text-8xl my-4 font-semibold tracking-tighter bg-gradient-to-b from-neutral-50 via-neutral-300 to-neutral-700 bg-clip-text text-transparent'>
      Starts with FraudX <br />
      <Typewriter
        options={{
          strings: ['Track Suspicious Patterns', 'Detect Suspicious Activity'],
          autoStart: true,
          loop: true,
          delay: 75,
          deleteSpeed: 50,
        }}
        />
      </h1>
<div className='flex justify-center'>
  <video 
    src={V1}
    loop
    muted
    autoPlay
   className="w-full max-w-md rounded-lg  transition-all duration-300 ease-in-out"
  />
</div>

<div className='mt-6 space-x-4'>
  <Link to='/detect' >
    <button className="glowing-button">
      {HERO_CONTENT.callToAction.primary}
    </button>
  </Link>
  <br /><br />
</div>

      
      
       {/* Works */}
     <div className="max-w-7xl mx-auto px-4">
  
<div className="text-center mb-12 border-t border-neutral-800">
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false, amount: 0.3 }}
    variants={containerVariants}
  >
    <motion.h2
      className="flex items-center justify-center text-3xl lg:text-5xl mt-20 tracking-tighter bg-gradient-to-t from-neutral-50 via-neutral-300 to-neutral-600 bg-clip-text text-transparent"
      variants={itemVariants}
    >
      {HOW_IT_WORKS_CONTENT.sectionTitle}
      <motion.img
        src={Robo}
        alt="Logo"
        width={120}
        height={24}
        className="ml-4"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }} 
      />
    </motion.h2>

    <motion.p
      className="mt-4 text-neutral-400 max-w-xl mx-auto"
      variants={itemVariants}
    >
      {HOW_IT_WORKS_CONTENT.sectionDescription}
    </motion.p>
  </motion.div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {HOW_IT_WORKS_CONTENT.steps.map((step, index) => (
    <div
      key={index}
      className="bg-neutral-900 p-6 rounded-xl shadow-lg flex flex-col justify-between transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-[0_0_20px_4px_rgba(0,200,255,0.7)]"
    >
      <div>
        <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
        <p className="text-neutral-400 mb-4">{step.description}</p>
      </div>
    </div>
  ))}
</div>

</div>

{/* Key Features */}

<div className="max-w-7xl mx-auto px-4 mt-20">
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false, amount: 0.3 }}
    variants={containerVariants}
    className="text-center mb-12 border-t border-neutral-800"
  >
    <motion.h2
      className="lg:text-5xl mt-20 tracking-tighter bg-gradient-to-t from-neutral-50 via-neutral-300 to-neutral-600 bg-clip-text text-transparent"
      variants={itemVariants}
    >
      {KEY_FEATURES_CONTENT.sectionTitle}
    </motion.h2>
    <motion.p
      className="mt-4 text-neutral-400"
      variants={itemVariants}
    >
      {KEY_FEATURES_CONTENT.sectionDescription}
    </motion.p>
  </motion.div>

  <motion.div
    className="flex flex-wrap justify-between"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false, amount: 0.3 }}
    variants={containerVariants}
  >
    {KEY_FEATURES_CONTENT.features.map((feature) => (
      <motion.div
        key={feature.id}
        variants={itemVariants}
        className="flex flex-col items-center text-center w-full md:w-1/2 lg:w-1/3 p-6"
      >
        <motion.div
          className="flex justify-center items-center mb-4"
          whileHover={{ scale: 1.1 }}
          variants={itemVariants}
        >
          {feature.icon}
        </motion.div>
        <motion.h3 className="text-xl" variants={itemVariants}>
          {feature.title}
        </motion.h3>
        <motion.p
          className="mt-2 text-neutral-400"
          variants={itemVariants}
        >
          {feature.description}
        </motion.p>
      </motion.div>
    ))}
  </motion.div>
</div>

{/* video */}



    </div>
  );
};

export default Homepage;
