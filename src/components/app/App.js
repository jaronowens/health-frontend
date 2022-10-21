import { Routes, Route } from 'react-router-dom';
import { CONTEXT_PATIENTS } from '../../util/constants';
import PatientDetails from '../patientDetails/PatientDetails';
import PatientList from '../patientList/PatientList';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PatientList />}/>
        <Route path={`${CONTEXT_PATIENTS}/:id`} element={<PatientDetails />} />
      </Routes>
    </div>
  );
}

export default App;
