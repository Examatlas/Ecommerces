import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import DashboardLayoutBasic from '../DashboardLayoutBasic';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup'; // For validation
import axios from 'axios';
import toast from 'react-hot-toast';
import API_BASE_URL from '../Config';

const EditExam = () => {
    const [imagePreview, setImagePreview] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const [examData, setExamData] = useState({
        examName: '',
        image: '',
    });

    // Fetch Exam by ID
    const fetchExamById = async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/exam/getexambyid/${id}`);
            const exam = response?.data?.exam;
            setExamData(exam);
            formik.setFieldValue('examName', exam.examName);
            if (exam.image) setImagePreview(exam.image);
        } catch (error) {
            console.error('Error fetching exam:', error);
        }
    };

    useEffect(() => {
        fetchExamById(id);
    }, [id]);

    // Handle Image Change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64Image = reader.result;
            formik.setFieldValue('image', base64Image); // Set base64 image to form state
            setImagePreview(base64Image); 
        };

        if (file) reader.readAsDataURL(file);
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            examName: examData.examName || '',
            image: examData.image || '',
        },
        validationSchema: Yup.object({
            examName: Yup.string().required('Exam name is required'),
            image: Yup.string().required('An image is required'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.put(
                    `${API_BASE_URL}/exam/update/${id}`,
                    values
                );
                toast.success("updated successfully!")
                navigate("/admin/Exam")
                console.log('Update response:', response.data); // Log the response
               
            } catch (error) {
                toast.error('Error updating the exam');
                console.error('Error:', error);
            }
        },
    });

    return (
        <DashboardLayoutBasic>
            <div className="min-h-[100vh]">
                <div className="md:mx-10 my-10 rounded-md">
                    <h1 className="text-4xl my-4 ml-16">Update Exam</h1>
                    <form onSubmit={formik.handleSubmit} className="w-[90%] mx-auto">
                        {/* Exam Name */}
                        <div className="flex flex-col justify-start">
                            <label htmlFor="examName" className="text-start text-xl">
                                Exam Name
                            </label>
                            <input
                                type="text"
                                id="examName"
                                name="examName"
                                placeholder="Enter Exam Name"
                                onChange={formik.handleChange}
                                value={formik.values.examName}
                                className="px-2 py-2 border border-gray-500 rounded-md my-1 outline-blue-400 text-lg"
                            />
                            {formik.errors.examName && (
                                <p className="text-sm text-red-500 text-left">
                                    {formik.errors.examName}
                                </p>
                            )}
                        </div>

                        {/* Image Upload */}
                        <div className="my-4">
                            <label htmlFor="image" className="text-start text-xl">
                                Upload Image
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block w-full text-lg border border-gray-500 rounded-md my-1 outline-blue-400"
                            />
                            {formik.errors.image && (
                                <p className="text-sm text-red-500">{formik.errors.image}</p>
                            )}

                            {/* Image Preview */}
                            {imagePreview && (
                                <div className="mt-2">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-24 h-24 object-cover rounded-md"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
                        >
                            Update Exam
                        </button>
                    </form>
                </div>
            </div>
        </DashboardLayoutBasic>
    );
};

export default EditExam;
