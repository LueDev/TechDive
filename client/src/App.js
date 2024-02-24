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
import PatientDetails from "./pages/PatientDetails/patientdetails";
import Footer from './components/Footer/Footer.js';
import DashboardChart from "./pages/dashboard/dashboard.js";


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
            <Route path="/exams/:patientid" element={<MainLayout><PatientDetails /></MainLayout>} />
            <Route path="/add" element={<MainLayout><ExamForm /></MainLayout>} />
            
            {/*Please include the exam details page on the react route below. The routing is setup for this. */}
            <Route path="/exam/:examid" element={<MainLayout><PatientDetails /></MainLayout>} />
            <Route path ="/dashboard" element={<MainLayout><DashboardChart /></MainLayout>} />
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
