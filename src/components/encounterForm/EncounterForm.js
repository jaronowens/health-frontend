import { useParams } from "react-router-dom";

const EncounterForm = (props) => {
    const { mode } = props;

    const param = useParams();

    return(<p>Encounter Form. Patient ID = {param.patientId}. {mode === 'edit' ? `Encounter ID = ${param.id}.` : <></>} Currently in {mode} mode.</p>);
}

export default EncounterForm;