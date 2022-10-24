import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFromAPI, postToAPI, updateToAPI } from "../../util/httpMethods";
import { BASE_URL, CONTEXT_PATIENTS, CONTEXT_ENCOUNTERS } from "../../util/constants";
import Input from "../input/Input";
import Submit from "../submit/Submit";
import {
    skipField, isNotBlank, isValidEmail, isValidName,
    isValidSsn, isValidState, isValidZip, isPositive,
    isInteger
} from "../../util/validation";

const EncounterForm = (props) => {
    const { mode } = props;

    const param = useParams();
    const navigate = useNavigate();

    const defaultState = { value: '', error: false, errorMsg: '' };

    const [notes, setNotes] = useState({ ...defaultState });
    const [visitCode, setVisitCode] = useState({ ...defaultState });
    const [provider, setProvider] = useState({ ...defaultState });
    const [billingCode, setBillingCode] = useState({ ...defaultState });
    const [icd10, setIcd10] = useState({ ...defaultState });
    const [totalCost, setTotalCost] = useState({ ...defaultState });
    const [copay, setCopay] = useState({ ...defaultState });
    const [chiefComplaint, setChiefComplaint] = useState({ ...defaultState });
    const [pulse, setPulse] = useState({ ...defaultState });
    const [systolic, setSystolic] = useState({ ...defaultState });
    const [diastolic, setDiastolic] = useState({ ...defaultState });
    const [date, setDate] = useState({ ...defaultState });

    const handleChange = (event, object, stateHook) => {
        stateHook({ ...object, value: event.target.value, error: false, message: '' });
    }

    const setError = (field, hook, message) => {
        hook({ ...field, error: true, errorMsg: message });
    }

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

    const loadFields = (data) => {
        if (data.notes !== null) { setNotes({ ...notes, value: data.notes }) };
        setVisitCode({ ...visitCode, value: data.visitCode });
        setProvider({ ...provider, value: data.provider });
        setBillingCode({ ...billingCode, value: data.billingCode });
        setIcd10({ ...icd10, value: data.icd10 });
        setTotalCost({ ...totalCost, value: data.totalCost });
        setCopay({ ...copay, value: data.copay });
        setChiefComplaint({ ...chiefComplaint, value: data.chiefComplaint });
        if (data.pulse !== null) { setPulse({ ...pulse, value: data.pulse }) };
        if (data.systolic !== null) { setSystolic({ ...systolic, value: data.systolic }) };
        if (data.diastolic !== null) { setDiastolic({ ...diastolic, value: data.diastolic }) };
        setDate({ ...date, value: data.date });
    }

    useEffect(() => {
        if (mode === 'edit') {
            getFromAPI((BASE_URL + CONTEXT_PATIENTS + "/" + param.patientId + CONTEXT_ENCOUNTERS + "/" + param.id))
                .then((data) => {
                    loadFields(data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [param.id, param.patientId, mode]); // eslint-disable-line

    const validateForm = () => {
        let isValid = true;

        isValid = checkRequiredField(notes, setNotes, isValidName, isValid, 'First Name contains invalid characters');
        isValid = checkRequiredField(visitCode, setVisitCode, isValidName, isValid, 'Last Name contains invalid characters');
        isValid = checkRequiredField(provider, setProvider, isValidSsn, isValid, 'SSN must be in format XXX-XX-XXXX and cannot begin with 900-999');
        isValid = checkRequiredField(billingCode, setBillingCode, isValidEmail, isValid, 'Must be a valid email');
        isValid = checkRequiredField(icd10, setIcd10, skipField, isValid, '');
        isValid = checkRequiredField(totalCost, setTotalCost, skipField, isValid, '');
        isValid = checkRequiredField(copay, setCopay, isValidState, isValid, 'Must be one of the 50 US states');
        isValid = checkRequiredField(chiefComplaint, setChiefComplaint, isValidZip, isValid, 'Zip code must have the format XXXXX or XXXXX-XXXX');
        isValid = checkRequiredField(pulse, setPulse, isPositive, isValid, 'Must be a positive number');
        isValid = checkRequiredField(pulse, setPulse, isInteger, isValid, 'Must be rounded to the nearest whole number');
        isValid = checkRequiredField(systolic, setSystolic, isPositive, isValid, 'Must be a positive number');
        isValid = checkRequiredField(systolic, setSystolic, isInteger, isValid, 'Must be rounded to the nearest whole number');
        isValid = checkRequiredField(diastolic, setDiastolic, isPositive, isValid, 'Must be a positive number');
        isValid = checkRequiredField(diastolic, setDiastolic, isInteger, isValid, 'Must be rounded to the nearest whole number');
        isValid = checkRequiredField(date, setDate, skipField, isValid, '');

        return isValid;
    }

    const submitForm = (event) => {
        event.preventDefault();
        if (validateForm()) {
            let form = {
                firstName: notes.value,
                lastName: visitCode.value,
                ssn: provider.value,
                email: billingCode.value,
                street: icd10.value,
                city: totalCost.value,
                state: copay.value,
                postal: chiefComplaint.value,
                age: pulse.value,
                height: systolic.value,
                weight: diastolic.value,
                insurance: date.value
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
            <p>Encounter Form. Patient ID = {param.patientId}. {mode === 'edit' ? `Encounter ID = ${param.id}.` : <></>} Currently in {mode} mode.</p>
            <form onSubmit={submitForm}>
                <Input type='text' label="Notes:" obj={notes} onChange={e => handleChange(e, notes, setNotes)} />
                <Input type='text' label="Visit Code:" obj={visitCode} onChange={e => handleChange(e, visitCode, setVisitCode)} />
                <Input type='text' label="Provider:" obj={provider} onChange={e => handleChange(e, provider, setProvider)} />
                <Input type='text' label="Billing Code:" obj={billingCode} onChange={e => handleChange(e, billingCode, setBillingCode)} />
                <Input type='text' label="ICD10:" obj={icd10} onChange={e => handleChange(e, icd10, setIcd10)} />
                <Input type='text' label="Total Cost:" obj={totalCost} onChange={e => handleChange(e, totalCost, setTotalCost)} />
                <Input type='text' label="Co-pay:" obj={copay} onChange={e => handleChange(e, copay, setCopay)} />
                <Input type='text' label="Chief Complaint:" obj={chiefComplaint} onChange={e => handleChange(e, chiefComplaint, setChiefComplaint)} />
                <Input type='number' label="Pulse:" obj={pulse} onChange={e => handleChange(e, pulse, setPulse)} />
                <Input type='number' label="Systolic Pressure:" obj={systolic} onChange={e => handleChange(e, systolic, setSystolic)} />
                <Input type='number' label="Diastolic Pressure:" obj={diastolic} onChange={e => handleChange(e, diastolic, setDiastolic)} />
                <Input type='text' label="Date:" obj={date} onChange={e => handleChange(e, date, setDate)} />
                <Submit name={submitLabel} value={submitLabel} />
            </form>
        </div>
    );
}

export default EncounterForm;