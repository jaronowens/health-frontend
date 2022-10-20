import { Routes, Route } from 'react-router-dom';
import PatientList from '../patientList/PatientList';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PatientList />}/>
      </Routes>
    </div>
  );
}

export default App;
