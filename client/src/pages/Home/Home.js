import React, { useState, useContext, useEffect } from 'react';
import PatientTable from '../../components/patientTable';
import PaginationComponent from '../../components/pagination';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { ExamContext } from "../../examcontext"


const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {examData, getExams} = useContext(ExamContext) 

  const recordsPerPage = 15;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = examData.slice(firstIndex, lastIndex);

  useEffect(() => {
    getExams()
  }, [])

  function changePage(id) {
    setCurrentPage(id);
  }

  return (
    <div className='main-content'>
      <h1>All Exams</h1>
      <div className="search-bar-container d-flex justify-content-end">
        <Form>
          <InputGroup>
            <Form.Control placeholder="Search patient" className="search-input"/>
          </InputGroup>
        </Form>
      </div>
    
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

export default HomePage;
