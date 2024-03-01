//pop up window for updating the exam id
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditPatientModal = ({ show, onHide, patientData, onSave }) => {
  // Ensure formData reflects the patientData structure accurately
  const [formData, setFormData] = useState({
    patientId: patientData.patientId,
    examId: patientData.examId,
    imageURL: patientData.imageURL,
    keyFindings: patientData.keyFindings,
    brixiaScores: patientData.brixiaScores,
    age: patientData.age,
    sex: patientData.sex,
    bmi: patientData.bmi,
    zipCode: patientData.zipCode,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
            <Form.Label
              style={{ fontSize: '16px', fontWeight: '600', marginTop: '20px' }}
            >
              Patient ID:
            </Form.Label>
            <Form.Control
              type="text"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              autoFocus
            />

            {/* cant edit exam id bc  it's used to link this data to an existing record in the database */}
            {/* <Form.Group>
            <Form.Label style={{ fontSize: '16px', fontWeight: '600', marginTop: '20px'}}>Exam ID:</Form.Label>
            <Form.Control type="text" name="examId" value={formData.examId} onChange={handleChange} />
            </Form.Group> */}

            <Form.Group>
              <Form.Label
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginTop: '20px',
                }}
              >
                Image Link:
              </Form.Label>
              <Form.Control
                type="text"
                name="imageURL"
                value={formData.imageURL}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginTop: '20px',
                }}
              >
                Key Finding:
              </Form.Label>
              <Form.Control
                type="text"
                name="keyFindings"
                value={formData.keyFindings}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginTop: '20px',
                }}
              >
                Brixia Scores:
              </Form.Label>
              <Form.Control
                type="text"
                name="brixiaScores"
                value={formData.brixiaScores}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginTop: '20px',
                }}
              >
                Age:
              </Form.Label>
              <Form.Control
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginTop: '20px',
                }}
              >
                Gender:
              </Form.Label>
              <Form.Control
                type="text"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginTop: '20px',
                }}
              >
                BMI:
              </Form.Label>
              <Form.Control
                type="text"
                name="bmi"
                value={formData.bmi}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginTop: '20px',
                }}
              >
                Zip Code:
              </Form.Label>
              <Form.Control
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPatientModal;
