import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFromAPI } from "../util/httpMethods";
import { BASE_URL, CONTEXT_PATIENTS } from "../util/constants";

const PatientForm = (props) => {
    const { mode } = props;

    const param = useParams();
    const [patient, setPatient] = useState({});

    const defaultState = { value: '', error: 'false', message: '' };

    // and now it is time for a million useState hooks
    const [firstName, setFirstName] = useState({ ...defaultState });
    const [lastName, setLastName] = useState({ ...defaultState });
    const [ssn, setSsn] = useState({ ...defaultState });
    const [email, setEmail] = useState({ ...defaultState });
    const [street, setStreet] = useState({ ...defaultState });
    const [city, setCity] = useState({ ...defaultState });
    const [state, setState] = useState({ ...defaultState });
    const [postal, setPostal] = useState({ ...defaultState });
    const [age, setAge] = useState({ ...defaultState });
    const [height, setHeight] = useState({ ...defaultState });
    const [weight, setWeight] = useState({ ...defaultState });
    const [insurance, setInsurance] = useState({ ...defaultState });
    const [gender, setGender] = useState({ ...defaultState });
    // end million useState hooks

    const handleChange = (event, object, stateHook) => {
        stateHook({ ...object, value: event.target.value, error: false, message: '' });
    }

    useEffect(() => {
        if (mode === 'edit') {
            getFromAPI((BASE_URL + CONTEXT_PATIENTS + "/" + param.id))
                .then((data) => {
                    setPatient(data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [param.id, mode]);

    return (
        <div>
            <p>Patient Form. {mode === 'edit' ? `Patient ID = ${param.id}.` : <></>} Currently in {mode} mode.</p>
        </div>
    );
}

export default PatientForm;