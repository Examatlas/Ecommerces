// src/components/Exam.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Exam = () => {
  const navigate = useNavigate()
    
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current slide

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/exam/all');
        console.log('API Response:', response.data);

        if (response.data.status && Array.isArray(response.data.exams)) {
          setExams(response.data.exams);
        } else {
          setError('Unexpected data format from API.');
        }
      } catch (err) {
        console.error('Error fetching exams:', err);
        setError('Failed to load exams.');
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  // Handle left arrow click
  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // Handle right arrow click
  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, Math.ceil(exams.length / 4) - 1)
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Get the slice of exams to display based on the current index
  const visibleExams = exams.slice(currentIndex * 4, currentIndex * 4 + 4);

  const handleExamClick = (examName) => {
    navigate(`/books/${examName}`); 
  };

  return (
    <div className="relative">
      <div className="flex gap-6 p-4 ml-10">
        {visibleExams.map((exam) => (
          <div
            key={exam._id}
            className="border rounded-lg shadow-md p-4 flex flex-col items-center w-[350px]"
            onClick={() => handleExamClick(exam.examName)}
          >
            {/* <img
              src={exam.image}
              alt={exam.name}
              className="w-full h-48 object-cover rounded-t-md"
            /> */}
             <img
                        src={exam.images[0].url}
                        alt={exam.examName}
                        className="w-full h-48 object-cover rounded-t-md"
                      />
            <h2 className="mt-4 text-xl font-semibold">{exam.examName}</h2>
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className={`absolute top-1/2 left-2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full ${
          currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        ❮
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        disabled={currentIndex >= Math.ceil(exams.length / 4) - 1}
        className={`absolute top-1/2 right-2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full ${
          currentIndex >= Math.ceil(exams.length / 4) - 1
            ? 'opacity-50 cursor-not-allowed'
            : ''
        }`}
      >
        ❯
      </button>
    </div>
  );
};

export default Exam;
