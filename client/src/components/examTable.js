import React from 'react';
import Table from 'react-bootstrap/Table';
import '../styles/App.css'
import { Link } from 'react-router-dom';
import '../styles/examtable.css';
import { useState } from 'react';



const ExamTable = ({ records }) => {

    const generatedImageUrl = 'https://thispersondoesnotexist.com/';


    return(
      <div>
        <div className="container">
          <div className="info-container">
            {/* Patient Information */}
            <div className="profile-container">
              {/* Profile Picture */}
              {records.map((record, index) => (
              <div key={index}>
                <img className="profile-image" src={generatedImageUrl} alt="Patient" />
                <p>{record.examId}</p>
                </div>
                ))}
            {/* Profile Information */}
            <div className="profile-info">
              {records.map((record, index) => (
              <div className='profile-info' key={index}>
                <div className="profile-info-row">
                  <div className="profile-info-item">
                    <h3>Age</h3>
                    <p>{record.age}</p>
                    </div>
                    <div className="profile-info-item">
                      <h3>Sex</h3>
                      <p>{record.sex}</p>
                    </div>
                  </div>
                      <div className="profile-info-row">

              <div className="profile-info-item">
                <h3>Status</h3>
                <p>{record.status}</p>
              </div>
  
              <div className="profile-info-item">
                <h3>BMI</h3>
                <p>{record.bmi}</p>
              </div>

              </div>

              <div className='profile-info-row'>
                <div className='profile-info-item'> 
                <h3>Brixia</h3>
                <p>{record.brixiaScores}</p>
                </div>

                <div className='profile-info-item'> 
                <h3>ZipCode</h3>
                <p>{record.zipCode}</p>
                </div>
              </div>
            </div>
          
          ))}
          </div>
        </div>
      </div>

   
    <div className='example-div'>
     <div className='image-container'>
              {records.map((item, index) => (
                <img key={index} style={{width:'300px'}}src={item.imageURL}  />
              ))}
      </div>

      {records.map((record, index) => (
        <div className="findings-div">
              <div >
                <h3>Key Findings:</h3>
                <p>{record.keyFindings}</p>
              </div>
             
          </div>
          ))}
          </div>
        </div>
      </div>    
  );
}

    
export default ExamTable;
