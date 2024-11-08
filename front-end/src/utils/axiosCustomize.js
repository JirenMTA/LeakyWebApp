import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true
});


instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log(error)
    return error;
});

export default instance;