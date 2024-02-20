// keeps track of the patient that was cliced on
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
const ExamContext = createContext();

const ExamProvider = ({ children }) => {
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

  const [examData, setExamData] = useState([]);

  // const specificPatientID = 'COVID-19-AR-16406504';

  useEffect(() => {
    //MUST name .env vars with the prefix REACT_APP_ to call with React components.
    //fetch(`${process.env.REACT_APP_LOCALSERVER}/exams/${specificPatientID}`)
    fetch(`${process.env.REACT_APP_LOCALSERVER}/`)
      //fetch(`${process.env.REACT_APP_LOCALSERVER}/exams?patientId=${specificPatientID}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("fetching data WITHIN context: ", data)
        const exams = data.exams;
        setExamData(exams);
      })
      .catch((err) => console.log('Endpoint not available, Error: ', err));
  }, []);
  // console.log(examData);
  return (
    <ExamContext.Provider
      value={{ examData, setExamData, deleteExamById, updateExamById }}
    >
      {children}
    </ExamContext.Provider>
  );
};

export { ExamContext, ExamProvider };
