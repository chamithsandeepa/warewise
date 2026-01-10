import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-6">
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-primary opacity-60"></p>
      <p className="text-gray-500 font-medium text-sm sm:text-base tracking-[0.2em] font-prata">
        {text1} <span className="text-primary font-medium">{text2}</span>
      </p>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-primary opacity-60"></p>
    </div>
  );
};

export default Title;
