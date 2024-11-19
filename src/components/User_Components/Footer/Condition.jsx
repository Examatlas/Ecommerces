import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto text-gray-700 mt-20 mb-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
        Terms & Conditions
      </h1>
      <div className="space-y-6">
        {/* Welcome Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">Welcome to Crown Publications</h2>
          <p>
            You are welcome to <strong>crownpublications.in</strong>. You can avail the
            services offered here or through its affiliates, but prior to that, you
            need to agree to the terms and conditions. If you browse our Online
            Bookstore, you have to accept these conditions.
          </p>
        </section>

        {/* Privacy Policy Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">Privacy Policy</h2>
          <p>
            Make sure that you thoroughly review the privacy policy that governs
            the visit to our site.
          </p>
        </section>

        {/* Modification of Orders Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">Modification of Orders</h2>
          <p>
            If there is a change in quantity or addition of items or if specific
            changes have been accepted, we can modify the details of the orders.
            All the sales are final, and cancellations of the items can be made
            before the order is finally shipped. Without any liability, we might
            cancel the accepted order before the shipment if the credit department
            does not give the approval of your credit. We can do the same if there
            is a problem with the mode of payment that you have selected.
          </p>
        </section>

        {/* Risk of Loss Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">Risk of Loss</h2>
          <p>
            All items purchased from Crown Publications are made pursuant to a
            shipment contract. This means that the risk of loss and title for such
            items passes to you upon our delivery to the carrier.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
