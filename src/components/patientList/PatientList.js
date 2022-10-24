import { useState, useEffect } from "react";
import { getFromAPI } from "../../util/httpMethods";
import { BASE_URL, CONTEXT_PATIENTS } from "../../util/constants";
import PatientListItem from "./PatientListItem";
import { Link } from "react-router-dom";

const PatientList = (props) => {

    const [patients, setPatients] = useState([]);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        getFromAPI((BASE_URL + CONTEXT_PATIENTS))
            .then((data) => {
                setPatients(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [refresh]);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map(patient => <PatientListItem key={patient.id} patient={patient} refresh={refresh} setRefresh={setRefresh} />)}
                </tbody>
            </table>
            <Link to={`${CONTEXT_PATIENTS}/create`}><button>Create Patient</button></Link>
        </div>
    );
}
export default PatientList;