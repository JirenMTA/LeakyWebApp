import UserProfileComponent from "./UserProfileComponent";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserById } from "../../service/apiService";
import { useEffect, useState } from "react";
import { doLogin } from "../../redux/action/userActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import shield from '../../assets/2fa/shield.png'
import TwoFAModal from "./TwoFAModal";
import "./Profile.scss"


const Profile = (props) => {
    const dispatch = useDispatch();
    const userState = useSelector(state => state?.userState)
    const [balance, setBalance] = useState(0);
    const [openModal, setOpenModal] = useState(0);
    const navigate = useNavigate();

    const fetchMyInformation = async () => {
        const information = await getUserById(userState?.account?.id);
        setBalance(information?.data?.balance);
        dispatch(doLogin({
            account: {
                username: information?.data?.username,
                email: information?.data?.email,
                avatar: information?.data?.avatar
            },
            isAuthenticated: information?.isAuthenticated
        }));
    }

    useEffect(() => {
        fetchMyInformation();
    }, []);


    if (!userState || !userState.isAuthenticated) {
        navigate("/");
    }

    return <div className="profile-container">
        <div className="two-fa-container">
            {userState?.account?.has2Fa ?
                <>
                    <div>Your account is now protected by 2FA</div>
                    <img src={shield} style={{ width: "120px", height: "auto" }}></img>
                </>
                :
                <>
                    <div>Your account is not setting 2FA</div>
                    <Button onClick={() => { setOpenModal(1) }}>SET UP 2FA</Button>
                </>
            }
        </div>
        <TwoFAModal openModal={openModal} setOpenModal={setOpenModal}></TwoFAModal>
        <UserProfileComponent user={{ ...userState?.account, balance }} isEdit={true} fullWidth={true} />
    </div>
}

export default Profile;