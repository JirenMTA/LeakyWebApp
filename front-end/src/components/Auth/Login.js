import { useState } from "react";
import "./Login.scss"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userActions";
import { getUserById, post_otp_submit, postLogin } from "../../service/apiService";
import ModalOTP from "./ModalOTP";
import { post_qr_code_setup } from '../../service/apiService';

const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('user@example.com');
    const [password, setPassword] = useState('string');
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(0);
    const [otpCode, setOtpCode] = useState('');

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleBackToHomepage = (event) => {
        navigate('/');
    }

    const fetchLogin = async () => {
        let data = await postLogin({ email, password });
        return data;
    }

    const handleOTPSubmit = async () => {
        const res = await post_otp_submit(otpCode);
        if (!(res?.data && res?.data?.status === "Ok")) {
            toast.error("Invalid code");
            return
        }
        const information = await getUserById(res?.data?.id);
        dispatch(doLogin({
            account: {
                username: information?.data?.username,
                email: information?.data?.email,
                id: res?.data?.id,
                role: information?.data?.role?.name,
                avatar: information?.data?.avatar,
                has2Fa: true
            },
            isAuthenticated: true
        }));
        setOpenModal(0);
        navigate("/");
        toast.success("Successfully login to ElectronicShop")
    };

    const handleSubmitLogin = async (event) => {

        if (!validateEmail(email)) {
            toast.error("Invalid email");
            return;
        }

        const res = await fetchLogin();
        if (res?.data?.status != "Ok") {
            toast.error("Wrong email or password");
            return;
        }
        else if (res?.data?.second_factor_required) {
            setOpenModal(1);
            return;
        }
        const information = await getUserById(res?.data?.id);
        dispatch(doLogin({
            account: {
                username: information?.data?.username,
                email: information?.data?.email,
                id: res?.data?.id,
                role: information?.data?.role?.name,
                avatar: information?.data?.avatar,
                has2Fa: false
            },
            isAuthenticated: true
        }));

        navigate("/");
        toast.success("Successfully login to ElectronicShop")
    }

    return <div className="login-container">
        <div className='header'>
            <div>Don't have account yet?</div>
            <button onClick={() => navigate('/signup')}>Sign up</button>
        </div>
        <div className='title col-4'>
            Electronic Shop
        </div>
        <div className='welcome col-4'>
            Hello, who is this?
        </div>
        <div className='content-form col-4 mx-auto'>
            <div className='form-group'>
                <label>Email</label>
                <input type='email' value={email} className="form-control" onChange={(event) => setEmail(event.target.value)}></input>
            </div>
            <div className='form-group'>
                <label>Password</label>
                <input type='password' value={password} className="form-control" onChange={(event) => setPassword(event.target.value)}></input>
            </div>

            <span className='forgot-password'>Forgot password?</span>
            <button className='btn-submit' onClick={handleSubmitLogin}>Login to Juice Shop</button>
            <span className='back' onClick={(event) => handleBackToHomepage(event)}>Go to Homepage</span>
            <ModalOTP
                openModal={openModal}
                setOpenModal={setOpenModal}
                otpCode={otpCode}
                setOtpCode={setOtpCode}
                handleOTPSubmit={handleOTPSubmit}
            ></ModalOTP>
        </div>
    </div>
}

export default Login;