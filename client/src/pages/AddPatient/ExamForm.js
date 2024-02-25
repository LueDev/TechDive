/*import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Form from '../../components/General/Form/Form.js';

const ExamForm = ({ update }) => {
    const patientFields = [
        { name: 'patientId', placeholder: 'Patient ID'},
        { name: 'age', placeholder: 'Age'},
        { name: 'sex', placeholder: 'Sex'},
        { name: 'bmi', placeholder: 'BMI'},
        { name: 'zipCode', placeholder: 'Zip Code'},
        { name: 'examId', placeholder: 'Exam ID'},
        { name: 'keyFindings', placeholder: 'Key Findings', type: 'textarea'},
        { name: 'brixiaScores', placeholder: 'Brixia Scores'},
        { name: 'imageURL', placeholder: 'Image URL'}
    ];

    // Assigning random initial values for demonstration purposes
    const initialValues = {
        patientId: 'PID123', // Example random value
        age: 30, // Example random value
        sex: 'Male', // Example placeholder value
        bmi: 24.5, // Example random value
        zipCode: '12345', // Example placeholder value
        examId: 'EXAM123', // Example random value
        keyFindings: 'Initial key findings...', // Example placeholder text
        brixiaScores: 'B1', // Example placeholder value
        imageURL: 'http://example.com/image.jpg' // Example placeholder URL
    };

    // Ensure all fields are included in the validation schema and marked as required
    const validationSchema = Yup.object({
        patientId: Yup.string().required('Patient ID is required'),
        age: Yup.number().positive('Must be a positive number').required('Age is required'),
        sex: Yup.string().required('Sex is required'),
        bmi: Yup.number().positive('Must be a positive number').required('BMI is required'),
        zipCode: Yup.string().required('Zip Code is required'),
        examId: Yup.string().required('Exam ID is required'),
        keyFindings: Yup.string().required('Key Findings are required'),
        brixiaScores: Yup.string().required('Brixia Scores are required'),
        imageURL: Yup.string().url('Must be a valid URL').required('Image URL is required'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema})
        /*onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                console.log('Form data:', values);
                const response = await fetch('http://localhost:9000/exams', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
                if (!response.ok) throw new Error('Network response was not ok');
                alert('Form submitted successfully');
                resetForm(); // Optionally reset form fields to initial values after successful submission
            } catch (error) {
                console.error('Form submission error:', error);
                alert('Form submission failed');
            } finally {
                setSubmitting(false);
            }
        },
    });

    
    console.log('Formik values:', formik.values);
    return (
        <div>
            <h2 className='patient-info-title'>Patient Info</h2>
            <Form formik={formik} fields={patientFields} />
        </div>
    );
};

export default ExamForm;
*/
import Form from '../../components/General/Form/Form.js';
import { data } from '../../mockdata.js';
import './ExamForm.css';

const ExamForm = ({update}) => {
    const patientFields = [
        { name: 'patientId', placeholder: 'Patient ID'},
        { name: 'age', placeholder: 'age'},
        { name: 'sex', placeholder: 'sex'},
        { name: 'bmi', placeholder: 'BMI'},
        { name: 'zipCode', placeholder: 'Zip Code'},
        { name: 'examId', placeholder: 'Exam ID'},
        { name: 'keyFindings', placeholder: 'Key Findings', type: 'textarea'},
        { name: 'brixiaScores', placeholder: 'Brixia Scores'},
        { name: 'imageURL', placeholder: 'Image URL'}
    ];

    const handleUserSubmit = (formData) => {
        console.log('user Data:', formData);
        fetch("http://localhost:9000/create",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => console.log(data))
    };

return (
    <>
    <div>
        <h2 className='patient-info-title'> Patient Info </h2>
        <Form onSubmit={handleUserSubmit} fields={patientFields}/>
    </div>
    </>
    );
}

export default ExamForm;