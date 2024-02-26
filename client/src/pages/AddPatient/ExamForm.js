import Form from '../../components/General/Form/Form.js';
import './ExamForm.css';

const ExamForm = () => {
    const patientFields = [
        { name: 'patientId', placeholder: 'Patient ID'},
        { name: 'age', placeholder: 'age'},
        { name: 'sex', placeholder: 'sex'},
        { name: 'height', placeholder: 'height in inches'},
        { name: 'weight', placeholder: 'weight in pounds'},
        { name: 'zipCode', placeholder: 'Zip Code'},
        { name: 'examId', placeholder: 'Exam ID'},
        { name: 'keyFindings', placeholder: 'Key Findings', type: 'textarea'},
        { name: 'brixiaScores', placeholder: 'Brixia Scores'},
        { name: 'imageURL', placeholder: 'Image URL'}
    ];

    const handleUserSubmit = (formData) => {
        console.log('user Data:', formData);
         
        // formData.weight = parseFloat(formData.weight)
        // formData.height = parseFloat(formData.height)
        // formData.age = parseFloat(formData.age)

        fetch(`${process.env.REACT_APP_LOCALSERVER}/create`,
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