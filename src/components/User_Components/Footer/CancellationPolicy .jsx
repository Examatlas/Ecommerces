// src/components/CancellationPolicy.js

import React from 'react';

const CancellationPolicy = () => {
  return (
    <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8 mt-20 mb-20">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Cancellation & Refund Policy
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          <strong>Last updated on Oct 7th 2022</strong>
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Crown Publications believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Cancellations</h2>
          <p className="text-lg text-gray-700 mb-4">
            Cancellations will be considered only if the request is made immediately after placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Damaged or Defective Items</h2>
          <p className="text-lg text-gray-700 mb-4">
            In case of receipt of damaged or defective items, please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within the same day of receipt of the products.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Refunds</h2>
          <p className="text-lg text-gray-700 mb-4">
            In case of any refunds approved by Crown Publications, it’ll take 6-8 days for the refund to be processed to the end customer.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Contact Us</h2>
          <p className="text-lg text-gray-700">
            If you have any questions regarding the cancellation and refund policy, please contact us at:
          </p>
          <p className="text-lg text-gray-700 mb-4">
            <strong>Email:</strong> support@crownpublications.in
          </p>
          <p className="text-lg text-gray-700 mb-4">
            <strong>Phone:</strong> 9153434753
          </p>
        </section>
      </div>
    </div>
  );
};

export default CancellationPolicy;
