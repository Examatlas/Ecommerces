import React from 'react';
import download from "../Image/download.png";

const Apps = () => {
  return (
    <div>
            <div className="border border-gray-300 lg:w-[800px] md:w-[540px] sm:w-[500px] w-[380px] h-[420px] rounded-lg mt-3 ml-3 md:mr-10 sm:mr-3 mr-2">
                
                <img src={download}  className='w-[400px] lg:ml-44 md:ml-20 sm:ml-7 ml-2  mt-12'/>
                <p >Apps Insights Coming Soon</p>
            </div>
        </div>
  );
};

export default Apps;
