import React from 'react';
import { Link, useSearchParams } from "react-router-dom";
import OrderHistory from './OrderHistory';
import RecentOrder from './RecentOrder';
// import OrderTrack from "./OrderTrack";

const PaymentSuccess = () => {
    const searchQuery = useSearchParams()[0];
    const referenceNum = searchQuery.get("reference");

    return (
        <>
            <div style={{ height: '100vh', display: 'flex', marginTop: "150px", alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ display: 'flex', width: '100%', maxWidth: '600px' }}>
                    <div className='ml-[130px]'>
                        <h1 style={{ textTransform: 'uppercase', color: 'royalblue', fontWeight: "bold", fontSize: "20px",textAlign:"center" }}>Order Successful</h1>
                        <p className='mb-[10px] whitespace-nowrap'>Reference No. {referenceNum}</p>
                    </div>
                    <Link to={"/OrderHistory"}>
                        <button className= 'relative ml-[420px] whitespace-nowrap p-2 rounded-md border border-blue-500 bg-blue-500 text-white font-semibold text-xl'>Order History</button>
                    </Link>
                </div>
                
                {/* Uncomment to show order tracking */}
                {/* <p className='text-xl text-blue-900 font-semibold mb-5'>Track your order</p> */}
                {/* <OrderTrack /> */}

                <RecentOrder />
            </div>
        </>
    );
}

export default PaymentSuccess;
