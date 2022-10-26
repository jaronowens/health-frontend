import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import PatientForm from '../patientForm/PatientForm';
import { CONTEXT_ENCOUNTERS, CONTEXT_PATIENTS } from '../../util/constants';
import EncounterDetails from '../encounterDetails/encounterDetails';
import EncounterForm from '../encounterForm/EncounterForm';
import PatientDetails from '../patientDetails/PatientDetails';
import PatientList from '../patientList/PatientList';
import styles from './App.module.css';
import Header from '../header/Header';

function App() {

  /* Handles server error messaging. If a component needs to make an API call, it should be 
  passed the setServerError callback as a prop, and it should be invoked in catch blocks. */
  const [serverError, setServerError] = useState(false);

  return (
    <div className={styles.container}>
      <Header align="right">Super Health, LLC</Header>
      {serverError && <h2 className={styles.serverError}>Oh no, something went wrong.</h2>}
      <Routes>
        <Route path="/" element={<PatientList setServerError={setServerError}/>} />
        <Route path={`${CONTEXT_PATIENTS}/:id`} element={<PatientDetails setServerError={setServerError}/>} />
        <Route path={`${CONTEXT_PATIENTS}/create`} element={<PatientForm mode='create' setServerError={setServerError}/>} />
        <Route path={`${CONTEXT_PATIENTS}/:id/edit`} element={<PatientForm mode='edit' setServerError={setServerError}/>} />

        <Route path={`${CONTEXT_PATIENTS}/:patientId${CONTEXT_ENCOUNTERS}/:id`} element={<EncounterDetails setServerError={setServerError}/>} />
        <Route path={`${CONTEXT_PATIENTS}/:patientId${CONTEXT_ENCOUNTERS}/create`} element={<EncounterForm mode='create' setServerErrorr={setServerError}/>} />
        <Route path={`${CONTEXT_PATIENTS}/:patientId${CONTEXT_ENCOUNTERS}/:id/edit`} element={<EncounterForm mode='edit' setServerError={setServerError}/>} />

      </Routes>
    </div>
  );
}

export default App;
