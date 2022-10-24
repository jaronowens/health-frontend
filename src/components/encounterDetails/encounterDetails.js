import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getFromAPI } from "../../util/httpMethods";
import { BASE_URL, CONTEXT_PATIENTS, CONTEXT_ENCOUNTERS } from "../../util/constants";

const EncounterDetails = (props) => {

    const param = useParams();
    const [encounter, setEncounter] = useState({});

    useEffect(() => {
        getFromAPI((BASE_URL + CONTEXT_PATIENTS + "/" + param.patientId + CONTEXT_ENCOUNTERS + "/" + param.id))
            .then((data) => {
                setEncounter(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [param.patientId, param.id]);

    return(
        <div>
            <p>ID: {encounter.id}</p>
            <p>Notes: {encounter.notes}</p>
            <p>Visit Code: {encounter.visitCode}</p>
            <p>Provider: {encounter.provider}</p>
            <p>Billing Code: {encounter.billingCode}</p>
            <p>ICD10: {encounter.icd10}</p>
            <p>Total Cost: {encounter.totalCost}</p>
            <p>Co-pay: {encounter.copay}</p>
            <p>Chief Complaint: {encounter.chiefComplaint}</p>
            <p>:Pulse {encounter.pulse}</p>
            <p>Systolic Pressure: {encounter.systolic}</p>
            <p>Diastolic Pressure: {encounter.diastolic}</p>
            <p>Date: {encounter.date}</p>
            <Link to={`${CONTEXT_PATIENTS}/${param.patientId}${CONTEXT_ENCOUNTERS}/${param.id}/edit`}>Edit Encounter</Link>
            <Link to={`${CONTEXT_PATIENTS}/${param.patientId}`}>Back to Patient</Link>
        </div>
    );
}

export default EncounterDetails;