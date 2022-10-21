

const PatientDetails = (props) => {

    const { patient } = props;

    return (
        <div>
        <p>Patient ID: {patient.id}</p>
        <p>First Name: {patient.firstName}</p>
        <p>Last Name: {patient.lastName}</p>
        <p>SSN: {patient.ssn}</p>
        <p>Email: {patient.email}</p>
        <p>Street: {patient.street}</p>
        <p>City: {patient.city}</p>
        <p>State: {patient.state}</p>
        <p>ZIP: {patient.postal}</p>
        <p>Age: {patient.age}</p>
        <p>Height: {patient.height}</p>
        <p>Weight: {patient.weight}</p>
        <p>Insurance: {patient.insurance}</p>
        <p>Gender: {patient.gender}</p>
        </div>
    );
}

export default PatientDetails;