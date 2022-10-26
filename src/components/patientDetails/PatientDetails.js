import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getFromAPI } from "../../util/httpMethods";
import { BASE_URL, CONTEXT_PATIENTS } from "../../util/constants";
import EncounterList from "../encounterList/EncounterList";
import FormButton from "../formButton/FormButton";
import styles from "./PatientDetails.module.css";

/**
 * @name PatientDetails
 * @description Loads patient data from the API, then displays it on the page.
 * @returns The requested patient data.
 */
const PatientDetails = (props) => {
    const { setServerError } = props;

    const param = useParams();
    const [patient, setPatient] = useState({});
    
    useEffect(() => {
        setServerError(false);
        getFromAPI((BASE_URL + CONTEXT_PATIENTS + "/" + param.id))
            .then((data) => {
                setPatient(data);
            })
            .catch(error => {
                setServerError(true);
            });
    }, [param.id]); //eslint-disable-line
    return (
        <div className={styles.data}>
            <h2>Patient Record: {patient.lastName}, {patient.firstName}</h2>
            <h4>Patient ID: {patient.id}</h4>
            <Link to="/"><h4>Back to Patient List</h4></Link>
            <Link to="edit"><FormButton>Edit Patient Details</FormButton></Link>
            <p><b>SSN:</b> {patient.ssn}</p>
            <p><b>Email:</b> {patient.email}</p>
            <p><b>Address:</b> {patient.street}</p>
            <p>{patient.city}, {patient.state} {patient.postal}</p>
            <p><b>Age:</b> {patient.age}</p>
            <p><b>Height:</b> {patient.height}</p>
            <p><b>Weight:</b> {patient.weight}</p>
            <p><b>Insurance:</b> {patient.insurance}</p>
            <p><b>Gender:</b> {patient.gender}</p>
            <EncounterList patientId={param.id} setServerError={setServerError} />
        </div>
    );
}

export default PatientDetails;