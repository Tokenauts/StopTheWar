import React, { useState } from "react";

const Banner = () => {
  const images = ["1st.jpg", "2nd.jpg", "3rd.jpg", "4th.jpg"];

  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index) => {
    if (index < 0) {
      setActiveIndex(images.length - 1);
    } else if (index >= images.length) {
      setActiveIndex(0);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="max-w-3xl relative mb-4 mt-4 ml-4 rounded-Banner h-1/4 overflow-hidden ">
        <div
          className="transform transition-transform duration-1000 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          <div className="flex">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-fit"
              />
            ))}
          </div>
        </div>
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === activeIndex ? "bg-blue-500" : "bg-gray-400"
              }`}
              onClick={() => setActiveIndex(index)}
            ></button>
          ))}
        </div>
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-primary bg-opacity-80 text-black rounded-full p-2 px-4"
          onClick={() => goToSlide(activeIndex - 1)}
        >
          &lt;
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-primary bg-opacity-80 text-black rounded-full p-2 px-4"
          onClick={() => goToSlide(activeIndex + 1)}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Banner;
