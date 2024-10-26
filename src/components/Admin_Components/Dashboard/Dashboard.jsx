import React, { useState } from "react";
import PropTypes from "prop-types";
import DashboardLayoutBasic from "../DashboardLayoutBasic";
import Learners from "./Learners";
import Sales from "./Sales";
import Orders from "./Orders";
import Apps from "./Apps";
import HeadphonesIcon from '@mui/icons-material/Headphones';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import GradeIcon from '@mui/icons-material/Grade';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Sales')

  const renderComponent = () => {
    switch (activeTab) {
      case 'Sales':
        return <Sales />
      case 'Learners':
        return <Learners />
      case 'Orders':
        return <Orders />
      case 'Apps':
        return <Apps />
      default:
        return null;
    }
  }

  return (
    <DashboardLayoutBasic>
      <div>
        <h1 className="text-2xl lg:mr-[1000px] md:mr-[600px] sm:mr-[700px] mr-[350px] font-semibold m-3">Welcome, Crown</h1>
        <div className="lg:flex md:flex sm:flex mt-7">
          <div className="flex flex-col">
            <div className="border border-gray-300 lg:w-[800px] md:w-[540px] sm:w-[500px] w-[380px] h-[80px] rounded-lg m-2 lg:mr-10 md:ml-4 pt-3 ">
            <div className="flex  text-sm ">
                        <p className="lg:pl-28 md:pl-12 sm:pl-10 pl-7">Total Sales</p>
                        <p className="lg:pl-44 md:pl-12 sm:pl-10 pl-7">Products</p>
                        <p className="lg:pl-44 md:pl-12 sm:pl-10 pl-7">Learners</p>
                    </div>
                    <div className="flex pt-3 text-xl font-semibold">
                        <p className="lg:pl-32 md:pl-16 sm:pl-14 pl-10">₹ 0</p>
                        <p className="lg:pl-52 md:pl-20 sm:pl-10 pl-14">N/A</p>
                        <p className="lg:pl-52 md:pl-20 sm:pl-10  pl-14">N/A</p>
                    </div>
            </div>

            <div className="border border-gray-300 lg:w-[800px] md:w-[540px]  sm:w-[500px] w-[380px] h-[60px] rounded-lg m-2 lg:mr-10 md:mr-7 flex pt-4 md:ml-4">
              <button className={` pl-8  ${activeTab === "Sales" ? 'text-blue-500 font-semibold' : ''}`}
                onClick={() => setActiveTab('Sales')}>Sales</button>

              <button className={`pl-8  ${activeTab === 'Learners' ? 'text-blue-500 font-semibold' : ''}`}
                onClick={() => setActiveTab('Learners')}>Learners</button>

              <button className={`pl-8  ${activeTab === 'Orders' ? 'text-blue-500 font-semibold' : ''}`}
                onClick={() => setActiveTab('Orders')}>Orders</button>

              <button className={`pl-8  ${activeTab === 'Apps' ? 'text-blue-500 font-semibold' : ''}`}
                onClick={() => setActiveTab('Apps')}>Apps</button>
            </div>
          </div>

          <div className="border border-gray-300 lg:w-[350px] md:w-[220px] w-[380px] h-[150px] rounded-lg mt-2 m-2 ">
            <p className="p-5 lg:pr-44 md:pr-28 font-semibold flex ">Scheduled events</p>
            <p className="pt-5">No Scheduled Events</p>
          </div>

        </div>

        <div className="lg:flex md:flex sm:flex">{renderComponent()}
          

          <div className="border border-gray-300 lg:w-[350px]  md:w-[220px] w-[380px] lg:h-[420px] md:h-[600px] sm:h-[580px] h-[480px]  rounded-lg mt-2 p-5  ">
            {/* Pending Tasks Heading */}
            <p className="font-semibold text-center lg:pr-40 md:pr-20 text-lg ">Pending Tasks</p>

            {/* Icon and two text elements aligned in a row */}
            <div className="flex justify-center items-center mt-12">
              <HeadphonesIcon className="mr-4" /> {/* Icon with margin-right */}
              <div className="flex flex-col lg:mr-28 md:mr-16">
                <p className="font-semibold ">Support Tickets</p>
                <p className="text-sm text-gray-500">No Pending Tasks</p>
              </div>
            </div>

            {/* Horizontal Line */}
            <hr className="mt-7 border-gray-300" />

            <div className="flex justify-center items-center mt-12">
              <MapsUgcIcon className="lg:mr-4 md:mr-3" /> {/* Icon with margin-right */}
              <div className="flex flex-col  lg:mr-8 md:mr-12 ml-3">
                <p className="font-semibold ">UnAnswered Discussions</p>
                <p className="text-sm text-gray-500 lg:mr-20  ">No Pending Tasks</p>
              </div>
            </div>

            {/* Horizontal Line */}
            <hr className="mt-7 border-gray-300" />

            <div className="flex justify-center items-center mt-12">
              <GradeIcon className="lg:mr-4 md:mr-4" /> {/* Icon with margin-right */}
              <div className="flex flex-col lg:mr-24 sm:mr-7 ml-3">
                <p className="font-semibold ">Rating & Reviews</p>
                <p className="text-sm text-gray-500">No Pending Tasks</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </DashboardLayoutBasic>
  );
};

Dashboard.propTypes = {
  pathname: PropTypes.string,
};

export default Dashboard;
