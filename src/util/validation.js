//helper validation functions, stored in a specific place for reference across any components that need them

export const isNotBlank = (value) => {
    return (value !== '');
}

export const isValidName = (name) => {
    return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name);
}

export const isValidSsn = (ssn) => {
    return /^(?!0{3})(?!6{3})[0-8]\d{2}-(?!0{2})\d{2}-(?!0{4})\d{4}$/.test(ssn);
}

export const isValidState = (state) => {
    return /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/.test(state);
}

export const isValidZip = (zip) => {
    return /^\d{5}(-\d{4})?$/.test(zip);
}

export const isValidGender = (gender) => {
    return (gender === 'Male' || gender === 'Female' || gender === 'Other');
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
 * tests if a string is a valid date (mm-dd-yyyy)
 * @param {string} date 
 * @returns - true or false
 */
export const isValidDate = (date) => {
    return /^(0[1-9]|1[012])[- .](0[1-9]|[12][0-9]|3[01])[- .](19|20)\d\d$/.test(date);
}

/**
 * tests if a number is greated than zero
 * @param {number} number 
 * @returns 
 */
export const isPositive = (number) => {
    return number > 0;
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
 * tests if a value is three characters or more
 * @param {*} value 
 * @returns 
 */
export const isThreeCharacters = (value) => {
    return /^.{3,}$/.test(value)
}

export const skipField = (value) => {
    return true;
}