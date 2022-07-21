import React from "react";

function Banner() {
  return (
    <div
      className="flex justify-between items-center 
    bg-yellow-400 border-y border-black py-10 lg:p-0"
    >
      <div className="px-10 space-y-5">
        <h1 className="text-6xl max-w-xl font-serif">
          Stay
          <span className="underline ml-3 decoration-black decoration-4">
            curious
          </span>
          .
        </h1>
        <h2 className="text-2xl font-serif">
          Discover stories, thinking, and expertise from writers on any topic.
        </h2>
        <h1
          className="text-white bg-gray-900 w-fit text-xl py-1 px-6 rounded-full
        cursor-pointer hover:bg-black font-semibold transition-all duration-200 ease-out"
        >
          Start reading
        </h1>
      </div>
      <div>
        <img
          className="hidden sm:inline-flex h-32 lg:h-full object-contain"
          src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default Banner;
