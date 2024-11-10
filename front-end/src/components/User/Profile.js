import UserProfileComponent from "./UserProfileComponent";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserById } from "../../service/apiService";
import { useEffect, useState } from "react";
import { doLogin } from "../../redux/action/userActions";
import { useDispatch } from "react-redux";

const Profile = (props) => {
    const dispatch = useDispatch();
    const userState = useSelector(state => state?.userState)
    const [balance, setBalance] = useState(0);

    const fetchMyInformation = async () => {
        const information = await getUserById(userState?.account?.id);
        setBalance(information?.data?.balance);
        dispatch(doLogin({
            account: {
                username: information?.data?.username,
                email: information?.data?.email,
                role: 'admin',
                avatar: information?.data?.avatar
            },
            isAuthenticated: true
        }));
    }

    useEffect(() => {
        fetchMyInformation();
    }, []);


    if (!userState || !userState.isAuthenticated) {
        toast.error("Page not found");
        return <></>
    }

    return <div>
        <UserProfileComponent maxWidth="350px" user={{ ...userState?.account, balance }} isEdit={true} />
    </div>
}

export default Profile;