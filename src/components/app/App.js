import { Routes, Route } from 'react-router-dom';
import PatientForm from '../../patientForm/patientForm';
import { CONTEXT_PATIENTS } from '../../util/constants';
import PatientDetails from '../patientDetails/PatientDetails';
import PatientList from '../patientList/PatientList';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PatientList />}/>
        <Route path={`${CONTEXT_PATIENTS}/:id`} element={<PatientDetails />} />
        <Route path={`${CONTEXT_PATIENTS}/create`} element={<PatientForm mode='create' />}/>
        <Route path={`${CONTEXT_PATIENTS}/:id/edit`} element={<PatientForm mode='edit' />}/>
      </Routes>
    </div>
  );
}

export default App;
