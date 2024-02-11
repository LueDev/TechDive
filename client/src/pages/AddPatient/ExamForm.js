import Form from '../../components/General/Form/Form.js';
import './ExamForm.css';

const ExamForm = () => {
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

    const handleUserSubmit = (FormData) => {
        console.log('user Data:', FormData);
        //Connect to DB here, are we using mongoose for a schema?
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