import React from "react";
import img1 from '../../public/img1.jpg';

const Hero = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-16">
        {/* Image Section - with hover effect */}
        <div className="w-full md:w-1/2 relative group overflow-hidden rounded-2xl shadow-2xl">
          <img
            src={img1}
            alt="Athlete pushing limits"
            className="w-full h-auto object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500"></div>
        </div>

        {/* Text Section - with animated elements */}
        <div className="w-full md:w-1/2 space-y-6 lg:space-y-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Unleash Your
            </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Inner Athlete
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
            Take your fitness journey to the next level with our expert guidance, 
            cutting-edge resources, and a community that pushes you forward.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button className="
              px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 
              text-white font-bold rounded-full shadow-lg
              hover:from-blue-700 hover:to-purple-700 
              transform hover:-translate-y-1 transition-all duration-300
              flex items-center justify-center
            ">
              Join Us Today
              <span className="ml-3 text-xl">→</span>
            </button>
            
            <button className="
              px-8 py-4 border-2 border-gray-300 
              text-gray-700 font-medium rounded-full
              hover:border-blue-500 hover:text-blue-600
              transform hover:-translate-y-1 transition-all duration-300
            ">
              Learn More
            </button>
          </div>
          
          {/* Stats bar */}
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">10K+</span>
              <span className="ml-2 text-gray-600">Active Members</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-purple-600">50+</span>
              <span className="ml-2 text-gray-600">Expert Coaches</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;