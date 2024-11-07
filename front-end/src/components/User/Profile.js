import UserProfileComponent from "./UserProfileComponent";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Profile = (props) => {
    const userState = useSelector(state => state.userState);
    if (!userState || !userState.isAuthenticated) {
        toast.error("Page not found");
        return <></>
    }
    return <div>
        <UserProfileComponent maxWidth="350px" user={userState.account} isEdit={true} />
    </div>
}

export default Profile;