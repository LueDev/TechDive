// keeps track of the patient that was cliced on 
import React, { createContext, useState, useEffect } from 'react';

const ExamContext = createContext();

const ExamProvider = ({ children }) => {

  const [examData, setExamData] = useState([]);

  const specificPatientID = 'COVID-19-AR-16406504'

  useEffect(()=>{
    //MUST name .env vars with the prefix REACT_APP_ to call with React components.
    //fetch(`${process.env.REACT_APP_LOCALSERVER}/exams/${specificPatientID}`)
    fetch(`${process.env.REACT_APP_LOCALSERVER}/`) 
      //fetch(`${process.env.REACT_APP_LOCALSERVER}/exams?patientId=${specificPatientID}`)
      .then(res => res.json())
      .then(data => {
        const exams = Object.entries(data)[0][1]
        setExamData(exams)
      })
  },[])

  return (
    <ExamContext.Provider value={{ examData, setExamData }}>
      {children}
    </ExamContext.Provider>
  );
};

export { ExamContext, ExamProvider }
