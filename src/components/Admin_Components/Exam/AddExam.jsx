import React, { useState } from 'react';
import DashboardLayoutBasic from '../DashboardLayoutBasic';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast'; 
import axios from 'axios';
import API_BASE_URL from '../Config';
import { examFormValidation } from './ExamFormValidation'; // Validation Schema

const AddExam = () => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageValidationError, setImageValidationError] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      examName: '',
      image: null,
    },
    validationSchema: examFormValidation,
    onSubmit: async (values) => {
      try {
        console.log("Form submitted:", values); // Debugging line
        const res = await axios.post(`${API_BASE_URL}/exam/createexam`, {
          examName: values.examName,
          
        });
        toast.success('Exam added successfully!');
        navigate("/admin/Exam")

        // if (res?.data?.status === true) {
        //   toast.success('Exam added successfully!');
        // }
      } catch (error) {
        console.error('Error adding exam:', error);
        toast.error('Failed to add exam');
      } finally {
        formik.setSubmitting(false); // Ensure this line is added
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          if (img.width <= 500 && img.height <= 500) {
            setImagePreviews([event.target.result]);
            formik.setFieldValue('image', file);
            setImageValidationError('');
          } else {
            setImageValidationError('Image must be 500x500 pixels or smaller.');
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <DashboardLayoutBasic>
      <div className="min-h-screen p-10">
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6">Add New Exam</h1>
          <form onSubmit={formik.handleSubmit}  method ="post" className="space-y-6">
            <div>
              <label htmlFor="examName" className="block text-lg font-medium mb-2">
                Exam Name
              </label>
              <input
                id="examName"
                name="examName"
                type="text"
                placeholder="Enter exam name"
                value={formik.values.examName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.examName && formik.errors.examName && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.examName}</p>
              )}
            </div>

            <div>
              <label htmlFor="image" className="block text-lg font-medium mb-2">
                Upload Image
              </label>
              <input
                id="image"
                name="file"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
              />
              {imageValidationError && (
                <p className="text-red-500 text-sm mt-1">{imageValidationError}</p>
              )}
            </div>

            {imagePreviews.length > 0 && (
              <div className="mt-4">
                <img
                  src={imagePreviews[0]}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-md"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Submitting...' : 'Add Exam'}
            </button>
          </form>
        </div>
      
      </div>
    </DashboardLayoutBasic>
  );
};

export default AddExam;



