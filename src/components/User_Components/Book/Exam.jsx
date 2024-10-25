import React from 'react';
import img2 from "../images/img2.png";
import img3 from "../images/img3.png";
import img4 from "../images/img4.png";
import img5 from "../images/img5.png";


const examData = [
  {
    id: 1,
    name: 'UPSC Civil Services',
    image: img5,
  },
  {
    id: 2,
    name: 'SSC CGL',
    image: img4,
  },
  {
    id: 3,
    name: 'IBPS PO',
    image: img3,
  },
  {
    id: 4,
    name: 'CAT',
    image: img2,
  },
  // Add more exams if needed
];

const Exam = () => {
  return (
    <div className="flex gap-6 p-4 ml-10">
      {examData.map((exam) => (
        <div key={exam.id} className="border rounded-lg shadow-md p-4  flex flex-col items-center w-[350px]">
          <img
            src={exam.image}
            alt={exam.name}
            className="w-full h-48 object-cover rounded-t-md"
          />
          <h2 className="mt-4 text-xl font-semibold">{exam.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default Exam;
