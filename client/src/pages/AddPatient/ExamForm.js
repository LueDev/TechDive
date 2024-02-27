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
        { name: 'bmi', placeholder: 'BMI'},
        {name: 'height', placeholder: 'Height'},
        {name: 'weight', placeholder: 'Weight'},
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
                "Invalid patient ID: Must follow the COVID-<numbers> format and is case-insensitive")
            .required('Required'),
            age: Yup.number()
            .typeError("Invalid input: Age must be a number")
            .min(1, 'Age must be at least 1.')
            .max(122, 'Age must be 122 or less.') //Based on oldest living person ever documented
            .required('Required')
            .positive(),
            sex: Yup.string().matches(
                /^(M|F|X)$/,
                "Invalid marker: Must be M, F, or X")
            .required('Required'),
            bmi: Yup.number()
            .typeError("Invalid input: BMI must be a number") //incoporate formula: bmi = weight(lb)/height^2 * 703
            .required('Required')
            .positive(),
            height: Yup.number()
            .typeError("Invalid Input: Height must be a number")
            .min(18, 'Invalid input: Height must be at least 18 inches')
            .max(108, 'Invalid input: Height cannot exceed 108 inches')
            .required('Required')
            .positive() ,
            weight: Yup.number()
            .min(1, "Weight must be at least 1 lb")
            .max(1400, "Weight cannot be over 1,400 lbs")
            .required('Required').positive(),
            zipCode: Yup.string().matches(
                /^[0-9]{5}$/, 
                "Invalid zip code: Must be 5 digits long")
            .required('Required'),
            examId: Yup.string().matches(
                 /^Exam-[0-9]*$/i, 
                 "Invalid Exam ID: must follow the EXAM-<numbers> format and is case-insensitive")
            .required('Required'),
            keyFindings: Yup.string()
            .required('Required'),
            brixiaScores: Yup.string().matches(/^([0-9],[0-9])(,[0-9],[0-9]){1,2}$/, 'Brixia scores must be at least 2 numbers, at most 6, and in range 0-6 (seperated by commas)')
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