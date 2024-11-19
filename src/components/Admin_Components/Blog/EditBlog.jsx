import React, { useEffect, useState } from 'react';
import DashboardLayoutBasic from '../DashboardLayoutBasic';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import BlogFormvalidationSchema from './BlogFormValidation';
// icons
import { RxCross2 } from "react-icons/rx";
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import API_BASE_URL from '../Config';
import axios from 'axios';

const EditBlog = () => {
    const [imagePreviews, setImagePreviews] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [images, setImages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [blogData, setBlogData] = useState({
        title: '',
        keyword: '',
        content: '',
        tags: [],
        images: [],
    });

    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch blog by ID
    const fetchBlogById = async (blogId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/blog/getBlogById/${blogId}`);
            const blog = response?.data?.blog;
            setBlogData(blog);
            formik.setFieldValue('tags', blog?.tags);

            if (blog.images?.length > 0) {
                setImages(blog.images);
                formik.setFieldValue('images', blog.images.map((image) => image.url));
                setImagePreviews(blog.images.map((image) => image.url));
            }
        } catch (error) {
            console.log("Error fetching blog data:", error);
        }
    };

    useEffect(() => {
        fetchBlogById(id);
    }, [id]);

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],
        [{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']
    ];

    const modules = {
        toolbar: toolbarOptions,
    };

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

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map((file) => URL.createObjectURL(file));

        // Set selected images and previews
        setSelectedImages((prev) => [...prev, ...files]);
        setImagePreviews((prev) => [...prev, ...previews]);
        formik.setFieldValue('images', [...formik.values.images, ...files]);
    };

    const handleRemoveImage = async (index) => {
        const imageUrl = imagePreviews[index];
        const filename = imageUrl.split('/').pop();  
        try {
            const response = await axios.delete(`${API_BASE_URL}/blog/deleteImage/${filename}`);

            if (response.status === 200) {
                setImagePreviews((prevImages) => prevImages.filter((_, idx) => idx !== index));
            }
        } catch (error) {
            console.error('Error removing image:', error);
        }
    };


    const handleDescriptionChange = (value) => {
        formik.setFieldValue('content', value);
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: blogData?.title,
            keyword: blogData?.keyword,
            content: blogData?.content,
            tags: blogData?.tags || [],
            images: [],
        },
        validationSchema: BlogFormvalidationSchema,
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('keyword', values.keyword);
            formData.append('content', values.content);
            formData.append('tags', values.tags);

            values.images.forEach((image) => formData.append('images', image));

            try {
                const response = await axios.put(`${API_BASE_URL}/blog/updateBlog/${id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                if (response?.data?.status) {
                    toast.success(response?.data?.message);
                    setTimeout(() => navigate("/admin/blog"), 3000);
                }
            } catch (error) {
                toast.error(error?.message);
                console.error("Error occurred during blog submit:", error);
            }
        },
    });

    return (
        <DashboardLayoutBasic>
            <div className='min-h-[100vh]'>
                <div className='md:mx-10 my-10 rounded-md'>
                    <h1 className='text-4xl my-4'>Update Blog</h1>
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
                            {formik.errors.title && <p className='text-sm text-red-500'>{formik.errors.title}</p>}
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
                            {formik.errors.keyword && <p className='text-sm text-red-500'>{formik.errors.keyword}</p>}
                        </div>

                        {/* Editor */}
                        <div className='flex flex-col justify-start my-4'>
                            <label htmlFor="content" className='text-start text-xl'>Content</label>
                            <ReactQuill
                                id='content'
                                name="content"
                                theme="snow"
                                value={formik.values.content}
                                modules={modules}
                                onChange={handleDescriptionChange}
                                className='text-3xl h-[20rem] rounded-md'
                            />
                            {formik.errors.content && <p className='text-sm text-red-500'>{formik.errors.content}</p>}
                        </div>

                        {/* Tags */}
                        <div className='mb-4 flex flex-col'>
                            {/* Display tags */}
                            <div className='flex gap-2 mt-28'>
                                {formik.values.tags?.map((tag, index) => (
                                    <div key={index} className='bg-gray-300 flex justify-center items-center rounded-full w-fit px-5 py-1 gap-2'>
                                        <strong>{tag}</strong>
                                        <RxCross2 onClick={() => handleRemoveTag(index)} className='cursor-pointer' />
                                    </div>
                                ))}
                            </div>
                            <label htmlFor="tags" className='text-start text-xl mt-3'>Tags</label>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyPress}
                                className='px-2 py-2 border border-gray-500 rounded-md my-1 outline-blue-400 text-lg'
                                placeholder='Press enter to add a tag'
                            />
                            {formik.errors.tags && <p className='text-sm text-red-500'>{formik.errors.tags}</p>}
                        </div>

                        {/* Images */}
                        <div className="flex flex-wrap gap-4">
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="relative">
                                    <img src={preview} alt="Image Preview" className="w-32 h-32 object-cover rounded-md" />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-0 right-0 text-red-500"
                                    >
                                        <RxCross2 size={20} />
                                    </button>
                                </div>
                            ))}
                            <input
                                type="file"
                                onChange={handleImageChange}
                                accept="image/*"
                                multiple
                                className="mt-2"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={formik.isSubmitting}
                            className='w-full mt-8 py-3 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-md'
                        >
                            {formik.isSubmitting ? 'Updating...' : 'Update Blog'}
                        </button>
                    </form>
                </div>
            </div>
        </DashboardLayoutBasic>
    );
};

export default EditBlog;

