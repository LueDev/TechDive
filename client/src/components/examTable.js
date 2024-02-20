import React from 'react';
import Table from 'react-bootstrap/Table';
import '../styles/App.css'
import { Link } from 'react-router-dom';
import '../styles/examtable.css';


const ExamTable = ({ records }) => {
    return(
        <div className="two-column-table-container">
      <div className="two-column-table">
        <div className="column">
          {records.map((item, index) => (
            <div key={index}>
              <div ><strong>Patient ID:</strong> <Link to={`/patientdetails/${item.patientId}`}>{item.patientId}</Link></div>
              <div><strong>Age:</strong> {item.age}</div>
              <div><strong>Sex:</strong> {item.sex}</div>
              <div><strong>BMI:</strong> {item.bmi}</div>
              <div><strong>Zip Code:</strong> {item.zipCode}</div>
              <div><strong>Brixia Scores:</strong> {item.brixiaScores}</div>
              <div><strong>Key Finding:</strong> {item.keyFindings}</div>
              
            </div>
          ))}
        </div>
      </div>
      <div className="image-container">
        {records.map((item, index) => (
          <img key={index} className="examTablePhotos" src={item.imageURL} alt={`Image ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};
  
    
export default ExamTable;
