import { React, useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import '../styles/App.css';
import updateIcon from '../image/updateIcon.png';
import deleteIcon from '../image/deleteIcon.png';
import '../styles/iconstyle.css';
import { ExamContext } from '../examcontext';
import EditPatientModal from './updatecomp';

const AdminTable = ({ records }) => {
  const { deleteExamById, updateExamById } = useContext(ExamContext);

  const [EditingPatient, setEditingPatient] = useState(null);

  const handleEdit = (patientData) => {
    setEditingPatient(patientData);
  };

  const handleSave = (updatedData) => {
    updateExamById(updatedData.examId, updatedData);
    setEditingPatient(null); // Close modal after saving
  };
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((item, index) => (
            <tr key={index}>
              <td>
                <Link to={`/exams/${item.patientId}`}>{item.patientId}</Link>
              </td>
              <td>
                <Link to={`/exam/${item.examId}`}>{item.examId}</Link>
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
              <td>
                <div className="icon-container">
                  <button
                    className="actionButton"
                    onClick={() => handleEdit(item)}
                  >
                    <img
                      className="updatepatient"
                      src={updateIcon}
                      alt="Update"
                      style={{ width: '36px', height: '36px' }}
                    />
                  </button>
                  <button
                    className="actionButton"
                    onClick={() => deleteExamById({...item})}
                  >
                    <img
                      className="deletePatient"
                      src={deleteIcon}
                      alt="Delete"
                      style={{ width: '36px', height: '36px' }}
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {EditingPatient && (
        <EditPatientModal
          show={Boolean(EditingPatient)}
          onHide={() => setEditingPatient(null)}
          patientData={EditingPatient}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default AdminTable;
