// PatientList.js
import React from 'react';
import { Link } from 'react-router-dom';

const PatientList = ({ patients }) => {
  return (
    <div>
      {patients.map(patient => (
        <Link to={`/patient/${patient.id}`} key={patient.id}>
          {patient.name}
        </Link>
      ))}
    </div>
  );
};

// PatientDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientDetails = ({ match }) => {
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      const response = await axios.get(`/api/patients/${match.params.id}`);
      setPatientData(response.data);
    };

    fetchPatientData();
  }, [match.params.id]);

  if (!patientData) return <div>Loading...</div>;

  return (
    <div>
      {/* Display patient details here */}
    </div>
  );
};


