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
    const [images, setImages] = useState([]);
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
        stock: "",
        page: "",
        subject: "",
        edition:"",
        publication:"",
        // height: '',
        dimension: { length: '', breadth: '', height: '' },
        weight: '',
        isbn: '',
        images: [],
    });

    const navigate = useNavigate();
    const id = useParams();

    const fetchBlogById = async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/book/getBookById/${id}`);
            setBookData(response?.data?.book);
            const book = response.data.book;
            formik.setFieldValue('tags', response?.data?.book?.tags);

            if (book.images && book.images.length > 0) {
                setImages(book.images);
                formik.setFieldValue('image', book.images[0].url);
                setImagePreviews(book.images.map(image => image.url));
            }

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
        // toolbar: true,
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
        const newImages = files.map(file => file);
        setImages(prevImages => [...prevImages, ...newImages]);

        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prevPreviews => [...prevPreviews, ...previews]);

        formik.setFieldValue('image', files);
    };



    const handleRemoveImage = async (index) => {
        const imageUrl = imagePreviews[index];
        const filename = imageUrl.split('/').pop();

        try {
            // Send delete request to the backend
            const response = await axios.delete(`${API_BASE_URL}/book/deleteImage/${filename}`);

            if (response.status === 200) {
                // Remove the image from the preview state if delete was successful
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
            title: bookData?.title,
            keyword: bookData?.keyword,
            content: bookData?.content,
            author: bookData?.author,
            category: bookData?.category,
            price: bookData?.price,
            sellPrice: bookData?.sellPrice,
            subject: bookData?.subject,
            stock: bookData?.stock,
            page: bookData?.page,
            edition: bookData?.edition,
            publication : bookData?.publication ,
            tags: bookData?.tags || [],

            dimension: bookData?.dimension,
            weight: bookData?.weight,
            isbn: bookData?.isbn,
            images: [],
        },
        validationSchema: BookFormvalidationSchema,

        onSubmit: async (values) => {
            const formData = new FormData()
            formData.append('title', values.title);
            formData.append('keyword', values.keyword);
            formData.append('content', values.content);
            formData.append('author', values.author);
            formData.append('category', values.category);
            formData.append('price', values.price);
            formData.append('sellPrice', values.sellPrice);
            formData.append('subject', values.subject);
            formData.append('stock', values.stock);
            formData.append('page', values.page);
            formData.append('tags', values.tags);
            formData.append('weight', values.weight);
            formData.append('edition', values.edition);
            formData.append('publication', values.publication);

            formData.append(
                'dimension',
                JSON.stringify(values.dimension) // Convert dimension object to string
            );
            formData.append('isbn', values.isbn);

            values.images.forEach((image) => formData.append('images', image));

            if (images.length > 0) {
                images.forEach(image => formData.append('images', image));
            }

            try {
                const response = await axios.put(`${API_BASE_URL}/book/updateBook/${id.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (response?.data?.status === true) {
                    toast.success(response?.data?.message);
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


    const [categories, setCategories] = useState([]);
    // const [exams, setExams] = useState([]); 
    const [subjects, setSubjects] = useState([])

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


        const fetchSubjects = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/subject/getSubject`);
                setSubjects(Array.isArray(response.data.data) ? response.data.data : []);
            } catch (error) {
                console.error("error fetching subjects ", error);
                setSubjects([]);
            }
        }

        fetchCategories();

        fetchSubjects();
    }, []);

    const handleDimensionChange = (e) => {
        const { name, value } = e.target;
        formik.setFieldValue('dimension', {
            ...formik?.values?.dimension,
            [name]: value,
        });
    };

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

                            {/* edition */}
                            <div className='flex my-4 flex-col justify-start '>
                                <label htmlFor="edition" className='text-start text-xl'>Edition</label>
                                <input
                                    type="edition"
                                    placeholder='edition'
                                    name='edition'
                                    id="edition"
                                    onChange={formik?.handleChange}
                                    value={formik.values.edition}
                                    className='px-2 py-2 border border-gray-500 rounded-md my-1 outline-blue-400 text-lg'
                                />

                                {formik?.errors?.edition && <p className=' text-sm text-red-500 text-left'>{formik?.errors?.edition}</p>}
                            </div>


                            {/* publication */}
                            <div className='flex my-4 flex-col justify-start '>
                                <label htmlFor="publication" className='text-start text-xl'>Publication</label>
                                <input
                                    type="publication"
                                    placeholder='publication'
                                    name='publication'
                                    id="publication"
                                    onChange={formik?.handleChange}
                                    value={formik.values.publication}
                                    className='px-2 py-2 border border-gray-500 rounded-md my-1 outline-blue-400 text-lg'
                                />
                                {formik?.errors?.publication && <p className=' text-sm text-red-500 text-left'>{formik?.errors?.publication}</p>}
                            </div>

 
                            <div className='flex my-4 flex-col justify-start '>
                                <label htmlFor="stock" className='text-start text-xl'>Is In stock</label>
                                <input
                                    type="text"
                                    placeholder='Yes / No'
                                    name='stock'
                                    id="stock"
                                    onChange={formik?.handleChange}
                                    value={formik.values.stock}
                                    className='px-2 py-2 border border-gray-500 rounded-md my-1 outline-blue-400 text-lg'
                                />

                                {formik?.errors?.stock && <p className=' text-sm text-red-500 text-left'>{formik?.errors?.stock}</p>}
                            </div>


                            <div className='flex my-4 flex-col justify-start '>
                                <label htmlFor="page" className='text-start text-xl'>Number of pages</label>
                                <input
                                    type="number"
                                    placeholder='Number of pages'
                                    name='page'
                                    id="page"
                                    onChange={formik?.handleChange}
                                    value={formik.values.page}
                                    className='px-2 py-2 border border-gray-500 rounded-md my-1 outline-blue-400 text-lg'
                                />
                                {formik?.errors?.page && <p className=' text-sm text-red-500 text-left'>{formik?.errors?.page}</p>}
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


                            <div className='flex flex-col'>
                                <label htmlFor="subject" className='text-start text-xl mt-5'>Subject</label>
                                <select
                                    name='subject'
                                    id="subject"
                                    onChange={formik.handleChange}
                                    value={formik.values.subject}
                                    className='px-2 py-2 border border-gray-500 rounded-md outline-blue-400 text-lg'
                                >
                                    <option value="" disabled>Select a subject</option>
                                    {subjects.map((subject) => (
                                        <option key={subject._id} value={subject.title}>
                                            {subject.title}
                                        </option>
                                    ))}
                                </select>
                                {formik.errors.subject && <p className='text-sm text-red-500 text-left'>{formik.errors.subject}</p>}
                            </div>



                            <div className="flex flex-col  justify-start mt-5">
                                <label className="text-start text-xl">Book Dimensions (in cm):</label>
                                <div className="flex gap-4">
                                    <div className="flex flex-col">
                                        <label htmlFor="length" className="text-md mb-1">Length</label>
                                        <input
                                            type="number"
                                            id="length"
                                            name="length"
                                            onChange={handleDimensionChange}
                                            value={formik.values?.dimension?.length}
                                            className="border rounded px-2 py-1 w-20"
                                            placeholder="cm"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="breadth" className="text-md mb-1">Breadth</label>
                                        <input
                                            type="number"
                                            id="breadth"
                                            name="breadth"
                                            onChange={handleDimensionChange}
                                            value={formik?.values?.dimension?.breadth}
                                            className="border rounded px-2 py-1 w-20"
                                            placeholder="cm"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="height" className="text-md mb-1">Height</label>
                                        <input
                                            type="number"
                                            id="height"
                                            name="height"
                                            onChange={handleDimensionChange}
                                            value={formik?.values?.dimension?.height}
                                            className="border rounded px-2 py-1 w-20"
                                            placeholder="cm"
                                        />
                                    </div>
                                </div>
                                {formik.errors.dimension?.length && (
                                    <p className="text-sm text-red-500">{formik.errors.dimension.length}</p>
                                )}
                                {formik.errors.dimension?.breadth && (
                                    <p className="text-sm text-red-500">{formik.errors.dimension.breadth}</p>
                                )}
                                {formik.errors.dimension?.height && (
                                    <p className="text-sm text-red-500">{formik.errors.dimension.height}</p>
                                )}
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
                                    multiple
                                    className="block w-full text-lg border border-gray-500 rounded-md my-1 outline-blue-400"
                                />
                                {formik.errors.images && (
                                    <p className="text-sm text-red-500">{formik.errors.images}</p>
                                )}


                                {imagePreviews.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-4">
                                        {imagePreviews.map((image, index) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={image}
                                                    alt={`Preview ${index}`}
                                                    className="w-32 h-32 object-cover rounded-md"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveImage(index)}
                                                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
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



