
import 'bootstrap/dist/css/bootstrap.min.css';

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/header";
import { ExamProvider } from "./examcontext";
import './styles/App.css';
import PatientPage from "./pages/PatientPage/patientpage"; 
import HomePage from "./pages/Home/Home";
import PatientDetails from "./pages/PatientDetails/patientdetails";
import Footer from './components/Footer/Footer.js';
import AdminPage from './pages/Admin/Admin.js'
import ExamDetails from './pages/ExamDetails/examdetails';


function App() {
  return (
    <ExamProvider>
      <Router>
        <div className="App">
          <Sidebar />
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/patients" element={<PatientPage />} /> {/* Setup the route for PatientPage */}
            {/* <Route path="/patientdetails/" element={<PatientDetails/>} /> */}
            <Route path="/patientdetails/:patientId" element={<PatientDetails/>} />
            <Route path="/examdetails/:examId" element={<ExamDetails/>} />
            {/* Define other routes here */}
            {/* <Route path="/patientdetails/:patientId" component={<PatientDetails/>} /> */}
          </Routes>
          {/* <Footer/> */}
        </div>
      </Router>
    </ExamProvider>
  );
}

export default App;
