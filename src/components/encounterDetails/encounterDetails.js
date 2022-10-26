import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getFromAPI } from "../../util/httpMethods";
import { BASE_URL, CONTEXT_PATIENTS, CONTEXT_ENCOUNTERS } from "../../util/constants";
import FormButton from "../formButton/FormButton";
import styles from "../patientDetails/PatientDetails.module.css";

/**
 * @name EncounterDetails
 * @description Loads encounter data from the API, then displays it on the page.
 * @returns The requested encounter data.
 */
const EncounterDetails = (props) => {

    const { setServerError } = props;

    const param = useParams();
    const [encounter, setEncounter] = useState({});

    useEffect(() => {
        setServerError(false);
        getFromAPI((BASE_URL + CONTEXT_PATIENTS + "/" + param.patientId + CONTEXT_ENCOUNTERS + "/" + param.id))
            .then((data) => {
                setEncounter(data);
            })
            .catch(error => {
                setServerError(true);
            });
    }, [param.patientId, param.id]); //eslint-disable-line

    return (
        <div className={styles.data}>
            <h2>View Encounter: {encounter.id}</h2>
            <Link to={`${CONTEXT_PATIENTS}/${param.patientId}`}>
                <h4>Back to Patient</h4>
            </Link>
            <Link to={`${CONTEXT_PATIENTS}/${param.patientId}${CONTEXT_ENCOUNTERS}/${param.id}/edit`}>
                <FormButton>Edit Encounter</FormButton>
            </Link>
            <p><b>Notes:</b> {encounter.notes}</p>
            <p><b>Visit Code:</b> {encounter.visitCode}</p>
            <p><b>Provider:</b> {encounter.provider}</p>
            <p><b>Billing Code:</b> {encounter.billingCode}</p>
            <p><b>ICD10:</b> {encounter.icd10}</p>
            <p><b>Total Cost:</b> {encounter.totalCost}</p>
            <p><b>Co-pay:</b> {encounter.copay}</p>
            <p><b>Chief Complaint:</b> {encounter.chiefComplaint}</p>
            <p><b>Pulse:</b> {encounter.pulse}</p>
            <p><b>Systolic Pressure:</b> {encounter.systolic}</p>
            <p><b>Diastolic Pressure:</b> {encounter.diastolic}</p>
            <p><b>Date:</b> {encounter.date}</p>
        </div>
    );
}

export default EncounterDetails;