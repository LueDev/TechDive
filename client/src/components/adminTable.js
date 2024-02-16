import {React,useContext} from 'react';
import Table from 'react-bootstrap/Table';
import '../styles/App.css'
import updateIcon from '../image/updateIcon.png'; 
import deleteIcon from '../image/deleteIcon.png'; 
import "../styles/iconstyle.css"
import { ExamContext } from '../examcontext'; 


const AdminTable = ({ records,setRecords  }) => {
    const { deleteExamById } = useContext(ExamContext);
    
  return (
    <>
  <Table striped bordered hover className='table'>
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
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {records.map((item, index) => (
          <tr key={index}>
            <td>{item['patientId']}</td>
            <td>{item.examId}</td>
            <td>{<img className="examPhotos" src={item.imageURL} alt={item.imageURL}/>}</td>
            <td>{item.keyFindings}</td>
            <td>{item.brixiaScores}</td>
            <td>{item.age}</td>
            <td>{item.sex}</td>
            <td>{item.bmi}</td>
            <td>{item.zipCode}</td>
            <td> <div className="icon-container">
                <button className="actionButton" onClick={() => 1}>
                
                    <img className="updatepatient" src= {updateIcon} alt="Update" style={{ width: '36px', height: '36px' }}/>
                </button>
                <button className="actionButton" onClick={() => deleteExamById(item.examId)}>
                    <img className="deletePatient" src= {deleteIcon} alt="Delete" style={{ width: '36px', height: '36px' }}/>
                </button>
            </div>
            </td>
            
          </tr>
        ))}
      </tbody>
    </Table>
    </>
  );
};

export default AdminTable;
