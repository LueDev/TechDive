

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/header";
import { ExamProvider } from "./examcontext";
import './styles/App.css';
import PatientPage from "./pages/PatientPage/patientpage"; 
import HomePage from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import ExamForm from "./pages/AddPatient/ExamForm";
import NotFound from "./pages/NotFound/NotFound";
import AdminPage from "./pages/Admin/Admin"

function App() {

  return (
    <>
    <ExamProvider>
      <Router>
        <div className="App">
          <Sidebar />
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/patients" element={<PatientPage />} /> {/* Setup the route for PatientPage */}
            <Route path="/add" element={<ExamForm/>} />
            <Route path="/file" element={<PatientPage />}/>
            <Route path="*" element={<NotFound/>} />
            {/* Define other routes here */}
          </Routes>
          <Footer/>
        </div>
      </Router>
    </ExamProvider>
    </>
  );
}

export default App;
