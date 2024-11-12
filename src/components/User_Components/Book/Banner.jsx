import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../Config';

const Banner = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBannerImages = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/banner/get-banner`);
        if (response.data && Array.isArray(response.data.data.images)) {
          setImages(response.data.data.images);
        } else {
          console.error("Invalid response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching banner images:", error);
      }
    };

    fetchBannerImages();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
      }, 8000); // 8 seconds interval

      return () => clearInterval(intervalId);
    }
  }, [images.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  if (images.length === 0) {
    return (
      <div className="w-full h-[300px] overflow-hidden relative flex justify-center items-center">
        <div className="spinner-border animate-spin border-4 border-t-transparent border-blue-500 rounded-full w-8 h-8"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-[300px]  overflow-hidden relative">
      <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Banner ${index + 1}`}
            className="w-full h-auto"
            onError={(e) => (e.target.src = 'fallback-image-url')} 
          />
        ))}
      </div>

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




// import React, { useEffect, useState } from 'react';
// import pic1 from "../images/pic1.png";
// import pic2 from "../images/pic2.png";
// import pic3 from "../images/pic3.png";
// import pic4 from "../images/pic4.png";
// import pic5 from "../images/pic5.png";

// const Banner = () => {
//   const images = [pic1, pic2, pic3, pic4, pic5]; 

//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCurrentIndex((prevIndex) =>
//         prevIndex === images.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 8000); 

//     return () => clearInterval(intervalId); 
//   }, [images.length]);

//   const handleDotClick = (index) => {
//     setCurrentIndex(index);
//   };

//   return (
//     <div className=" w-[1450px] h-[300px] ml-16 overflow-hidden relative">
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
//             className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-gray-800' : 'bg-gray-400'}`}
//             onClick={() => handleDotClick(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Banner;

