import React, { useState } from 'react';
import PatientTable from '../../components/patientTable';
import PaginationComponent from '../../components/pagination';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PatientDetails = () => {
  const [patientExamData, setPatientExamData] = useState([]);

  const dataSelected = useParams();
  console.log(dataSelected);

  let specificPatientID = '';

  // checking if dataSelected.patientId exists
  if (dataSelected.patientid !== undefined) {
    specificPatientID = dataSelected.patientid;
  }

  console.log(specificPatientID);

  // Maybe here

  useEffect(() => {
    fetch(`http://localhost:9000/exams/patient/${specificPatientID}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const patients = data.exams;
        setPatientExamData(patients);
      });
  }, []);
  const [currentPage, setCurrentPage] = useState(1);

  // //Used to separate the data into chunks
  const recordsPerPage = 15;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = patientExamData.slice(firstIndex, lastIndex);

  function changePage(id) {
    setCurrentPage(id);
  }

  return (
    <div className="main-content">
      <h1>Patient Details</h1>
      {/* Example details - consider using dynamic data */}
      <p>Patient ID: {specificPatientID}</p>
      <p>Number of Exams: {patientExamData.length}</p>

      {/* Table to display patient data */}
      <div className="table-container">
        <PatientTable records={records} />

        <nav>
          <PaginationComponent
            totalRecords={patientExamData.length}
            recordsPerPage={recordsPerPage}
            currentPage={currentPage}
            onPageChange={changePage}
          />
        </nav>
      </div>
    </div>
  );
};

export default PatientDetails;
