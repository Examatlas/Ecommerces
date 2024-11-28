import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast"
import API_BASE_URL from "./Config";

const Author = () => {
  const [formData, setFormData] = useState({
    authorName: "",
    position: "",
    email: "",
    contactNumber: "",
    title: "",
    topic: "",
    description: "",
    previousWork: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/author/createAuthor`,
        formData
      );
      toast.success("Author created successfully")
      console.log("Form Data Submitted Successfully: ", response.data);
      // Optionally, reset the form after successful submission
      setFormData({
        authorName: "",
        position: "",
        email: "",
        contactNumber: "",
        title: "",
        topic: "",
        description: "",
        previousWork: "",
      });
    } catch (err) {
      setError("There was an error submitting the form. Please try again.");
      toast.error("please try again !!")
      console.error("Error submitting form: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-[150px] mb-[200px] px-4 ">
      <h1 className="text-2xl font-bold text-center mb-8">Author Form</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6 "
      >
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="authorName">
            Author Name
          </label>
          <input
            type="text"
            id="authorName"
            name="authorName"
            value={formData.authorName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter author's name"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="position">
            Position
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter position"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter email"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="contactNumber">
            Contact Number
          </label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter contact number"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
            Title of the Book
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter book title"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="topic">
            Topic
          </label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter topic"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
            Write Short Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter description"
            rows="4"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="previousWork">
            Please List Your Previous Works
          </label>
          <textarea
            id="previousWork"
            name="previousWork"
            value={formData.previousWork}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="List your previous works"
            rows="4"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md ${loading && "opacity-50 cursor-not-allowed"}`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Author;
