export const toolbarOptions = [
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

export const modules = {
    toolbar: true,
    toolbar: toolbarOptions,

};

export const formats = [
    'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike',
    'blockquote', 'list', 'bullet', 'link', 'image', 'video', 'code-block',
    'color', 'background', 'align', 'indent'
];
