// keeps track of the patient that was cliced on 
import React, { createContext, useState, useEffect } from 'react';
import axios from "axios"
const ExamContext = createContext();

const ExamProvider = ({ children }) => {
  const deleteExamById = async (examId) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      
    try {
      await axios.delete(`${process.env.REACT_APP_LOCALSERVER}/admin/exams/${examId}`);
      setExamData(prevExams => prevExams.filter(exam => exam.examId !== examId));
    } catch (error) {
      console.error("Error deleting exam:", error);
      alert("Failed to delete exam. Please try again.");
    }}
  };
  const [examData, setExamData] = useState([]);

  useEffect(()=>{
    //MUST name .env vars with the prefix REACT_APP_ to call with React components.
      fetch(`${process.env.REACT_APP_LOCALSERVER}/`) 
      .then(res => res.json())
      .then(data => {
        const exams = Object.entries(data)[0][1]
        setExamData(exams)
      })
      .catch(err => console.log("Endpoint not available, Error: ", err))
  },[])
  console.log(examData); 
  return (
    <ExamContext.Provider value={{ examData, setExamData, deleteExamById  }}>
      {children}
    </ExamContext.Provider>
    
  );
};

export { ExamContext, ExamProvider }
