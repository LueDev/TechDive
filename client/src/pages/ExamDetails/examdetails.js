import React, { useState } from 'react';
import ExamTable from '../../components/examTable';
import PaginationComponent from '../../components/pagination';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PatientTable from '../../components/patientTable';

const ExamDetails = () => {
  const [patientExamData, setExamData] = useState([]);
  const dataSelected = useParams();

  //console.log(`This is the data  ${JSON.stringify(dataSelected)}` )

  let specificExamID = '';
  let patientId = '';

  // checking if dataSelected.ExamId exists
  if (dataSelected.examId !== undefined) {
    specificExamID = dataSelected.examId;
    patientId = dataSelected.patientId;
  }

  useEffect(() => {
    //fetch(`${process.env.REACT_APP_LOCALSERVER}/examsId/${specificExamID}`)
    fetch(
      `${process.env.REACT_APP_LOCALSERVER}/exams/${patientId}/examsId/${specificExamID}`,
    )
      .then((res) => res.json())
      .then((data) => {
        const patients = Object.entries(data)[0][1];
        setExamData(patients);
      });
  }, []);
  const [currentPage, setCurrentPage] = useState(1);

  // Used to separate the data into chunks
  const recordsPerPage = 15;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = patientExamData.slice(firstIndex, lastIndex);

  function changePage(id) {
    setCurrentPage(id);
  }

  return (
    <div className="main-content">
      <h1>Exam Details</h1>
      {/* Example details - consider using dynamic data */}
      {/* <p>Exam for Patient: {specificExamID}</p> */}
      <p>Detailed Patient Examination Record</p>

      {/* Table to display patient data */}
      {/* <div className="table-container"> */}
      <div>
        <ExamTable records={records} />

        {/* <nav>
              <PaginationComponent
                totalRecords={patientExamData.length}
                recordsPerPage={recordsPerPage}
                currentPage={currentPage}
                onPageChange={changePage}
              />
            </nav> */}
      </div>
    </div>
  );
};

export default ExamDetails;
