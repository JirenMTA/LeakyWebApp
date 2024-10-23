import axios from "../utils/axiosCustomize";

const getAddressByCoord = (coordinates) => {
    return axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=1d89ceef-3bdf-4e95-9ad8-cb9169d831cf&geocode=${coordinates[0]},${coordinates[1]}&format=json`);
}

const getCoordByAddress = (address) => {
    try {
        const response = axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=1d89ceef-3bdf-4e95-9ad8-cb9169d831cf&geocode=${address}&format=json`);
        return response;
    } catch (error) {
        return error;
    }
};


const getProducts = () => {
    try {
        const response = axios.get('http://localhost:8000/products');
        return response;
    } catch (error) {
        return error;
    }
};

const getDetailProducts = (id) => {
    try {
        const response = axios.get(`http://localhost:8000/products/${id}`);
        return response;
    } catch (error) {
        return error;
    }
};

const postLogin = (data) => {
    try {
        const response = axios.post(`http://localhost:8000/auth/sign_in`, data, { withCredentials: true });
        return response;
    } catch (error) {
        return error;
    }
}

const postSignup = (data) => {
    try {
        const response = axios.post(`http://localhost:8000/auth/sign_up`, data);
        return response;
    } catch (error) {
        return error;
    }
}


const postComment = (data) => {
    try {
        const response = axios.post(`http://localhost:8000/comments`, data);
        return response;
    } catch (error) {
        return error;
    }
}

export { getAddressByCoord, getCoordByAddress, getProducts, getDetailProducts, postLogin, postComment, postSignup }