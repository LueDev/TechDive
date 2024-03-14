import React, { createContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const ExamContext = createContext();

// TODO: Remove console.log and console.error, and replace them with a logger

function ExamProvider({ children }) {
  const [examData, setExamData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_LOCALSERVER}/`)
      .then((res) => res.json())
      .then((data) => {
        const { exams } = data;
        setExamData(exams);
      })
      .catch((err) => console.log('Endpoint not available, Error: ', err));
  }, []);

  // TODO: Replace alerts/ confirms with modals
  const deleteExamById = async (examId) => {
    // TODO: Replace alert with a modal
    if (window.confirm('Are you sure you want to delete this exam?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_LOCALSERVER}/admin/exams/${examId}`);
        setExamData((prevExams) => prevExams.filter((exam) => exam.examId !== examId));
      } catch (error) {
        // TODO: Replace alert with a modal
        alert('Failed to delete exam. Please try again.');
      }
    }
  };

  const updateExamById = async (examId, updatedExam) => {
    try {
      await axios.put(`${process.env.REACT_APP_LOCALSERVER}/admin/exams/up/${examId}`, updatedExam);
      /// TODO: Fix this code for clarity
      setExamData((prevData) =>
        prevData.map((data) => (data.examId === examId ? { ...data, ...updatedExam } : data))
      );
    } catch (error) {
      // TODO: Replace alert with a modal
      alert('Failed to update exam. Please try again.');
    }
  };

  const examValue = useMemo(
    () => ({
      examData,
      setExamData,
      deleteExamById,
      updateExamById,
    }),
    [examData]
  );

  return <ExamContext.Provider value={examValue}>{children}</ExamContext.Provider>;
}

ExamProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ExamContext, ExamProvider };
