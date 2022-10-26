import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getFromAPI } from "../../util/httpMethods";
import { BASE_URL, CONTEXT_PATIENTS } from "../../util/constants";
import EncounterList from "../encounterList/EncounterList";
import FormButton from "../formButton/FormButton";

const PatientDetails = (props) => {

    const param = useParams();
    const [patient, setPatient] = useState({});
    
    useEffect(() => {
        getFromAPI((BASE_URL + CONTEXT_PATIENTS + "/" + param.id))
            .then((data) => {
                setPatient(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [param.id]);
    return (
        <div>
            <h2>Patient Record: {patient.lastName}, {patient.firstName}</h2>
            <h4>Patient ID: {patient.id}</h4>
            <Link to="/"><h4>Back to Patient List</h4></Link>
            <Link to="edit"><FormButton>Edit Patient Details</FormButton></Link>
            <p>SSN: {patient.ssn}</p>
            <p>Email: {patient.email}</p>
            <p>Address: {patient.street}</p>
            <p>{patient.city}, {patient.state} {patient.postal}</p>
            <p>Age: {patient.age}</p>
            <p>Height: {patient.height}</p>
            <p>Weight: {patient.weight}</p>
            <p>Insurance: {patient.insurance}</p>
            <p>Gender: {patient.gender}</p>
            <EncounterList patientId={param.id} />
        </div>
    );
}

export default PatientDetails;