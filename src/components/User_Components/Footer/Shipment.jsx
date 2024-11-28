// src/components/ShipmentProcessing.js

import React from 'react';

const ShipmentProcessing = () => {
  return (
    <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8 mt-20 mb-20">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Shipment Processing Policy
        </h1>

        <p className="text-lg text-gray-700 mb-4">
          <strong>Last updated on Nov 20 , 2024</strong>
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Shipment Processing Time</h2>
          <p className="text-lg text-gray-700 mb-4">
            All orders are processed within 2-3 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Shipment Delays</h2>
          <p className="text-lg text-gray-700 mb-4">
            If there will be a significant delay in the shipment of your order, we will contact you via email or telephone.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Contact Us</h2>
          <p className="text-lg text-gray-700">
            If you have any questions regarding the shipment processing or delays, please contact us at:
          </p>
          <p className="text-lg text-gray-700 mb-4">
            <strong>Email:</strong> crownclassesrnc@gmail.com
          </p>
          <p className="text-lg text-gray-700 mb-4">
            <strong>Phone:</strong> 9153434753
          </p>
        </section>
      </div>
    </div>
  );
};

export default ShipmentProcessing;
