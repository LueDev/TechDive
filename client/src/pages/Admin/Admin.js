import React, { useState, useContext, useEffect } from 'react';
import AdminTable from '../../components/adminTable';
import PaginationComponent from '../../components/pagination';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { ExamContext } from '../../examcontext';

const Admin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [records, setRecords] = useState([]); // Define records as a state
  const { examData, deleteExamById } = useContext(ExamContext);
  const recordsPerPage = 15;

  useEffect(() => {
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    // Update records state based on the current page and examData
    setRecords(examData.slice(firstIndex, lastIndex));
  }, [examData, currentPage, recordsPerPage]); // Depend on examData and currentPage
  
  function changePage(id) {
    setCurrentPage(id);
  }

  return (
    <div className="main-content">
      <h1>Exam</h1>

      <div className="search-bar-container d-flex justify-content-end">
        <Form>
          <InputGroup>
            <Form.Control placeholder="Search patient" className="search-input" />
          </InputGroup>
        </Form>
      </div>

      <div className="table-container" key={examData.length}>
        <AdminTable records={records} deleteExam={deleteExamById} />
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

export default Admin;
