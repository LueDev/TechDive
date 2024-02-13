

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import { ExamProvider } from "./examcontext";
import './styles/App.css';
import PatientPage from "./pages/PatientPage/patientpage"; 
import HomePage from "./pages/Home/Home";


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
            {/* Define other routes here */}
          </Routes>
        </div>
      </Router>
    </ExamProvider>
  );
}

export default App;
