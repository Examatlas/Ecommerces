import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import RecentOrder from "./RecentOrder";

const PaymentSuccess = () => {
  const searchQuery = useSearchParams()[0];
  const referenceNum = searchQuery.get("reference");

  return (
    <div className="flex flex-col items-center mt-150 mb-6 px-4">
      <div className="w-full max-w-lg text-center space-y-4 mb-6">
        <br /> <br /> <br /> <br /> <br />
        <h1 className="text-xl font-bold text-royalblue uppercase mt-100">Order Successful</h1>
        <p className="text-gray-700">
          Reference No.: <span className="font-semibold">{referenceNum}</span>
        </p>
        <Link to="/OrderHistory">
          <button className="ml-100 px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-semibold hover:bg-blue-600 transition">
            View Order History
          </button>
        </Link>
      </div>

      {/* Recent Order Component */}
      <div className="w-full">
        <RecentOrder />
      </div>
    </div>
  );
};

export default PaymentSuccess;
