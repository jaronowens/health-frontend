import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getFromAPI } from "../../util/httpMethods";
import { BASE_URL, CONTEXT_PATIENTS } from "../../util/constants";

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
        <p>Patient ID: {patient.id}</p>
        <p>First Name: {patient.firstName}</p>
        <p>Last Name: {patient.lastName}</p>
        <p>SSN: {patient.ssn}</p>
        <p>Email: {patient.email}</p>
        <p>Street: {patient.street}</p>
        <p>City: {patient.city}</p>
        <p>State: {patient.state}</p>
        <p>ZIP: {patient.postal}</p>
        <p>Age: {patient.age}</p>
        <p>Height: {patient.height}</p>
        <p>Weight: {patient.weight}</p>
        <p>Insurance: {patient.insurance}</p>
        <p>Gender: {patient.gender}</p>
        <Link to="edit">Edit Patient Details</Link>
        <Link to="/">Back to Patient List</Link>
        </div>
    );
}

export default PatientDetails;