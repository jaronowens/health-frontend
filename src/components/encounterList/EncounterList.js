import { useState, useEffect } from "react";
import { getFromAPI } from "../../util/httpMethods";
import { BASE_URL, CONTEXT_PATIENTS, CONTEXT_ENCOUNTERS } from "../../util/constants";
import { Link } from "react-router-dom";
import EncounterListItem from "./EncounterListItem";
import styles from "../patientList/PatientList.module.css"
import FormButton from "../formButton/FormButton";

/**
 * @name EncounterList
 * @description Creates a list of all encounters that match a certain patient
 * @returns A table of all encounters that match a patient
 */
const EncounterList = (props) => {

    const { patientId, setServerError } = props;
    const [encounters, setEncounters] = useState([]);

    useEffect(() => {
        setServerError(false);
        getFromAPI((BASE_URL + CONTEXT_PATIENTS + "/" + patientId + CONTEXT_ENCOUNTERS))
            .then((data) => {
                setEncounters(data);
            })
            .catch(error => {
                setServerError(true);
            });
    }, [patientId]); //eslint-disable-line

    return (
        <div>
            <h2>Encounters</h2>
            <table className={styles.listContainer}>
                <thead>
                    <tr>
                        <th>Encounter ID</th>
                        <th>Visit Code</th>
                        <th>Provider</th>
                        <th>Date</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        encounters.length !== 0 ?
                            encounters.map(encounter => <EncounterListItem key={encounter.id} encounter={encounter} />)
                            : <td colSpan='5'>There are no encounters associated with this patient.</td>
                    }
                </tbody>
            </table>
            <Link to={`${CONTEXT_PATIENTS}/${patientId}${CONTEXT_ENCOUNTERS}/create`}>
                <FormButton>Create Encounter</FormButton>
            </Link>
        </div>
    );
}
export default EncounterList;