// keeps track of the patient that was cliced on
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const ExamContext = createContext();

const ExamProvider = ({ children }) => {
  const [examData, setExamData] = useState([]);
  const navigate = useNavigate();

  const getExams = async () => {
    await axios
      .get(`${process.env.REACT_APP_LOCALSERVER}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        console.log('Response from protected route:', response);
        setExamData([...response.data.exams]);
      })
      .catch((error) => {
        console.error('Error accessing protected route:', error.response.data);
        navigate('/');
      });
  };

  const deleteExamById = async (examId) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_LOCALSERVER}/admin/exams/${examId}`,
        );
        setExamData((prevExams) =>
          prevExams.filter((exam) => exam.examId !== examId),
        );
      } catch (error) {
        console.error('Error deleting exam:', error);
        alert('Failed to delete exam. Please try again.');
      }
    }
  };
  //need api endpoint
  const updateExamById = async (examId, updatedExam) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_LOCALSERVER}/admin/exams/up/${examId}`,
        updatedExam,
      );
      setExamData((prevData) =>
        prevData.map((data) =>
          data.examId === examId ? { ...data, ...updatedExam } : data,
        ),
      );
    } catch (error) {
      console.error('Error updating exam:', error);
      alert('Failed to update exam. Please try again.');
    }
  };

  useEffect(() => {
    //MUST name .env vars with the prefix REACT_APP_ to call with React components.
    console.log(examData);
  }, [examData]);

  return (
    <ExamContext.Provider
      value={{
        examData,
        setExamData,
        getExams,
        deleteExamById,
        updateExamById,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
};

export { ExamContext, ExamProvider };
