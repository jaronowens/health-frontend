import { useState, useEffect } from "react";
import { getFromAPI } from "../../util/httpMethods";
import { BASE_URL, CONTEXT_PATIENTS, CONTEXT_ENCOUNTERS } from "../../util/constants";
import { Link } from "react-router-dom";
import EncounterListItem from "./EncounterListItem";
import styles from "../patientList/PatientList.module.css"

const EncounterList = (props) => {

    const { patientId } = props;
    const [encounters, setEncounters] = useState([]);

    useEffect(() => {
        getFromAPI((BASE_URL + CONTEXT_PATIENTS + "/" + patientId + CONTEXT_ENCOUNTERS))
            .then((data) => {
                setEncounters(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [patientId]);

    return (
        <div>
            <table className={styles.listContainer}>
                <thead>
                    <tr>
                        <th>Encounter ID</th>
                        <th>Visit Code</th>
                        <th>Provider</th>
                        <th>Date</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {encounters.map(encounter => <EncounterListItem key={encounter.id} encounter={encounter} />)}
                </tbody>
            </table>
            <Link to={`${CONTEXT_PATIENTS}/${patientId}${CONTEXT_ENCOUNTERS}/create`}><button>Create Encounter</button></Link>
        </div>
    );
}
export default EncounterList;