import { Link } from "react-router-dom";
import { CONTEXT_PATIENTS, CONTEXT_ENCOUNTERS } from "../../util/constants";

/**
 * @name EncounterListItem
 *  @description An individual table row listing an encounter
 * @returns an individual encounter entry, with a button to view more details
 */
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