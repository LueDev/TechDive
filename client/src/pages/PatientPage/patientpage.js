import React, { useState, useContext } from 'react';
import PatientTable from '../../components/patientTable';
import PaginationComponent from '../../components/pagination';
import { data } from '../../mockdata';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { ExamContext } from '../../examcontext';

const PatientPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { examData } = useContext(ExamContext);
  // console.log(examData)

  //Used to separate the data into chunks
  const recordsPerPage = 15;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = examData.slice(firstIndex, lastIndex);

  function changePage(id) {
    setCurrentPage(id);
  }

  return (
    <div className="main-content">
      <h1>Patient details</h1>
      {/* Example details - consider using dynamic data */}
      <p>Patient ID:</p>
      <p>Number of Exams:</p>

      {/* Search Bar aligned to the right */}
      <div className="search-bar-container d-flex justify-content-end">
        <Form>
          <InputGroup>
            <Form.Control
              placeholder="Search patient"
              className="search-input"
            />
          </InputGroup>
        </Form>
      </div>

      {/* Table to display patient data */}
      <div className="table-container">
        <PatientTable records={records} />

        <nav>
          <PaginationComponent
            totalRecords={examData.length}
            recordsPerPage={recordsPerPage}
            currentPage={currentPage}
            onPageChange={changePage}
          />
        </nav>
      </div>
    </div>
  );
};

export default PatientPage;
