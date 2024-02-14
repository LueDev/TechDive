// keeps track of the patient that was cliced on 
import React, { createContext, useState, useEffect } from 'react';

const ExamContext = createContext();

const ExamProvider = ({ children }) => {

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

  return (
    <ExamContext.Provider value={{ examData, setExamData }}>
      {children}
    </ExamContext.Provider>
  );
};

export { ExamContext, ExamProvider }
