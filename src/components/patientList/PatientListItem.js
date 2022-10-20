const PatientListItem = (props) => {

    const { patient } = props;

    return (
        <tr>
            <td>{patient.firstName} {patient.lastName}</td>
            <td>{patient.age}</td>
            <td>{patient.gender}</td>
            <td><button>View Details</button></td>
            <td><button>Delete</button></td>
        </tr>
    );
}
export default PatientListItem;