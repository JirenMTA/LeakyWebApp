import axios from "axios";
import { toast } from "react-toastify";
import { doLogout } from "../redux/action/userActions";

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true
});

const setupAxiosInterceptors = (navigate, dispatch) => {
    instance.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            if (error.response && error.response.status === 403) {
                dispatch(doLogout());
                toast.error("403 Forbidden - Redirecting to login page");
                navigate('/login');
            }
            else if (error.response && error.response.status === 401) {
                dispatch(doLogout());
                toast.error("Unauthorized - Redirecting to login page");
                navigate('/login');
            }
            return Promise.reject(error);
        }
    );
};

export { instance, setupAxiosInterceptors };
