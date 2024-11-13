import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
    return axios.get(baseUrl).then((response) => response.data);
};

const create = (newObject) => {
    return axios.post(baseUrl, newObject).then((response) => response.data);
};

const deleteNumber = (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) {
        return Promise.reject('Deletion cancelled');
    }
    
    return axios.delete(`${baseUrl}/${id}`)
        .then(response => response.data);
};

const replaceNumber = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
        .then(response => response.data);
}

export default { getAll, create, deleteNumber, replaceNumber };