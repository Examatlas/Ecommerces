import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../Config';

const ExamList = ({ searchTerm }) => {  // Destructure props correctly
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/exam/all`);
        setExams(response.data.exams || []);  // Default to an empty array if no exams
      } catch (error) {
        console.error('Error fetching exams:', error);
        setError('Failed to fetch exams. Please try again later.');
        toast.error('Failed to fetch exams. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  const deleteBook = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/exam/delete/${id}`);
      toast.success('Exam deleted successfully');
      setExams(exams.filter((exam) => exam._id !== id));
    } catch (error) {
      console.error('Error deleting exam:', error);
      toast.error('Failed to delete exam');
    }
  };

  // Filter exams based on the search term
  const filteredExams = exams.filter((exam) =>
    exam.examName?.toLowerCase().includes(searchTerm?.toLowerCase() || '')
  );

  return (
    <div className="w-[1100px]">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="relative overflow-x-auto w-full">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Exam Name</th>
                <th scope="col" className="px-6 py-3">Images</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredExams.map((exam) => (
                <tr key={exam._id} className="border-b dark:border-gray-700">
                  <td className="px-6 py-4">{exam.examName || 'N/A'}</td>
                  <td className="px-6 py-4">
                    {exam.image ? (
                      <img
                        src={exam.image}
                        alt={exam.examName}
                        className="h-20 w-20 object-cover rounded"
                      />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/ECommerce/editExam/${exam._id}`}>
                      <button
                        className="px-2 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md mx-1"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteBook(exam._id)}
                      className="px-2 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md mx-1"
                      title="Delete"
                    >
                      <RiDeleteBin6Fill />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default ExamList;
