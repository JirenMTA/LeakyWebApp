import UserProfileComponent from "./UserProfileComponent";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserById } from "../../service/apiService";
import { useEffect, useState } from "react";
import { doLogin } from "../../redux/action/userActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = (props) => {
    const dispatch = useDispatch();
    const userState = useSelector(state => state?.userState)
    const [balance, setBalance] = useState(0);
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

    return <div>
        <UserProfileComponent maxWidth="350px" user={{ ...userState?.account, balance }} isEdit={true} />
    </div>
}

export default Profile;