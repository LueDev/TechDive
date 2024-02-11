/*

Following these user fields:

patientId
"aaaa"
age
-85
sex
"F"
zipCode
"720"
bmi
27.46
__v
0
examId
"Exam-1"
keyFindings
"lungs appear clear with no nodule, airspace  consolidation or pleural …"
brixiaScores
"1,2,3,4"
imageURL
"https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/COVID-19-…"

*/
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
        { name: 'keyFindings', placeholder: 'Key Findings'},
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