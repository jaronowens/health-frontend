import { Routes, Route } from 'react-router-dom';
import PatientForm from '../patientForm/PatientForm';
import { CONTEXT_ENCOUNTERS, CONTEXT_PATIENTS } from '../../util/constants';
import EncounterDetails from '../encounterDetails/encounterDetails';
import EncounterForm from '../encounterForm/EncounterForm';
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

        <Route path={`${CONTEXT_PATIENTS}/:patientId${CONTEXT_ENCOUNTERS}/:id`} element={<EncounterDetails />}/>
        <Route path={`${CONTEXT_PATIENTS}/:patientId${CONTEXT_ENCOUNTERS}/create`} element={<EncounterForm mode='create' />}/>
        <Route path={`${CONTEXT_PATIENTS}/:patientId${CONTEXT_ENCOUNTERS}/:id/edit`} element={<EncounterForm mode='edit' />}/>
        
      </Routes>
    </div>
  );
}

export default App;
