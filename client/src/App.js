// App.js or wherever your main app component is defined
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ExamProvider } from "./examcontext";
import './styles/App.css';
import MainLayout from "./mainlayout"; // Import the Layout component
import HomePage from "./pages/Home/Home";
import PatientPage from "./pages/PatientPage/patientpage";
import ExamForm from "./pages/AddPatient/ExamForm";
import NotFound from "./pages/NotFound/NotFound";
import AdminPage from "./pages/Admin/Admin";
import SplitPage from './pages/LoginPage/splitpage'; // Assuming this is the correct path

function App() {
  return (
    <ExamProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* For SplitPage, we render it without the Layout */}
            <Route path="/" element={<SplitPage />} />

            
            <Route path="/home" element={<MainLayout><HomePage /></MainLayout>} />
            <Route path="/admin" element={<MainLayout><AdminPage /></MainLayout>} />
            <Route path="/patients" element={<MainLayout><PatientPage /></MainLayout>} />
            <Route path="/add" element={<MainLayout><ExamForm /></MainLayout>} />
            <Route path="/file" element={<MainLayout><PatientPage /></MainLayout>} />
            <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
          </Routes>
        </div>
      </Router>
    </ExamProvider>
    
  );
}

export default App;
