import Form from '../../components/General/Form/Form.js';
//import { data } from '../../mockdata.js';
import './ExamForm.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const ExamForm = () => {
    const patientFields = [
        { name: 'patientId', placeholder: 'Patient ID'},
        { name: 'age', placeholder: 'Age'},
        { name: 'sex', placeholder: 'Sex'},
        {name: 'height', placeholder: 'Height'},
        {name: 'weight', placeholder: 'Weight'},
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

    const initialValues = patientFields.reduce((values, field) => {
        values[field.name] = '';
        return values;
    }, {});
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            patientId: Yup.string().matches(
                /^COVID-[0-9]*$/,
                "Invalid patient ID: Must follow the COVID-<numbers> format")
            .required('Required'),
            age: Yup.number()
            .typeError("Invalid input: Age must be a number.")
            .min(1, 'Invalid input: Age must be at least 1.')
            .max(122, 'Invalid input: Age must be 122 or less.') //Based on oldest living person ever documented
            .required('Required')
            .positive('Invalid input: Age must be a positive number.'),
            sex: Yup.string().matches(
                /^(M|F|X)$/,
                "Invalid marker: Must be M, F, or X")
            .required('Required'),
            /* Will be caculated automatically and connected to the DB
            bmi: Yup.number()
            .typeError("Invalid input: BMI must be a number")
            .required('Required')
            .positive(),*/
            height: Yup.number()
            .typeError("Invalid input: Height must be a number.")
            .min(18, 'Invalid input: Height must be at least 18 inches.')
            .max(108, 'Invalid input: Height cannot exceed 108 inches.')
            .required('Required')
            .positive('Invalid input: Height must be a positive number.') ,
            weight: Yup.number()
            .typeError("Invalid input: Weight must be a number.")
            .min(1, "Invalid input: Weight must be at least 1 lb.")
            .max(1400, "Invalid input: Weight cannot be over 1,400 lbs.")
            .required('Required')
            .positive("Invalid input: Weight must be a positive number."),
            zipCode: Yup.string().matches(
                /^[0-9]{5}$/, 
                "Invalid input: Zip code must be 5 digits long.")
            .required('Required'),
            examId: Yup.string().matches(
                 /^Exam-[0-9]*$/i, 
                 "Invalid exam ID: must follow the EXAM-<numbers> format/")
            .required('Required'),
            keyFindings: Yup.string()
            .required('Required'),
            brixiaScores: Yup.string().matches(
                /^\d(?:,\d){0,6}$/, 'Invalid input: Brixia scores must be at least 1, at most 6 (i.e: 1,2,3) OR values are out of range [0-6].')
            .required('Required'),
            imageUrl: Yup.string()
            .required('Required')
    
        })
    });


    const handleUserSubmit = (event) => {
        event.preventDefault();
        console.log('user Data:', formik.values);
        fetch("http://localhost:9000/create",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify(formik.values),
        })
        .then(res => res.json())
        .then(data => console.log(data))
    };

return (
    
    <div>
        <h2 className='patient-info-title'> Patient Info </h2>
        <Form formik={formik} fields={patientFields} onSubmit={handleUserSubmit} />
    </div>
    );
}

export default ExamForm;