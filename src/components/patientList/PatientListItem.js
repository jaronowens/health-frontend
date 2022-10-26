import { Link } from "react-router-dom";
import { BASE_URL, CONTEXT_PATIENTS } from "../../util/constants";
import { deleteFromAPI } from "../../util/httpMethods";

const PatientListItem = (props) => {

    const { patient, refresh, setRefresh, setServerError } = props;

    const onDelete = () => {
        setServerError(false);
        deleteFromAPI((BASE_URL + CONTEXT_PATIENTS + '/' + patient.id))
            .then((response => {
                if (response.status === 409) {
                    console.log('Email conflict');
                }
                console.log(response.status);
                if (response.ok) {
                    setRefresh(refresh + 1);
                }
            }))
            .catch(error => {
                setServerError(true);
            });
    }

    return (
        <tr>
            <td>{patient.firstName} {patient.lastName}</td>
            <td>{patient.age}</td>
            <td>{patient.gender}</td>
            <td><Link to={`${CONTEXT_PATIENTS}/${patient.id}`}><button>View Details</button></Link></td>
            <td><button onClick={onDelete}>Delete</button></td>
        </tr>
    );
}
export default PatientListItem;