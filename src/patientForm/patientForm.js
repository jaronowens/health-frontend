import { useParams } from "react-router-dom";

const PatientForm = (props) => {
    const { mode } = props;

    const param = useParams();

    return(<p>Patient Form. {mode === 'edit' ? `Patient ID = ${param.id}.` : <></>} Currently in {mode} mode.</p>);
}

export default PatientForm;