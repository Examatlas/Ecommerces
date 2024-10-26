import React from 'react';

const Orders = () => {
  return (
    <div>
    <div className="border border-gray-300 lg:w-[800px] md:w-[540px] sm:w-[500px] w-[380px] h-[150px] rounded-lg mt-2 ml-3 md:mr-10 sm:mr-3 mr-2">
    <p className="p-5 pr-44 font-semibold flex text-xl">Orders (MTD) </p>
                <div className=" w-[800px] h-[80px] rounded-lg  mr-10 ">
                    <div className="flex  text-sm ">
                        <p className="lg:pl-48 md:pl-20 sm:pl-10 pl-5">Success Order</p>
                        <p className="lg:pl-48 md:pl-20 sm:pl-10 pl-5">Failed Orders</p>
                    </div>
                    <div className="flex pt-3 text-xl font-semibold">
                        <p className="lg:pl-56 md:pl-28 sm:pl-20 pl-12">0</p>
                        <p className="lg:pl-72 md:pl-36 sm:pl-32 pl-24">0</p>
                    </div>
                </div>
    </div>

    <div className="border border-gray-300 lg:w-[800px] md:w-[540px] sm:w-[500px] w-[380px] h-[230px] rounded-lg mt-10 ml-3 md:mr-10 sm:mr-3 mr-2 p-24">No Data Avaliable</div>
</div>
  );
};

export default Orders;
