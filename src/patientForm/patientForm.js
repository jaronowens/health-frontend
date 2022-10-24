import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFromAPI, postToAPI, updateToAPI } from "../util/httpMethods";
import { BASE_URL, CONTEXT_PATIENTS } from "../util/constants";
import Input from "../components/input/Input";
import Submit from "../components/submit/Submit";

const PatientForm = (props) => {
    const { mode } = props;

    const param = useParams();
    const navigate = useNavigate();

    const defaultState = { value: '', error: false, errorMsg: '' };

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

    const loadFields = (data) => {
        setFirstName({...firstName, value: data.firstName});
        setLastName({...lastName, value: data.lastName});
        setSsn({...ssn, value: data.ssn});
        setEmail({...email, value: data.email});
        setStreet({...street, value: data.street});
        setCity({...city, value: data.city});
        setState({...state, value: data.state});
        setPostal({...postal, value: data.postal});
        setAge({...age, value: data.age});
        setHeight({...height, value: data.height});
        setWeight({...weight, value: data.weight});
        setInsurance({...insurance, value: data.insurance});
        setGender({...gender, value: data.gender});
    }

    useEffect(() => {
        if (mode === 'edit') {
            getFromAPI((BASE_URL + CONTEXT_PATIENTS + "/" + param.id))
                .then((data) => {
                    loadFields(data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [param.id, mode]);

    const submitForm = (event) => {
        event.preventDefault();
        if (true) {
            let form = {
                firstName: firstName.value,
                lastName: lastName.value,
                ssn: ssn.value,
                email: email.value,
                street: street.value,
                city: city.value,
                state: state.value,
                postal: postal.value,
                age: age.value,
                height: height.value,
                weight: weight.value,
                insurance: insurance.value,
                gender: gender.value
            };
            switch (mode) {
                case 'edit':
                    form = { ...form, id: param.id };
                    updateToAPI(form, (BASE_URL + CONTEXT_PATIENTS + "/" + param.id))
                        .then((response) => {
                            if (response.ok) {
                                navigate('..' + CONTEXT_PATIENTS + '/' + param.id);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    break;
                case 'create':
                    postToAPI(form, (BASE_URL + CONTEXT_PATIENTS))
                        .then((response) => {
                            if (response.ok) {
                                navigate('/');
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    break;
                default:
                    break;
            }
        }
    }

    const submitLabel = mode === 'edit' ? 'Edit' : 'Create';

    return (
        <div>
            <p>Patient Form. {mode === 'edit' ? `Patient ID = ${param.id}.` : <></>} Currently in {mode} mode.</p>
            <form onSubmit={submitForm}>
                <Input type='text' label="First Name:" obj={firstName} onChange={e => handleChange(e, firstName, setFirstName)} />
                <Input type='text' label="Last Name:" obj={lastName} onChange={e => handleChange(e, lastName, setLastName)} />
                <Input type='text' label="SSN:" obj={ssn} onChange={e => handleChange(e, ssn, setSsn)} />
                <Input type='text' label="Email:" obj={email} onChange={e => handleChange(e, email, setEmail)} />
                <Input type='text' label="Street:" obj={street} onChange={e => handleChange(e, street, setStreet)} />
                <Input type='text' label="City:" obj={city} onChange={e => handleChange(e, city, setCity)} />
                <Input type='text' label="State:" obj={state} onChange={e => handleChange(e, state, setState)} />
                <Input type='text' label="ZIP:" obj={postal} onChange={e => handleChange(e, postal, setPostal)} />
                <Input type='number' label="Age:" obj={age} onChange={e => handleChange(e, age, setAge)} />
                <Input type='number' label="Height:" obj={height} onChange={e => handleChange(e, height, setHeight)} />
                <Input type='number' label="Weight:" obj={weight} onChange={e => handleChange(e, weight, setWeight)} />
                <Input type='text' label="Insurance:" obj={insurance} onChange={e => handleChange(e, insurance, setInsurance)} />
                <Input type='text' label="Gender:" obj={gender} onChange={e => handleChange(e, gender, setGender)} />
                <Submit name={submitLabel} value={submitLabel} />
            </form>
        </div>
    );
}

export default PatientForm;