import React from "react";

const Contactus = () => {
  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto mt-20 mb-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
        Contact Us
      </h1>
      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold">Get in Touch</h2>
          <p>We’re here to help! Whether you have questions about our books, services, or anything else, feel free to reach out to us using the contact details below.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Address</h2>
          <p>Crown Publications</p>
          <p>Aryan Tower, East Jail Road, Ranchi - 834001</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Hotline</h2>
          <p>📞 (+91) 9153434753</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Opening Hours</h2>
          <p>🕒 Monday – Saturday: 11:00 AM – 7:00 PM</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Email Us</h2>
          <p>📧 support@crownpublications.in</p>
        </section>
      </div>
      {/* <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
            <input type="text" id="name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Enter your name" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
            <input type="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Enter your email" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
            <textarea id="message" rows="4" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Write your message"></textarea>
          </div>
          <div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
              Submit
            </button>
          </div>
        </form>
      </div> */}
    </div>
  );
};

export default Contactus;
