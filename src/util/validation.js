//helper validation functions, stored in a specific place for reference across any components that need them

export const isNotBlank = (value) => {
    return (value !== '');
}

export const isValidName = (name) => {
    return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name);
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