// //I need to put the code
// import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import Sidebar from './components/sidebar.js';
// import Header from './components/header';
// import { PatientProvider } from './patientcontext';
// import Table from 'react-bootstrap/Table';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import { data } from "./mockdata.js";
// import './styles/App.css'; 
// import {useState} from 'react'
// import PaginationComponent from './components/pagination.js';
// import PatientTable from './components/patientTable.js';


// function App() {
//   const [currentPage, setCurrentPage] = useState(1)
//   const recordsPerPage = 5;
//   const lastIndex = currentPage * recordsPerPage;
//   const firstIndex = lastIndex - recordsPerPage;
//   const records = data.slice(firstIndex, lastIndex);
//   const npage = Math.ceil(data.length / recordsPerPage)
//   //const numbers = [ ... Array(npage + 1).keys()].slice(1)
//   return (
//     <PatientProvider>
//       <Router>
//         <div className="App">
//           <Sidebar />
//           <Header />
//           <div className='main-content'>
//             <h1>Patient details</h1>
//             {/* Example details - consider using dynamic data */}
//             <p>Patient ID:</p>
//             <p>Number of Exams:</p>
            
//             {/* Search Bar aligned to the right */}
//             <div className="search-bar-container d-flex justify-content-end">
//               <Form>
//                 <InputGroup>
//                   <Form.Control placeholder="Search patient" className="search-input"/>
//                 </InputGroup>
//               </Form>
//             </div>
            
//             {/* Table to display patient data */}
//             <div className="table-container">
//               <PatientTable records={records} />
            
//               <nav>
//               <PaginationComponent
//                       totalRecords={data.length}
//                       recordsPerPage={recordsPerPage}
//                       currentPage={currentPage}
//                       onPageChange={changePage}
//                     />
//                 </nav>
//     </div>

//           </div>
//         </div>
//       </Router>
//     </PatientProvider>
//   );

// function prevPage(){
//   if(currentPage !== firstIndex) {
//     setCurrentPage(currentPage -1)
//   }
// }

// function changePage(id){
//   setCurrentPage(id)
// }

// function nextPage(){
//   if(currentPage !== lastIndex) {
//     setCurrentPage(currentPage +1)
//   }
// }
// }
// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import { PatientProvider } from "./patientcontext";
import './styles/App.css';
import PatientPage from "./pages/patientpage"; 


function App() {
  return (
    <PatientProvider>
      <Router>
        <div className="App">
          <Sidebar />
          <Header />
          <Routes>
            <Route path="/patients" element={<PatientPage />} /> {/* Setup the route for PatientPage */}
            {/* Define other routes here */}
          </Routes>
        </div>
      </Router>
    </PatientProvider>
  );
}

export default App;
