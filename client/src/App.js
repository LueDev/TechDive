import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SecireTransport from "./components/SecureTransport.js"

import './styles/App.css';
import SecureTransport from './components/SecureTransport.js';

// Lazy-loaded components
const Home = React.lazy(() => import('./pages/Home/Home.js'));
const NotFound = React.lazy(() => import('./pages/NotFound/NotFound.js'));
// Other imported pages go here...

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <Home />
              <SecureTransport />
            </React.Suspense>
          }
        />
        {/* Other paths go here... */}
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
  );
}

export default App;
