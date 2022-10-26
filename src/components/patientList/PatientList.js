import { useState, useEffect } from "react";
import { getFromAPI } from "../../util/httpMethods";
import { BASE_URL, CONTEXT_PATIENTS } from "../../util/constants";
import PatientListItem from "./PatientListItem";
import { Link } from "react-router-dom";
import styles from "./PatientList.module.css";

/**
 * @name PatientList
 * @description Creates a list of all patients currently in the database, organized in a table.
 * @param {*} props 
 * @returns a table of patients.
 */
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
            <table className={styles.listContainer}>
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
            <Link to={`${CONTEXT_PATIENTS}/create`}>
                <button className={styles.create}>Create Patient</button>
            </Link>
        </div>
    );
}
export default PatientList;