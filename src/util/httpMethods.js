/**
 * Makes a GET fetch request of a given endpoint with the token provided.
 * @param {*} endpoint - the endpoint to be accessed
 * @param {*} token - a JWT to be appended to the headers.
 * @returns - the response from the API.
 * @throws - An error if the fetch request failed
 */
 const getFromAPI = async (endpoint, token) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    const result = fetch(endpoint, requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .catch(error => {
            throw new Error('Failed GET request');
        });

    return result;
}

/**
 * Makes a POST fetch request of a given endpoint with the token provided.
 * @param {*} data - JSON data to be placed in the body
 * @param {*} endpoint - the endpoint to be accessed
 * @param {*} token - a JWT to be appended to the headers
 * @returns - the response from the API.
 * @throws - An error if the fetch request failed
 */
const postToAPI = async (data, endpoint, token) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data),
    };

    const result = fetch(endpoint, requestOptions)
        .then(response => {
            if (response.ok) {
                return response;
            }
        })
        .catch(error => {
            throw new Error('Failed GET request');
        });
    return result;
}

/**
 * Makes a PUT fetch request of a given endpoint with the token provided.
 * @param {*} data - JSON data to be placed in the body
 * @param {*} endpoint - the endpoint to be accessed
 * @param {*} token - a JWT to be appended to the headers
 * @returns - the response from the API.
 * @throws - An error if the fetch request failed
 */
const updateToAPI = (data, endpoint, token) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(data),
    };

    const result = fetch(endpoint, requestOptions)
        .then(response => {
            if (response.ok) {
                return response;
            }
        })
        .catch(error => {
            throw new Error('Failed PUT request');
        });
    return result;
}

/**
 * Makes a DELETE fetch request of a given endpoint with the token provided.
 * @param {*} endpoint - the endpoint to be accessed
 * @param {*} token - a JWT to be appended to the headers.
 * @returns - the response from the API.
 * @throws - An error if the fetch request failed
 */
const deleteFromAPI = (endpoint, token) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: 'DELETE',
        headers: myHeaders
    };

    const result = fetch(endpoint, requestOptions)
        .then(response => {
            if (response.ok) {
                return response;
            }
        })
        .catch(error => {
            throw new Error('Failed DELETE request');
        });
    return result;
}

export { getFromAPI, postToAPI, updateToAPI, deleteFromAPI };