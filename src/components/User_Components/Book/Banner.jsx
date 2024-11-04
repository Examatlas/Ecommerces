// import React, { useEffect, useState } from 'react';
// import pic1 from "../images/pic1.png";
// import pic2 from "../images/pic2.png";
// import pic3 from "../images/pic3.png";
// import pic4 from "../images/pic4.png";
// import pic5 from "../images/pic5.png";

// const Banner = () => {
//   const images = [pic1, pic2, pic3, pic4, pic5]; // Use your local images

//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCurrentIndex((prevIndex) =>
//         prevIndex === images.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 5000); // Change image every 5 seconds

//     return () => clearInterval(intervalId); 
//   }, [images.length]);

//   const handleDotClick = (index) => {
//     setCurrentIndex(index);
//   };

//   return (
//     <div className=" mt-1 w-[1450px] h-[300px] m-5 ml-16 overflow-hidden relative">
//       <div
//         className="flex transition-transform duration-500"
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//         {images.map((image, index) => (
//           <img
//             key={index}
//             src={image}
//             alt={`Banner ${index + 1}`}
//             className="w-full h-auto"
//           />
//         ))}
//       </div>

//       {/* Dot Indicators */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             className={`w-3 h-3 rounded-full ${
//               currentIndex === index ? 'bg-gray-800' : 'bg-gray-400'
//             }`}
//             onClick={() => handleDotClick(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Banner;

import React, { useEffect, useState } from 'react';
import pic1 from "../images/pic1.png";
import pic2 from "../images/pic2.png";
import pic3 from "../images/pic3.png";
import pic4 from "../images/pic4.png";
import pic5 from "../images/pic5.png";

const Banner = () => {
  const images = [pic1, pic2, pic3, pic4, pic5]; // Use your local images

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000); // Change image every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [images.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="mt-1 w-[1450px] h-[300px] m-5 ml-16 overflow-hidden relative">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Banner ${index + 1}`}
            className="w-full h-auto"
          />
        ))}
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-gray-800' : 'bg-gray-400'}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
