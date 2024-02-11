import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.js'
import Admin from './pages/Admin/Admin.js'
import AddPatient from './pages/AddPatient/AddPatient.js';
import Footer from './components/Footer/Footer.js'
import './styles/App.css';

// Lazy-loaded components
const NotFound = React.lazy(() => import('./pages/NotFound/NotFound.js'));
// Other imported pages go here...

function App() {

  return (
    <>

    <BrowserRouter>
      <Routes>

        {/*Routes for Sidebar on the Homepage */}
          <Route 
          path='/' element={<Home />} />

          <Route 
          path='/admin' element={<Admin />} />

          <Route
          path='/add' element={<AddPatient/>} />
          { /*add Routes for other sidebar tabs - Add Patient and Exam Info*/ }

        <Route
          path="*"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <NotFound />
            </React.Suspense>
          }


        />
      </Routes>
    </BrowserRouter>

    <Footer/>
    </>
  );
}

export default App;
