// import axios from 'axios';
// import {useNavigate} from 'react-router-dom'

// const navigate = useNavigate();

// const services = {
//   getExams() {
//     localStorage.removeItem('token');
//     axios
//       .get(`${process.env.REACT_APP_LOCALSERVER}/`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       })
//       .then((response) => {
//         console.log('Response from protected route:', response);
//         return response.data.exams;
//       })
//       .catch((error) => {
//         console.error('Error accessing protected route:', error.response.data);
//       });}
// };

// const getExams = () => {
//   localStorage.removeItem('token');
//   axios
//     .get(`${process.env.REACT_APP_LOCALSERVER}/`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//     })
//     .then((response) => {
//       console.log('Response from protected route:', response);
//       return response.data.exams;
//     })
//     .catch((error) => {
//       console.error('Error accessing protected route:', error.response.data);
//     });
// };

// const deleteExamById = async (examId) => {
//   if (window.confirm('Are you sure you want to delete this exam?')) {
//     try {
//       await axios.delete(
//         `${process.env.REACT_APP_LOCALSERVER}/admin/exams/${examId}`,
//       );
//       setExamData((prevExams) =>
//         prevExams.filter((exam) => exam.examId !== examId),
//       );
//     } catch (error) {
//       console.error('Error deleting exam:', error);
//       alert('Failed to delete exam. Please try again.');
//     }
//   }
// };

// const updateExamById = async (examId, updatedExam) => {
//   try {
//     await axios.put(
//       `${process.env.REACT_APP_LOCALSERVER}/admin/exams/up/${examId}`,
//       updatedExam,
//     );
//     setExamData((prevData) =>
//       prevData.map((data) =>
//         data.examId === examId ? { ...data, ...updatedExam } : data,
//       ),
//     );
//   } catch (error) {
//     console.error('Error updating exam:', error);
//     alert('Failed to update exam. Please try again.');
//   }
// };

// const registerUser = () => {
//   axios
//     .post(`${process.env.REACT_APP_LOCALSERVER}/users/register`, formik.values)
//     .then((data) => {
//       console.log('SUCCESS WITH AXIOS: ', data);
//       localStorage.setItem('token', data.data.accessToken);
//       navigate('/home');
//     })
//     .catch((err) => {
//       console.log('UNSUCCESSFUL REGISTRATION: ', err);
//     });
// };

// module.exports = { getExams, updateExamById, deleteExamById, registerUser };
