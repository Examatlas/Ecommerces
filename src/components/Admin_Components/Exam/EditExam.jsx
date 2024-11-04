import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import API_BASE_URL from '../Config';
import DashboardLayoutBasic from '../DashboardLayoutBasic';

const EditExam = () => {
    const [imagePreview, setImagePreview] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const [examData, setExamData] = useState({
        examName: '',
        images: [],
    });

    // Fetch Exam by ID
    const fetchExamById = async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/exam/getexambyid/${id}`);
            const exam = response.data.exam;
            setExamData(exam);
            formik.setFieldValue('examName', exam.examName);
            if (exam.images && exam.images.length > 0) {
                setImagePreview(exam.images[0].url);
                formik.setFieldValue('image', exam.images[0].url);
            }
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
        formik.setFieldValue('image', file); // Set file object for upload

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result); // Set base64 preview
        };
        if (file) reader.readAsDataURL(file);
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            examName: examData.examName || '',
            image: '',
        },
        validationSchema: Yup.object({
            examName: Yup.string().required('Exam name is required'),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('examName', values.examName);
            if (values.image) formData.append('images', values.image);

            try {
                const response = await axios.put(`${API_BASE_URL}/exam/update/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast.success("Updated successfully!");
                navigate("/admin/Exam");
                console.log('Update response:', response.data);
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
                                    className="w-80 h-50 object-cover rounded-md"
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
