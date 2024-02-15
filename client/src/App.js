import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import { ExamProvider } from "./examcontext";
import './styles/App.css';
import PatientPage from "./pages/PatientPage/patientpage"; 
import HomePage from "./pages/Home/Home";
import PatientDetails from "./pages/PatientDetails/patientdetails";
import Footer from './components/Footer/Footer.js';

function App() {
  return (
    <ExamProvider>
      <Router>
        <div className="App">
          <Sidebar />
          <Header />
          <Routes>
            <Route path="/Home" element={<HomePage />} />
            <Route path="/patients" element={<PatientPage />} /> {/* Setup the route for PatientPage */}
            {/* <Route path="/patientdetails/" element={<PatientDetails/>} /> */}
            <Route path="/patientdetails/:patientId" element={<PatientDetails/>} />
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
