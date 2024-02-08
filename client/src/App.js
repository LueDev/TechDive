import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './sidebar';
import Header from './components/header';
import { PatientProvider } from './patientcontext';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { data } from "./data.js";
import './App.css';
import {useState} from 'react'

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage)
  const numbers = [ ... Array(npage + 1).keys()].slice(1)
  return (
    <PatientProvider>
      <Router>
        <div className="App">
          <Sidebar />
          <Header />
          <div className='main-content'>
            <h1>Patient details</h1>
            {/* Example details - consider using dynamic data */}
            <p>Patient ID:</p>
            <p>Number of Exams:</p>
            
            {/* Search Bar aligned to the right */}
            <div className="search-bar-container d-flex justify-content-end">
              <Form>
                <InputGroup>
                  <Form.Control placeholder="Search patient" className="search-input"/>
                </InputGroup>
              </Form>
            </div>
            
            {/* Table to display patient data */}
            <div className="table-container">
              <Table striped bordered hover className='table'>
                <thead>
                  <tr>
                    <th>Patient ID</th>
                    <th>Exam ID</th>
                    <th>Image</th>
                    <th>Key Finding</th>
                    <th>Age</th>
                    <th>Sex</th>
                    <th>BMI</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((item,i) => (

                    <tr key={i}>
                      <td>{item.id}</td>
                      <td>{item.exam_id}</td>
                      <td>{item.Image}</td>
                      <td>{item.Key_finding}</td>
                      <td>{item.age}</td>
                      <td>{item.gender}</td>
                      <td>{item.BMI}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            
            <nav>
      <ul className='pagination'>
        <li className='page-item'>
          <a href='#' className='page-link' 
          onClick={prevPage}>Prev</a>
        </li>
        {
        numbers.map((n, i) => (
          <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
            <a href='#' className='page-link' 
            onClick={(e) => {
          e.preventDefault();
          changePage(n);
        }}>{n}</a>
          </li>
        ))
        }
        <li className='page-item'>
          <a href='#' className='page-link' 
          onClick={nextPage}>Next</a>
        </li>
      </ul>
    </nav>
    </div>

          </div>
        </div>
      </Router>
    </PatientProvider>
  );

function prevPage(){
  if(currentPage !== firstIndex) {
    setCurrentPage(currentPage -1)
  }
}

function changePage(id){
  setCurrentPage(id)
}

function nextPage(){
  if(currentPage !== lastIndex) {
    setCurrentPage(currentPage +1)
  }
}
}
export default App;
