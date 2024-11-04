import React, { useState } from 'react';
import DashboardLayoutBasic from '../DashboardLayoutBasic';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import { modules, formats } from "../../Admin_Components/config/ReactQuillConfig";
import BlogFormvalidationSchema from './BlogFormValidation';
import { RxCross2 } from "react-icons/rx";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../Config';
import axios from 'axios';

const AddBlog = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && inputValue.trim() !== '') {
            formik.setFieldValue('tags', [...formik.values.tags, inputValue]);
            setInputValue('');
            event.preventDefault();
        }
    };

    const handleRemoveTag = (index) => {
        const newTags = formik.values.tags.filter((_, i) => i !== index);
        formik.setFieldValue('tags', newTags);
    };

    const handleImageChange = (event) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            formik.setFieldValue('images', [...files]);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(files[0]); 
        }
    };

    const handleDescriptionChange = (value) => {
        formik.setFieldValue('content', value);
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            keyword: '',
            content: '',
            tags: [],
            images: [],
        },
        validationSchema: BlogFormvalidationSchema,
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("keyword", values.keyword);
            formData.append("content", values.content);
            formData.append("tags", JSON.stringify(values.tags)); 

            // Append images to FormData
            values.images.forEach(image => {
                formData.append("images", image);
            });

            try {
                const res = await axios.post(`${API_BASE_URL}/blog/createBlog`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                if (res.data.status === true) {
                    toast.success(res.data.message);
                    setTimeout(() => {
                        navigate("/admin/blog");
                    }, 3000);
                }
            } catch (error) {
                toast.error(error.message);
                console.log("Error occurred during blog submission", error);
            }
        },
    });

    return (
        <DashboardLayoutBasic>
            <div className='min-h-[100vh]'>
                <div className='md:mx-10 rounded-md'>
                    <h1 className='text-4xl mb-5'>Add Blog</h1>
                    <form onSubmit={formik.handleSubmit} className='w-[90%] mx-auto'>
                        {/* Title */}
                        <div className='flex flex-col justify-start'>
                            <label htmlFor="title" className='text-start text-xl'>Title</label>
                            <input
                                type="text"
                                placeholder='Title'
                                name='title'
                                id="title"
                                onChange={formik.handleChange}
                                value={formik.values.title}
                                className='px-2 py-2 border border-gray-500 rounded-md my-1 outline-blue-400 text-lg'
                            />
                            {formik.errors.title && <p className='text-sm text-red-500 text-left'>{formik.errors.title}</p>}
                        </div>

                        {/* Keyword */}
                        <div className='flex my-4 flex-col justify-start'>
                            <label htmlFor="keyword" className='text-start text-xl'>Keyword</label>
                            <input
                                type="text"
                                placeholder='Keyword'
                                name='keyword'
                                id="keyword"
                                onChange={formik.handleChange}
                                value={formik.values.keyword}
                                className='px-2 py-2 border border-gray-500 rounded-md my-1 outline-blue-400 text-lg'
                            />
                            {formik.errors.keyword && <p className='text-sm text-red-500 text-left'>{formik.errors.keyword}</p>}
                        </div>

                        {/* Content Editor */}
                        <div className='flex flex-col justify-start my-4'>
                            <label htmlFor="content" className='text-start text-xl'>Content</label>
                            <ReactQuill
                                id='content'
                                name="content"
                                theme="snow"
                                value={formik.values.content}
                                modules={modules}
                                formats={formats}
                                onChange={handleDescriptionChange}
                                className='text-3xl h-[20rem] rounded-md'
                            />
                            {formik.errors.content && <p className='text-sm text-red-500 text-left'>{formik.errors.content}</p>}
                        </div>

                        {/* Tags */}
                        <div className='mb-4 flex flex-col mt-28'>
                            <div className='flex gap-2'>
                                {formik.values.tags.map((tag, index) => (
                                    <div key={index} className='bg-gray-300 flex justify-center items-center rounded-full w-fit px-5 py-1 gap-2'>
                                        <strong>{tag}</strong>
                                        <RxCross2 onClick={() => handleRemoveTag(index)} className='cursor-pointer' />
                                    </div>
                                ))}
                            </div>
                            <label htmlFor="tags" className='text-start text-xl'>Tags</label>
                            <input
                                type="text"
                                id='tags'
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyPress}
                                className='px-2 py-2 border border-gray-500 rounded-md my-1 outline-blue-400 text-lg'
                                placeholder="Enter a tag and press Enter"
                            />
                            {formik.errors.tags && <p className='text-sm text-red-500 text-left'>{formik.errors.tags}</p>}
                        </div>

                        {/* Images */}
                        <div className='flex flex-col'>
                            <label htmlFor="images" className='text-start text-xl'>Upload Images</label>
                            <input type="file"
                                name="images"
                                id="images"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                className='cursor-pointer w-full md:w-[40%] h-9 border-gray-500 rounded-md my-1 outline-blue-400 text-lg'
                            />
                            <div className='w-[99%] mx-auto md:mx-0 sm:w-[100%] lg:w-[600px] h-[300px] border border-gray-400'>
                                {imagePreview && <img src={imagePreview} alt="Preview" className='w-[100%] h-[300px]' />}
                            </div>
                        </div>

                        <button type="submit" className='my-4 px-4 py-3 bg-blue-500 text-white rounded-md float-start text-lg hover:bg-blue-600'>Publish</button>
                    </form>
                </div>
            </div>
        </DashboardLayoutBasic>
    );
};

export default AddBlog;
