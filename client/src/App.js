import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Sidebar from './sidebar';
import HeaderBar from './header';

// import { useApi } from './hooks/use-api';

const Home = React.lazy(() => import('./pages/Home'))
const Exams = React.lazy(() => import('./pages/Exams'))
const NotFound = React.lazy(() => import('./pages/NotFound'))
// Other imported pages go here...

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <React.Suspense fallback={ <>...</> }>
              <Home />
            </React.Suspense>
          }
        />
        <Route
          path="exams"
          element={
            <React.Suspense fallback={ <>...</> }>
              <Exams />
            </React.Suspense>
          }
        />
        {/* Other paths go here... */}
        <Route
          path="*"
          element={ <NotFound /> }
        />
      </Routes>
    </ BrowserRouter>
  );
}

export default App;
