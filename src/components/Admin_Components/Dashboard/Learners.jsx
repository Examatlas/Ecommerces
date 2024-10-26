import React from 'react';
import LearnerSignupChart from './LearnerSignupChart';

const Learners = () => {
  return (
    <div>
    <div className="border border-gray-300 lg:w-[800px] md:w-[540px] sm:w-[500px] w-[380px] h-[150px] rounded-lg mt-2 ml-3 md:mr-10 sm:mr-3 mr-2">
    <p className="p-5 pr-44 font-semibold flex text-xl">Learners (12 Months) </p>
                <div className=" w-[800px] h-[80px] rounded-lg  mr-10 ">
                    <div className="flex  text-sm ">
                        <p className="lg:pl-48 md:pl-20 sm:pl-10 pl-5">Total Signups</p>
                        <p className="lg:pl-44 md:pl-20 sm:pl-10 pl-5">Avg. Signups / Month</p>
                    </div>
                    <div className="flex pt-3 text-xl font-semibold pb-3">
                        <p className="lg:pl-56 md:pl-28 sm:pl-20 pl-12">1</p>
                        <p className="lg:pl-72 md:pl-44 sm:pl-28 pl-28">0</p>
                    </div>
                </div>
    </div>
    <LearnerSignupChart />
</div>
  );
};

export default Learners;