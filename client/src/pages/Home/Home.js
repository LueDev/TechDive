import React, { useState, useContext, useEffect } from 'react';
import PatientTable from '../../components/patientTable';
import PaginationComponent from '../../components/pagination';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { ExamContext } from '../../examcontext';

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { examData, getExams } = useContext(ExamContext);
  const [search, setSearch] = useState('');
  const [filteredExams, setFilteredExams] = useState([]);

  const recordsPerPage = 15;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = examData.slice(firstIndex, lastIndex);

  useEffect(() => {
    getExams();
  }, []);

  useEffect(() => {
    filterExams();
  }, [search]); // Call filterExams whenever search changes

  function changePage(id) {
    setCurrentPage(id);
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
  };

  const filterExams = () => {
    const filtered = examData.filter((value) => filterObjectBySearch(value, search));
    setFilteredExams(filtered);
  };

  const filterObjectBySearch = (obj, search) => {
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
      <h1>All Exams</h1>
      <div className="search-bar-container d-flex justify-content-end">
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Form.Control
              placeholder="Search patient"
              className="search-input"
              value={search}
              onChange={handleSearchChange}
              autoFocus
            />
          </InputGroup>
        </Form>
      </div>

      <div className="table-container">
        <PatientTable records={search ? filteredExams : examData} />

        <nav>
          <PaginationComponent
            totalRecords={search ? filteredExams.length : examData.length}
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
