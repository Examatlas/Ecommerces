import React, { useState } from 'react';
import DashboardLayoutBasic from './DashboardLayoutBasic';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import BookFormvalidationSchema from './BookFormValidation';
//icons
import { RxCross2 } from "react-icons/rx";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from './Config';
import axios from 'axios';


const AddBook = () => {

    const [inputValue, setInputValue] = useState('');

    const [imagePreviews, setImagePreviews] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageValidationError, setImageValidationError] = useState('');

    const navigate = useNavigate();

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
        toolbar: true,
        toolbar: toolbarOptions,
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && inputValue.trim() !== '') {
            formik.setFieldValue('tags', [
                ...formik.values.tags,
                inputValue
            ]);
            setInputValue('');
            event.preventDefault();
        }
    };

    const handleRemoveTag = (index) => {
        const newTags = formik.values.tags.filter((_, i) => i !== index);
        formik.setFieldValue('tags', newTags);
    };

    const formats = [
        'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike',
        'blockquote', 'list', 'bullet', 'link', 'image', 'video', 'code-block',
        'color', 'background', 'align', 'indent'
    ];

    const handleDescriptionChange = (value) => {
        formik.setFieldValue('content', value);
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            keyword: "",
            content: "",
            author: "",
            category: "",
            price: "",
            sellPrice: "",
            // shippingCharge:"",
            tags: [],
            image: null,
        },
        validationSchema: BookFormvalidationSchema,
        onSubmit: async (values) => {
            try {
                // const res = await axios.post(`${API_BASE_URL}/api/book/createBook`, {
                const res = await axios.post(`${API_BASE_URL}/book/createBook`, {
                    title: values?.title,
                    keyword: values?.keyword,
                    content: values?.content,
                    author: values?.author,
                    category: values?.category,
                    price: values?.price,
                    sellPrice: values?.sellPrice,
                    // shippingCharge:values?.shippingCharge,
                    tags: values?.tags
                });
                if (res?.data?.status === true) {
                    toast.success(res?.data?.message);
                    setTimeout(() => {
                        navigate("/admin/book");
                    }, 3000);
                }
            } catch (error) {
                toast.error(error?.message);
                console.log("Error occured during blog submit", error);
            }
        },
    });

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const validImages = [];
        const validPreviews = [];

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;

                img.onload = () => {
                    if (img.width === 300 && img.height === 300) {
                        validImages.push(file);  // Push valid image to array
                        validPreviews.push(event.target.result);  // Push preview URL
                        formik.setFieldValue('image', validImages);  // Update Formik field with valid images
                        setImageValidationError('');  // Clear previous error
                    } else {
                        setImageValidationError('Each image must be 300x300 pixels.');
                    }

                    setImagePreviews(validPreviews);  // Update state with valid previews
                };
            };

            reader.readAsDataURL(file);
        });
    };

    return (
        <DashboardLayoutBasic>
            <div className='  min-h-[100vh]'>
                <div className='md:mx-10 my-10 rounded-md'>
                    <h1 className='text-4xl my-4 ml-16'>Add Book</h1>
                    <div>
                        <form onSubmit={formik?.handleSubmit} className='w-[90%] mx-auto'>
                            {/* Title */}
                            <div className='flex flex-col justify-start '>
                                <label htmlFor="title" className='text-start text-xl'>Title</label>
                                <input
                                    type="text"
                                    placeholder='Title'
                                    name='title'
                                    id="title"
                                    onChange={formik?.handleChange}
                                    value={formik.values.title}
                                    className='px-2 py-2 border border-gray-500 rounded-md my-1 outline-blue-400 text-lg'
                                />

                                {formik?.errors?.title && <p className=' text-sm text-red-500 text-left'>{formik?.errors?.title}</p>}
                            </div>
                            {/* Keyword */}
                            <div className='flex my-4 flex-col justify-start '>
                                <label htmlFor="keyword" className='text-start text-xl'>Keyword</label>
                                <input
                                    type="text"
                                    placeholder='Keyword'
                                    name='keyword'
                                    id="keyword"
                                    onChange={formik?.handleChange}
                                    value={formik.values.keyword}
                                    className='px-2 py-2 border border-gray-500 rounded-md my-1 outline-blue-400 text-lg'
                                />

                                {formik?.errors?.keyword && <p className=' text-sm text-red-500 text-left'>{formik?.errors?.keyword}</p>}
                            </div>


                            {/* price */}
                            <div className='flex my-4 flex-col justify-start '>
                                <label htmlFor="price" className='text-start text-xl'>Mrp</label>
                                <input
                                    type="number"
                                    placeholder='price'
                                    name='price'
                                    id="price"
                                    onChange={formik?.handleChange}
                                    value={formik.values.price}
                                    className='px-2 py-2 border border-gray-500 rounded-md my-1 outline-blue-400 text-lg'
                                />
                                {formik?.errors?.price && <p className=' text-sm text-red-500 text-left'>{formik?.errors?.price}</p>}
                            </div>


                            {/* sell price */}
                            <div className='flex my-4 flex-col justify-start '>
                                <label htmlFor="price" className='text-start text-xl'>Sell Price</label>
                                <input
                                    type="number"
                                    placeholder='sell price'
                                    name='sellPrice'
                                    id="sellPrice"
                                    onChange={formik?.handleChange}
                                    value={formik.values.sellPrice}
                                    className='px-2 py-2 border border-gray-500 rounded-md my-1 outline-blue-400 text-lg'
                                />
                                {formik?.errors?.sellPrice && <p className=' text-sm text-red-500 text-left'>{formik?.errors?.sellPrice}</p>}
                            </div>


                         
                            {/* <div className='flex flex-col justify-start '>
                                <label htmlFor="shippingCharge" className='text-start text-xl'>shippingCharge</label>
                                <input
                                    type="text"
                                    placeholder='shippingCharge'
                                    name='shippingCharge'
                                    id="shippingCharge"
                                    onChange={formik?.handleChange}
                                    value={formik.values.shippingCharge}
                                    className='px-2 py-2 border border-gray-500 rounded-md my-1 outline-blue-400 text-lg'
                                />
                                {console.log(formik.errors, "error  is ")}  {formik?.errors?.shippingCharge && <p className=' text-sm text-red-500 text-left'>{formik?.errors?.shippingCharge}</p>}
                            </div> */}

                            {/* author */}
                            <div className='flex my-4 flex-col justify-start '>
                                <label htmlFor="author" className='text-start text-xl'>Author</label>
                                <input
                                    type="text"
                                    placeholder='author'
                                    name='author'
                                    id="author"
                                    onChange={formik?.handleChange}
                                    value={formik.values.author}
                                    className='px-2 py-2 border border-gray-500 rounded-md my-1 outline-blue-400 text-lg'
                                />

                                {formik?.errors?.author && <p className=' text-sm text-red-500 text-left'>{formik?.errors?.author}</p>}
                            </div>


                            {/* category */}
                            <div className='flex my-4 flex-col justify-start '>
                                <label htmlFor="category" className='text-start text-xl'>Category</label>
                                <input
                                    type="text"
                                    placeholder='category'
                                    name='category'
                                    id="category"
                                    onChange={formik?.handleChange}
                                    value={formik.values.category}
                                    className='px-2 py-2 border border-gray-500 rounded-md my-1 outline-blue-400 text-lg'
                                />

                                {formik?.errors?.category && <p className=' text-sm text-red-500 text-left'>{formik?.errors?.category}</p>}
                            </div>

                            {/* editor */}
                            <div className='flex flex-col justify-start my-4'>
                                <label htmlFor="content" className='text-start text-xl'>Description</label>
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
                                <p className='mt-56 md:mt-24'></p>
                                {formik?.errors?.content && <p className=' text-sm text-red-500 text-left'>{formik?.errors?.content}</p>}
                            </div>
                            {/* tags */}
                            <div className='mb-4 flex flex-col'>
                                {/* display tags */}
                                <div className='flex gap-2'>
                                    {formik.values.tags.map((tag, index) => (
                                        <div key={index} style={{ marginBottom: '8px' }}
                                            className='bg-gray-300 flex justify-center items-center rounded-full w-fit px-5 py-1 gap-2'>
                                            <strong >{tag}</strong>
                                            <RxCross2 onClick={() => handleRemoveTag(index)} className=' cursor-pointer' />
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
                                {formik?.errors?.tags && <p className='text-sm text-red-500 text-left'>{formik?.errors?.tags}</p>}
                            </div>
{/* image */}


                            <div className='flex flex-col'>
                                <label htmlFor="image" className='text-start text-xl'>Upload Images</label>
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    accept="image/*"
                                    multiple  // Allow multiple image uploads
                                    onChange={handleImageChange}
                                    className='cursor-pointer w-full md:w-[40%] h-9 border-gray-500 rounded-md my-1 outline-blue-400 text-lg'
                                />
                                {/* {imageValidationError && <p className='text-red-500'>{imageValidationError}</p>}  Show validation error */}

                                {/* Display image previews */}
                                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mt-5 gap-1'>
                                    {
                                        imagePreviews?.length > 0 && imagePreviews.map((preview, index) => (
                                            <div key={index} className='w-full h-[150px]'>
                                                <img src={preview} alt={`Preview ${index + 1}`} className='w-full h-full object-cover' />
                                            </div>
                                        ))
                                    }
                                </div>

                                {formik?.errors?.image && <p className='text-sm text-red-500'>{formik?.errors?.image}</p>}
                            </div>



                            <button type="submit" className='my-4 px-4 py-3 bg-blue-500 text-white rounded-md float-start text-lg hover:bg-blue-600'>Publish</button>
                        </form>
                    </div>
                </div>
            </div>
       </DashboardLayoutBasic>
    );
}

export default AddBook;


