// App.js or wherever your main app component is defined
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ExamProvider } from './examcontext';
import './styles/App.css';
import MainLayout from './mainlayout'; // Import the Layout component
import HomePage from './pages/Home/Home';
import PatientPage from './pages/PatientPage/patientpage';
import ExamForm from './pages/AddPatient/ExamForm';
import NotFound from './pages/NotFound/NotFound';
import AdminPage from './pages/Admin/Admin';
import SplitPage from './pages/LoginPage/splitpage'; // Assuming this is the correct path
import PatientDetails from './pages/PatientDetails/patientdetails';
import DashboardChart from './pages/dashboard/dashboard.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SplitPage />} />
          <Route
            path="/home"
            element={
              <ExamProvider>
                <MainLayout>
                  <HomePage />
                </MainLayout>
              </ExamProvider>
            }
          />
          <Route
            path="/admin"
            element={
              <ExamProvider>
                <MainLayout>
                  <AdminPage />
                </MainLayout>
              </ExamProvider>
            }
          />
          <Route
            path="/exams/:patientid"
            element={
              <ExamProvider>
                <MainLayout>
                  <PatientDetails />
                </MainLayout>
              </ExamProvider>
            }
          />
          // TODO: Fixme
          <Route
            path="/add"
            element={
              <ExamProvider>
                <MainLayout>
                  <ExamForm />
                </MainLayout>
              </ExamProvider>
            }
          />
          <Route
            path="/exam/:examid"
            element={
              <ExamProvider>
                <MainLayout>
                  <PatientDetails />
                </MainLayout>
              </ExamProvider>
            }
          />
          {/* <Route
            path="/file"
            element={
              <ExamProvider>
                <MainLayout>
                  <PatientPage />
                </MainLayout>
              </ExamProvider>
            }
          /> */}
            <Route path ="/dashboard" element={<MainLayout><DashboardChart /></MainLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
