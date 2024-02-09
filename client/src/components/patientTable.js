import React from 'react';
import Table from 'react-bootstrap/Table';
import '../styles/App.css'
const PatientTable = ({ records }) => {
  return (
    <Table striped bordered hover className='table'>
      <thead>
        <tr>
          <th>Patient ID</th>
          <th>Exam ID</th>
          <th>Image</th>
          <th>Key Finding</th>
          <th>Age</th>
          <th>Sex</th>
          <th>BMI</th>
        </tr>
      </thead>
      <tbody>
        {records.map((item, index) => (
          <tr key={index}>
            <td>{item.id}</td>
            <td>{item.exam_id}</td>
            <td>{item.Image}</td>
            <td>{item.Key_finding}</td>
            <td>{item.age}</td>
            <td>{item.gender}</td>
            <td>{item.BMI}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PatientTable;
