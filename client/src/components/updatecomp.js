//Modal
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';


const EditPatientModal = ({show, onHide, patientData, onSave }) => {
{/*?/*/}
  const [formData, setFormData] = useState({ ...patientData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onHide();
  };

  

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Patient Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Patient ID</Form.Label>
            <Form.Control 
            type="text" 
            name="ExamtId" 
            value={formData.patientId} 
            onChange={handleChange} 
            autoFocus/>

           
            <Form.Group>
            <Form.Label>Exam ID</Form.Label>
            <Form.Control type="text" name="patientId" value={formData.examId} onChange={handleChange} />
            </Form.Group>

            <Form.Group>
            <Form.Label>Image Link</Form.Label>
            <Form.Control type="text" name="patientId" value={formData.imageURL} onChange={handleChange} />
            </Form.Group>

            <Form.Group>
            <Form.Label>Key Finding</Form.Label>
            <Form.Control type="text" name="patientId"  value ={formData.keyFindings} onChange={handleChange} />
            </Form.Group>

            <Form.Group>
            <Form.Label>Brixia Scores</Form.Label>
            <Form.Control type="text" name="patientId" value={formData.brixiaScores} onChange={handleChange} />
            </Form.Group>

            <Form.Group>
            <Form.Label>Age</Form.Label>
            <Form.Control type="text" name="patientId" value={formData.age} onChange={handleChange} />
            </Form.Group>

            <Form.Group>
            <Form.Label>Gender</Form.Label>
            <Form.Control type="text" name="patientId" value={formData.sex} onChange={handleChange} />
          </Form.Group>

          <Form.Group>
          <Form.Label>BMI</Form.Label>
            <Form.Control type="text" name="patientId" value={formData.bmi} onChange={handleChange} />
            </Form.Group>

            <Form.Group>
            <Form.Label>Zip Code</Form.Label>
            <Form.Control type="text" name="patientId" value={formData.zipCode} onChange={handleChange} />
            </Form.Group>
            </Form.Group>
        </Form>

      </Modal.Body>
      <Modal.Footer>
          <Button variant="secondary" onClick={1}>
            Close
          </Button>
          <Button variant="primary" onClick={1}>
            Save Changes
          </Button>
        </Modal.Footer>
    </Modal>
  );
};

export default EditPatientModal;
