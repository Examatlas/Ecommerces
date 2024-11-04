import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import DashboardLayoutBasic from './DashboardLayoutBasic';
import BookFormvalidationSchema from './BookFormValidation';
//icons
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import toast from 'react-hot-toast';
import API_BASE_URL from './Config';
import { useNavigate, useParams } from 'react-router-dom';

const EditBook = () => {
    const [imagePreviews, setImagePreviews] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [imageValidationError, setImageValidationError] = useState('');


    const [bookData, setBookData] = useState({

        title: '',
        keyword: '',
        content: '',
        author: '',
        category: '',
        price: '',
        sellPrice: '',
        tags: [],
        examName: '',
        height: '',
        width: '',
        weight: '',
        isbn: '',
        image: [],
    });

    const navigate = useNavigate();
    const id = useParams();
    
    //fetch blog By id
    const fetchBlogById = async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/book/getBookById/${id}`);
            setBookData(response?.data?.book);
            formik.setFieldValue('tags', response?.data?.book?.tags);
        } catch (error) {
            console.log("Error when fetching books", error);
        }
    };

    useEffect(() => {
        fetchBlogById(id.id);
    }, []);


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
                        validImages.push(file);  
                        validPreviews.push(event.target.result); 
                        formik.setFieldValue('image', validImages);  
                        setImageValidationError('');  
                    } else {
                        setImageValidationError('Each image must be 300x300 pixels.');
                    }

                    setImagePreviews(validPreviews);  
                };
            };

            reader.readAsDataURL(file);
        });
    };



    const handleDescriptionChange = (value) => {
        formik.setFieldValue('content', value);
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: bookData?.title,
            keyword: bookData?.keyword,
            content: bookData?.content,
            author: bookData?.author,
            category: bookData?.category,
            price: bookData?.price,
            sellPrice: bookData?.sellPrice,
            tags: bookData?.tags || [],
            examName : bookData?.examName,
            height : bookData?.height,
            width : bookData?.width,
            weight : bookData?.weight,
            isbn : bookData?.isbn,
            image: "",
        },
        validationSchema: BookFormvalidationSchema,

        onSubmit: async (values) => {
            try {
                const res = await axios.put(`${API_BASE_URL}/book/updateBook/${id.id}`, {
                    title: values?.title,
                    keyword: values?.keyword,
                    content: values?.content,
                    author: values?.author,
                    category: values?.category,
                    price: values?.price,
                    sellPrice: values?.sellPrice,
                    tags: values?.tags,
                    height : values?.height,
                    width  : values?.width,
                    weight : values?.weight,
                    isbn : values?.isbn,
                    image : values?.image,
                    examName:values?.examName

                });
                if (res?.data?.status === true) {
                    toast.success(res?.data?.message);
                    setTimeout(() => {
                        navigate("/admin/book");
                    }, 3000);
                }
            } catch (error) {
                toast.error(error?.message);
                console.log("Error occured during book submit", error);
            }
        },
    });

    
    const [categories, setCategories] = useState([]); // Category data
    const [exams, setExams] = useState([]); 

    useEffect(() => {

        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/category/getCategory`); 
                setCategories(Array.isArray(response.data.data) ? response.data.data : []);
            } catch (error) {
                console.error("Error fetching categories", error);
                setCategories([]);
            }
        };

        // Fetch exams when the component mounts
        const fetchExams = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/exam/all`); 
                setExams(Array.isArray(response.data.exams) ? response.data.exams : []);
            } catch (error) {
                console.error("Error fetching exams", error);
                setExams([]);
            }
        };

        fetchCategories();
        fetchExams();
    }, []);



    return (
        <DashboardLayoutBasic>
            <div className='  min-h-[100vh]'>
                <div className='md:mx-10 my-10 rounded-md'>
                    <h1 className='text-4xl my-4 ml-16'>Update Book</h1>
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
                                    // value={blogData?.title}
                                    className='px-2 py-2 border border-gray-500 rounded-md my-1 outline-blue-400 text-lg'
                                />

                                {console.log(formik.errors, "error is ")}{formik?.errors?.title && <p className=' text-sm text-red-500 text-left'>{formik?.errors?.title}</p>}
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
                                <label htmlFor="Price" className='text-start text-xl'>Price</label>
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


                            {/* author */}
                            <div className='flex my-4 flex-col justify-start '>
                                <label htmlFor="author" className='text-start text-xl'>Author</label>
                                <input
                                    type="author"
                                    placeholder='author'
                                    name='author'
                                    id="author"
                                    onChange={formik?.handleChange}
                                    value={formik.values.author}
                                    className='px-2 py-2 border border-gray-500 rounded-md my-1 outline-blue-400 text-lg'
                                />

                                {formik?.errors?.author && <p className=' text-sm text-red-500 text-left'>{formik?.errors?.author}</p>}
                            </div>


                          
                            {/* Category Dropdown */}
                            <div className='flex flex-col'>
                                <label htmlFor="category" className='text-start text-xl'>Category</label>
                                <select
                                    name='category'
                                    id="category"
                                    onChange={formik.handleChange}
                                    value={formik.values.category}
                                    className='px-2 py-2 border border-gray-500 rounded-md outline-blue-400 text-lg'
                                >
                                    <option value="" disabled>Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category._id} value={category.categoryName}>
                                            {category.categoryName}
                                        </option>
                                    ))}
                                </select>
                                {formik.errors.category && <p className='text-sm text-red-500 text-left'>{formik.errors.category}</p>}
                            </div>

                            {/* Exam Name Dropdown */}
                            <div className='flex flex-col'>
                                <label htmlFor="examName" className='text-start text-xl mt-5'>Exam Name</label>
                                <select
                                    name='examName'
                                    id="examName"
                                    onChange={formik.handleChange}
                                    value={formik.values.examName}
                                    className='px-2 py-2 border border-gray-500 rounded-md outline-blue-400 text-lg'
                                >
                                    <option value="" disabled>Select an exam</option>
                                    {exams.map((exam) => (
                                        <option key={exam._id} value={exam.examName}>
                                            {exam.examName}
                                        </option>
                                    ))}
                                </select>
                                {formik.errors.examName && <p className='text-sm text-red-500 text-left'>{formik.errors.examName}</p>}
                            </div>

                            {/* Height */}
                            <div className='flex flex-col justify-start mt-5 '>
                                <label htmlFor="height" className='text-start text-xl'>Height</label>
                                <input
                                    type="text"
                                    placeholder='Height'
                                    name='height'
                                    id="height"
                                    onChange={formik?.handleChange}
                                    value={formik.values.height}
                                    className='px-2 py-2 border border-gray-500 rounded-md my-1 outline-blue-400 text-lg'
                                />
                                {formik?.errors?.height && <p className='text-sm text-red-500 text-left'>{formik?.errors?.height}</p>}
                            </div>

                            {/* Width */}
                            <div className='flex flex-col justify-start '>
                                <label htmlFor="width" className='text-start text-xl'>Width</label>
                                <input
                                    type="text"
                                    placeholder='Width'
                                    name='width'
                                    id="width"
                                    onChange={formik?.handleChange}
                                    value={formik.values.width}
                                    className='px-2 py-2 border border-gray-500 rounded-md my-1 outline-blue-400 text-lg'
                                />
                                {formik?.errors?.width && <p className='text-sm text-red-500 text-left'>{formik?.errors?.width}</p>}
                            </div>

                            {/* Weight */}
                            <div className='flex flex-col justify-start '>
                                <label htmlFor="weight" className='text-start text-xl'>Weight</label>
                                <input
                                    type="text"
                                    placeholder='Weight'
                                    name='weight'
                                    id="weight"
                                    onChange={formik?.handleChange}
                                    value={formik.values.weight}
                                    className='px-2 py-2 border border-gray-500 rounded-md my-1 outline-blue-400 text-lg'
                                />
                                {formik?.errors?.weight && <p className='text-sm text-red-500 text-left'>{formik?.errors?.weight}</p>}
                            </div>

                            {/* ISBN */}
                            <div className='flex flex-col justify-start '>
                                <label htmlFor="isbn" className='text-start text-xl'>ISBN</label>
                                <input
                                    type="text"
                                    placeholder='ISBN'
                                    name='isbn'
                                    id="isbn"
                                    onChange={formik?.handleChange}
                                    value={formik.values.isbn}
                                    className='px-2 py-2 border border-gray-500 rounded-md my-1 outline-blue-400 text-lg'
                                />
                                {formik?.errors?.isbn && <p className='text-sm text-red-500 text-left'>{formik?.errors?.isbn}</p>}
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
                                    {formik?.values?.tags && formik?.values?.tags?.map((tag, index) => (
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
                            {/* images */}

                            <div className='flex flex-col'>
                                <label htmlFor="image" className='text-start text-xl'>Upload Images</label>
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    accept="image/*"
                                    multiple  
                                    onChange={handleImageChange}
                                    className='cursor-pointer w-full md:w-[40%] h-9 border-gray-500 rounded-md my-1 outline-blue-400 text-lg'
                                />
                                {imageValidationError && <p className='text-red-500'>{imageValidationError}</p>}  
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


                            <button type="submit" className='my-4 px-4 py-3 bg-blue-500 text-white rounded-md float-start text-lg hover:bg-blue-600'>Update</button>
                        </form>
                    </div>
                </div>
            </div>
      </DashboardLayoutBasic>

    );
}

export default EditBook;

