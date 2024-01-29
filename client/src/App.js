import './App.css';
import Sidebar from './sidebar';

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
      
    </div>
  );
}

export default App;
