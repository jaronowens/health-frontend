import { Link } from "react-router-dom";
import { CONTEXT_PATIENTS } from "../../util/constants";

const PatientListItem = (props) => {

    const { patient } = props;

    return (
        <tr>
            <td>{patient.firstName} {patient.lastName}</td>
            <td>{patient.age}</td>
            <td>{patient.gender}</td>
            <td><Link to={`${CONTEXT_PATIENTS}/${patient.id}`}><button>View Details</button></Link></td>
            <td><button>Delete</button></td>
        </tr>
    );
}
export default PatientListItem;