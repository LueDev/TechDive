
import React, { useContext, useEffect, useState } from 'react';
import { PatientContext } from './PatientContext';
import './patient.css'; 
const PatientDetails = () => {
  const { patientId } = useContext(PatientContext);
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    // Here you would fetch the patient details from your backend
    // For this example, we're using static data
    const fetchPatientData = async () => {
      // Replace with actual API call
      const data = await getPatientData(patientId); // Mock function to mimic API call
      setPatientData(data);
    };

    if (patientId) {
      fetchPatientData();
    }
  }, [patientId]);

  if (!patientData) {
    return <div>Loading patient data...</div>;
  }

  return (
    <div className="patient-details">
      <h2>Patient Details</h2>
      <div>Patient ID: {patientData.id}</div>
      <div>Number of Exams: {patientData.exams.length}</div>
      
    </div>
  );
};

// Mock function to mimic fetching data from an API
const getPatientData = async (patientId) => {
  const patients = {
    '0000': { id: '0000', exams: [/* ...exams data */] },
    // ...other patients
  };
  return patients[patientId];
};

export default PatientDetails;
