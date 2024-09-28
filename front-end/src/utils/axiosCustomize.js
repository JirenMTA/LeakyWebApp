import axios from "axios";

const instance = axios.create();


instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log(error)
    return error;
});

export default instance;