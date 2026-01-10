import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-200 rounded-lg overflow-hidden my-10 shadow-sm bg-white">
      {/* Hero left side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-16 sm:py-0 px-6 sm:px-12 bg-white relative">
        <div className="text-primary absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(250,237,205,0.3),transparent)] pointer-events-none"></div>
        <div className="text-primary space-y-5 relative z-10 max-w-lg">
          <div className="flex items-center gap-3 animate-fade-in">
            <span className="w-12 h-[1px] bg-accent"></span>
            <p className="font-medium text-sm tracking-[0.3em] text-secondary font-outfit uppercase">
              New Season
            </p>
          </div>
          <h1 className="font-prata text-5xl sm:text-6xl lg:text-7xl leading-[1.1] text-primary animate-slide-up">
            Timeless <br /> <span className="text-gray-400 italic font-light">Elegance</span>
          </h1>
          <p className="text-gray-500 font-outfit text-sm md:text-base leading-relaxed max-w-md animate-fade-in delay-75">
            Discover our curated collection of premium essentials designed for the modern lifestyle. Quality meets sophistication.
          </p>
          <div className="flex items-center gap-3 group cursor-pointer animate-fade-in delay-100 pt-2">
            <p className="font-semibold text-sm tracking-widest text-primary font-outfit group-hover:text-accent transition-colors uppercase border-b-2 border-primary group-hover:border-accent pb-1">
              Explore Collection
            </p>
          </div>
        </div>
      </div>
      {/* Hero right side */}
      <div className="w-full sm:w-1/2 overflow-hidden bg-gray-100">
        <img 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out" 
          src={assets.hero} 
          alt="Latest Arrivals" 
        />
      </div>
    </div>
  );
};

export default Hero;
