import { useState, useEffect } from "react";
import { getFromAPI } from "../../util/httpMethods";
import { BASE_URL, CONTEXT_PATIENTS } from "../../util/constants";

const PatientList = (props) => {

    const [patients, setPatients] = useState([]);
    
    useEffect(() => {
        getFromAPI((BASE_URL + CONTEXT_PATIENTS))
        .then((data) => {
            setPatients(data);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    return(
        <div>
            <ul>
                {patients.map(patient => <li>{patient.firstName} {patient.lastName}, {patient.age}, {patient.gender} </li>)}
            </ul>
        </div>
    );
}
export default PatientList;