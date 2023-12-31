import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFromAPI, postToAPI, updateToAPI } from "../../util/httpMethods";
import { BASE_URL, CONTEXT_PATIENTS } from "../../util/constants";
import Input from "../input/Input";
import Submit from "../submit/Submit";
import {
    skipField, isNotBlank, isValidEmail, isValidName,
    isValidSsn, isValidState, isValidZip, isPositive,
    isInteger, isValidGender
} from "../../util/validation";

/**
 * Form for creating or editing patient data. 
 * @param {*} mode - Sets the form to either 'create' or 'edit' mode, which changes the behavior of the form.
 * @returns a form that lists all required fields (and loads an existing object from the server if in 'edit' mode).
 */
const PatientForm = (props) => {
    const { mode, setServerError } = props;

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

    const [name, setName] = useState('');

    /**
     * Event handler for controlled input changes.
     * @param {Event} event - the event that triggered the handler
     * @param {object} object - the field to manipulate
     * @param {function} stateHook - the useState hook to change the value of the field
     */
    const handleChange = (event, object, stateHook) => {
        stateHook({ ...object, value: event.target.value, error: false, message: '' });
    }

    /**
     * Sets an error message in the designated field
     * @param {object} field - the field to set
     * @param {function} hook - the useState hook to change the field's value
     * @param {string} message - the error message to display
     */
    const setError = (field, hook, message) => {
        hook({ ...field, error: true, errorMsg: message });
    }

    /**
     * Checks required fields to first make sure they are not blank, and then performs a follow-up validation check
     * @param {object} field - the field to set
     * @param {function} hook - the useState hook to change the field's value
     * @param {function} check - the validation check to complete
     * @param {boolean} isValid - the current state of all previous validation checks
     * @param {string} errorMsg - the message to set if the validation check fails
     * @returns true if the tests pass, false otherwise
     */
    const checkRequiredField = (field, hook, check, isValid, errorMsg) => {
        if (isNotBlank(field.value)) {
            if (!check(field.value)) {
                setError(field, hook, errorMsg);
                return false;
            }
        } else {
            setError(field, hook, 'Field cannot be blank');
            return false;
        }
        return isValid;
    }

    /**
     * Loads data from the API into state variables.
     * @param {object} data - an encounter object from the API
     */
    const loadFields = (data) => {
        setFirstName({ ...firstName, value: data.firstName });
        setLastName({ ...lastName, value: data.lastName });
        setSsn({ ...ssn, value: data.ssn });
        setEmail({ ...email, value: data.email });
        setStreet({ ...street, value: data.street });
        setCity({ ...city, value: data.city });
        setState({ ...state, value: data.state });
        setPostal({ ...postal, value: data.postal });
        setAge({ ...age, value: data.age });
        setHeight({ ...height, value: data.height });
        setWeight({ ...weight, value: data.weight });
        setInsurance({ ...insurance, value: data.insurance });
        setGender({ ...gender, value: data.gender });
        setName(`${data.lastName}, ${data.firstName}`);
    }

    useEffect(() => {
        if (mode === 'edit') {
            setServerError(false);
            getFromAPI((BASE_URL + CONTEXT_PATIENTS + "/" + param.id))
                .then((data) => {
                    loadFields(data);
                })
                .catch(error => {
                    setServerError(true);
                });
        }
    }, [param.id, mode]); // eslint-disable-line

    /**
     * Hub function that runs all required validation checks.
     * @returns a boolean that represents hether or not all validation checks passed
     */
    const validateForm = () => {
        let isValid = true;

        isValid = checkRequiredField(firstName, setFirstName, isValidName, isValid, 'First Name contains invalid characters');
        isValid = checkRequiredField(lastName, setLastName, isValidName, isValid, 'Last Name contains invalid characters');
        isValid = checkRequiredField(ssn, setSsn, isValidSsn, isValid, 'SSN must be in format XXX-XX-XXXX and cannot begin with 900-999');
        isValid = checkRequiredField(email, setEmail, isValidEmail, isValid, 'Must be a valid email');
        isValid = checkRequiredField(street, setStreet, skipField, isValid, '');
        isValid = checkRequiredField(city, setCity, skipField, isValid, '');
        isValid = checkRequiredField(state, setState, isValidState, isValid, 'Must be one of the 50 US states');
        isValid = checkRequiredField(postal, setPostal, isValidZip, isValid, 'Zip code must have the format XXXXX or XXXXX-XXXX');
        isValid = checkRequiredField(age, setAge, isPositive, isValid, 'Must be a positive number');
        isValid = checkRequiredField(age, setAge, isInteger, isValid, 'Must be rounded to the nearest whole number');
        isValid = checkRequiredField(height, setHeight, isPositive, isValid, 'Must be a positive number');
        isValid = checkRequiredField(height, setHeight, isInteger, isValid, 'Must be rounded to the nearest whole number');
        isValid = checkRequiredField(weight, setWeight, isPositive, isValid, 'Must be a positive number');
        isValid = checkRequiredField(weight, setWeight, isInteger, isValid, 'Must be rounded to the nearest whole number');
        isValid = checkRequiredField(insurance, setInsurance, skipField, isValid, '');
        isValid = checkRequiredField(gender, setGender, isValidGender, isValid, 'Valid genders are "Male", "Female", or "Other"');

        return isValid;
    }

    /**
     * Event handler function that striggers on form submission.
     * Validates form, and if the validation passes, packages and submits to the API based on form mode.
     * @param {Event} event 
     */
    const submitForm = (event) => {
        event.preventDefault();
        if (validateForm()) {
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
            setServerError(false);
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
                            setServerError(true);
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
                            setServerError(true);
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
            <h2>{mode === 'edit' ? `Edit Patient:  ${name}` : 'Create Patient'}</h2>
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