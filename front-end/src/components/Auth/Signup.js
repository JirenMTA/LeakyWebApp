import { useState } from "react";
import "./Signup.scss"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { postSignup } from "../../service/apiService";

const Signup = (props) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('string');
    const [email, setEmail] = useState('user@example.com');
    const [password, setPassword] = useState('string');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState('string');

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleBackToHomepage = (event) => {
        navigate('/');
    }
    const handleSubmitSignup = async (event) => {
        if (!validateEmail(email)) {
            toast.error("Invalid email");
            return;
        }
        if (password !== passwordConfirm) {
            toast.error("Password is not the same!")
            return;
        }
        const res = await postSignup({ username, email, password });
        if (res.data.status === 'Ok') {
            navigate('/login')
            toast.success("Successfully Signup to JuiceShop")
        }
        else {
            toast.error("Something went wrong...Please try again!")
        }
    }

    return <div className="signup-container">
        <div className='title col-4'>
            Electronic Shop
        </div>
        <div className='welcome col-4'>
            Hello, who is this?
        </div>
        <div className='content-form col-4 mx-auto'>
            <div className='form-group'>
                <label>Username</label>
                <input type='username' value={username} className="form-control" onChange={(event) => setUsername(event.target.value)}></input>
                <label>Email</label>
                <input type='email' value={email} className="form-control" onChange={(event) => setEmail(event.target.value)}></input>
            </div>
            <div className='form-group'>
                <label>Password</label>
                <div className="input-wrapper">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        className="form-control"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <span className="icon" onClick={togglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </span>
                </div>
            </div>

            <div className='form-group'>
                <label>Password confirm</label>
                <div className="input-wrapper">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={passwordConfirm}
                        className="form-control"
                        onChange={(event) => setPasswordConfirm(event.target.value)}
                    />
                    <span className="icon" onClick={togglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </span>
                </div>
            </div>

            <button className='btn-submit' onClick={handleSubmitSignup}>Sign up to Electronic Shop</button>
            <span className='back' onClick={(event) => handleBackToHomepage(event)}>Go to Homepage</span>
        </div>
    </div>
}

export default Signup;