import React from "react";

const NewsLetterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault;
  };

  return (
    <div className="text-center my-20 bg-gradient-to-b from-gray-50 to-white py-16 rounded-xl animate-fade-in">
      <p className="text-2xl sm:text-4xl font-medium text-primary font-prata mb-4">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-500 mt-3 max-w-xl mx-auto font-outfit leading-relaxed">
        Stay updated with our latest collections, exclusive deals, and fashion
        trends delivered straight to your inbox. Be the first to know about new
        arrivals, seasonal sales, and special promotions.
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-8 border border-gray-200 rounded-full pl-6 pr-2 py-2 shadow-sm hover:shadow-md transition-shadow bg-white"
      >
        <input
          className="w-full sm:flex-1 outline-none text-gray-600 font-outfit bg-transparent"
          type="email"
          placeholder="Enter your email address"
          required
        />
        <button
          className="bg-primary text-white text-xs px-8 py-3 rounded-full hover:bg-black transition-all duration-300 font-medium tracking-wide"
          type="submit"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
