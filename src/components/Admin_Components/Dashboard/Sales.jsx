import React from 'react';
import SalesChart from "./SalesChart";

const Sales = () => {
    return (
        <div>
            <div className="border border-gray-300 lg:w-[800px] md:w-[540px] sm:w-[500px] w-[380px] h-[150px] rounded-lg mt-2 ml-3  md:mr-7 
            sm:mr-1  mr-2 ">
                <p className="p-5 pr-44 font-semibold flex text-xl">Sales (12 Months) </p>
                <div className=" w-[800px] h-[80px] rounded-lg  mr-10 ">
                    <div className="flex  text-sm ">
                        <p className="lg:pl-28 md:pl-12 sm:pl-10 pl-7">Total Sales</p>
                        <p className="lg:pl-44 md:pl-12 sm:pl-10 pl-7">Products</p>
                        <p className="lg:pl-44 md:pl-12 sm:pl-10 pl-7">Learners</p>
                    </div>
                    <div className="flex pt-3 text-xl font-semibold">
                        <p className="lg:pl-32 md:pl-16 sm:pl-14 pl-10">₹ 0</p>
                        <p className="lg:pl-52 md:pl-20 sm:pl-20 pl-14">N/A</p>
                        <p className="lg:pl-52 md:pl-20 sm:pl-14 pl-14">N/A</p>
                    </div>
                </div>

            </div>

            <SalesChart />

            <div className="border border-gray-300 lg:w-[850px] md:w-[520px] sm:w-[500px] w-[380px] h-[150px] rounded-lg mt-5 lg:ml-3 md:ml-7 m-3">
                <p className="p-5 pr-44 font-semibold flex text-xl">Top 5 Selling Products</p>

                No data Avaliable

            </div>
        </div>
    );
};

export default Sales;
