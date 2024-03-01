import React, { useState, useContext, useEffect } from 'react';
import AdminTable from '../../components/adminTable';
import PaginationComponent from '../../components/pagination';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { ExamContext } from '../../examcontext';

const Admin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { examData, getExams, deleteExamById } = useContext(ExamContext);
  const [search, setSearch] = useState('');
  const [filteredRecords, setFilteredRecords] = useState([]);
  const recordsPerPage = 15;

  useEffect(() => {
    getExams();
  }, []);

  useEffect(() => {
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    setFilteredRecords(examData.filter(filterObjectBySearch));
  }, [examData, currentPage, recordsPerPage, search]);

  function changePage(id) {
    setCurrentPage(id);
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filterObjectBySearch = (obj) => {
    if (!search) return true;
    return Object.values(obj).some((value) => {
      if (typeof value === 'string' && value.toLowerCase().includes(search.toLowerCase())) {
        return true;
      }
      if (typeof value === 'number' && value.toString().includes(search)) {
        return true;
      }
      return false;
    });
  };

  return (
    <div className="main-content">
      <h1>Exam</h1>

      <div className="search-bar-container d-flex justify-content-end">
        <Form>
          <InputGroup>
            <Form.Control
              placeholder="Search patient"
              className="search-input"
              value={search}
              onChange={handleSearchChange}
            />
          </InputGroup>
        </Form>
      </div>

      <div className="table-container" key={filteredRecords.length}>
        <AdminTable records={filteredRecords} deleteExam={deleteExamById} />
        <nav>
          <PaginationComponent
            totalRecords={filteredRecords.length}
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
