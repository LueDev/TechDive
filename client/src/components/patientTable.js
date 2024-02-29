import React from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import '../styles/App.css';

const PatientTable = ({ records }) => {
  return (
    <>
      <Table striped bordered hover className="table">
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Exam ID</th>
            <th>Image</th>
            <th>Key Finding</th>
            <th>Brixia Scores</th>
            <th>Age</th>
            <th>Sex</th>
            <th>BMI</th>
            <th>Zip Code</th>
          </tr>
        </thead>
        <tbody>
          {records.map((item, index) => (
            <tr key={index}>
              <td>
                <Link to={`/exams/${item.patientId}`}>{item.patientId}</Link>
              </td>
              <td>
                <Link to={`/exams/${item.patientId}/examId/${item.examId}`}>{item.examId}</Link>
              </td>
              <td>
                {
                  <img
                    className="examPhotos"
                    src={item.imageURL}
                    alt={item.imageURL}
                  />
                }
              </td>
              <td>{item.keyFindings}</td>
              <td>{item.brixiaScores}</td>
              <td>{item.age}</td>
              <td>{item.sex}</td>
              <td>{item.bmi}</td>
              <td>{item.zipCode}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default PatientTable;
