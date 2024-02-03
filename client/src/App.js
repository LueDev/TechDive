import './App.css';
import Sidebar from './sidebar';
import HeaderBar from './header';



import { useApi } from './hooks/use-api';

function App() {
  const { response } = useApi();

  return (
    <div className="App">
      {/* <header className="App-header">
        <p>
          {response}
        </p>
      </header> */}
      <Sidebar/>

      <HeaderBar/>
    </div>
  );
}

export default App;
