import Sidebar from '../../components/Sidebar/Sidebar';
import React, { useState, useContext } from 'react';
import AdminTable from '../../components/adminTable';
import PaginationComponent from '../../components/pagination';
import { data } from '../../mockdata';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { ExamContext } from '../../examcontext';

const Admin = () => {

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
      <h1>Exam</h1>
      

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
        <AdminTable records={records} />

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
