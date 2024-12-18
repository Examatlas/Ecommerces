import * as Yup from 'yup';

const BookFormvalidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, 'Title must be at least 5 characters')
    .required('Title is required'),

  author: Yup.string()
    .required('Author is required'),

  category: Yup.string()
    .required('Category is required'),

    stock: Yup.string()
    .required('stock is required'),

  page : Yup.number()
    .required('page is required'),

  edition : Yup.string()
    .required('edition is required'),

  publication : Yup.string()
  .required('publication is required'),

  // examName: Yup.string()
  //   .required('exam is required'),

  subject : Yup.string()
     .required("subject is required"),

  // height: Yup.string()
  //   .required('height is required'),
    
  dimension: Yup.object().shape({
    length: Yup.number()
      .required('Length is required')
      .positive('Length must be positive'),
    breadth: Yup.number()
      .required('Breadth is required')
      .positive('Breadth must be positive'),
    height: Yup.number()
      .required('Height is required')
      .positive('Height must be positive'),
  }),
  
  weight: Yup.string()
        .required('weight is required'), 
        
  isbn: Yup.string()
          .required('isbn is required'),

  keyword: Yup.string()
    .min(5, 'Keyword must be at least 5 characters')
    // .max(100, 'Title must be 100 characters or less')
    .required('Keyword is required'),

  price: Yup.number()
    .required('price is required')
    .typeError('Price must be a number'),

  sellPrice: Yup.number()
    .required('sell price is required')
    .typeError(' sell Price must be a number'),

  content: Yup.string()
    .min(20, 'description must be at least 20 characters')
    .required('description is required'),


  // image: Yup.array()  // Change to Yup.array() to handle multiple files
  // .min(1, 'At least one image is required')  // Ensure at least one image is uploaded
  // .test('fileType', 'Only image files are allowed', (values) => {
  //   return values && values.every(value => ['image/jpeg', 'image/png', 'image/gif'].includes(value.type));
  // })
  // .test('fileSize', 'Each file must be 2MB or smaller', (values) => {
  //   return values && values.every(value => value.size <= 2 * 1024 * 1024);  // 2MB size limit for each file
  // })


  //     image: Yup.array()
  //   .min(1, 'At least one image is required')
  //   .test('fileType', 'Only image files are allowed', (values) => {
  //     return values && values.every(value => ['image/jpeg', 'image/png', 'image/gif'].includes(value.type));
  //   })
  //   .test('fileSize', 'Each file must be 2MB or smaller', (values) => {
  //     return values && values.every(value => value.size <= 2 * 1024 * 1024);
  //   })
  // ,
  tags: Yup.array()
    .of(
      Yup.string()
    )
    .min(1, 'At least one tag is required')

  // tags: Yup.string()
  //   // .of(Yup.string().min(2, 'Tag must be at least 2 characters'))
  //   .min(1, 'At least one tag is required')
  //   .required('Tags are required'),
});

export default BookFormvalidationSchema;
