//helper validation functions, stored in a specific place for reference across any components that need them

/**
 * tests whether a string is an empty string
 * @param {string} value 
 * @returns true/false
 */
export const isNotBlank = (value) => {
    return (value !== '');
}

/**
 * tests whether a string is a valid name (A-Z, apostrophes, hyphens)
 * @param {string} name 
 * @returns true/false
 */
export const isValidName = (name) => {
    return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name);
}

/**
 * tests whether a string is a valid SSN (123-45-789, cannot start with 900-999)
 * @param {string} ssn 
 * @returns true/false
 */
export const isValidSsn = (ssn) => {
    return /^(?!0{3})(?!6{3})[0-8]\d{2}-(?!0{2})\d{2}-(?!0{4})\d{4}$/.test(ssn);
}

/**
 * Tests whether a string is one of the 50 valid US states
 * @param {string} state 
 * @returns true/false
 */
export const isValidState = (state) => {
    return /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/.test(state);
}

/**
 * tests whether a string is valid zip (XXXXX or XXXXX-XXXX)
 * @param {string} zip 
 * @returns 
 */
export const isValidZip = (zip) => {
    return /^\d{5}(-\d{4})?$/.test(zip);
}

/**
 * Tests whether a string is a valid gender (based on the constraints of this assignment)
 * @param {string} gender 
 * @returns 
 */
export const isValidGender = (gender) => {
    return (gender === 'Male' || gender === 'Female' || gender === 'Other');
}

/**
 * tests whether a string is a valid billing code (123-456-789-00)
 * @param {string} billingCode 
 * @returns 
 */
export const isValidBillingCode = (billingCode) => {
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(billingCode);
}

/**
 * tests whether a string is a valid visit code (LDL DLD)
 * @param {string} visitCode 
 * @returns 
 */
export const isValidVisitCode = (visitCode) => {
    return /^[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$/.test(visitCode);
}

/**
 * tests whether a string is a valid ICD10 (LDD for the purposes of this assignment)
 * @param {string} icd10 
 * @returns 
 */
export const isValidIcd10 = (icd10) => {
    return /^[A-Z][0-9][0-9]$/.test(icd10);
}

/**
 * tests if a string is a valid email (x@x.x)
 * @param {string} email 
 * @returns true or false
 */
export const isValidEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
}

/**
 * tests if a string is a valid date (yyyy-mm-dd)
 * @param {string} date 
 * @returns - true or false
 */
export const isValidDate = (date) => {
    return /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/.test(date);
}

/**
 * tests if a number is greater than zero
 * @param {number} number 
 * @returns 
 */
export const isPositive = (number) => {
    return number >= 0;
}

/**
 * tests if a number is an integer
 * @param {number} number 
 * @returns 
 */
export const isInteger = (number) => {
    return Number.isInteger(Number(number));
}

/**
 * filler validation check that always returns true. Used to skip checking a field
 * @param {*} value 
 * @returns true
 */
export const skipField = (value) => {
    return true;
}