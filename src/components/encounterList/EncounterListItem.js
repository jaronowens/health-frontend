import { Link } from "react-router-dom";
import { CONTEXT_PATIENTS, CONTEXT_ENCOUNTERS } from "../../util/constants";

const EncounterListItem = (props) => {

    const { encounter } = props;

    return (
        <tr>
            <td>{encounter.id}</td>
            <td>{encounter.visitCode}</td>
            <td>{encounter.provider}</td>
            <td>{encounter.date}</td>
            <td>
                <Link to={`${CONTEXT_PATIENTS}/${encounter.patientId}${CONTEXT_ENCOUNTERS}/${encounter.id}`}>
                    <button>View Details</button>
                </Link>
            </td>
        </tr>
    );
}
export default EncounterListItem;