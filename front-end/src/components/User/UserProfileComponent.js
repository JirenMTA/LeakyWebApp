import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { getImageByName } from '../../service/apiService';
import ModalUpdateUser from './ModalUpdateUser';
import { useSelector } from 'react-redux';
import defaultAvartar from '../../assets/avatar/default.jpg'
import './UserProfileComponent.scss';

const UserProfileComponent = (props) => {
    const { collapse, user, maxWidth, isEdit } = props;
    const navigate = useNavigate();
    const userState = useSelector(state => state?.userState);
    const [show, setShow] = useState(false);
    const [avatar, setAvatar] = useState(null);


    useEffect(() => {
        if (userState?.account?.avatar) {
            setAvatar(getImageByName(userState?.account?.avatar, 'avatar'));
        }
        else {
            setAvatar(defaultAvartar);
        }
    }, [userState])
    // const getAvatarUser = () => {
    //     console.log(getImageByName(userState?.account?.avatar, 'avatar'))
    //     if (userState?.account?.avatar)
    //         return getImageByName(userState?.account?.avatar, 'avatar')
    //     else
    //         return defaultAvartar
    // }

    return (
        <div className="user-profile">
            <div className="avatar-container">
                <img
                    src={avatar}
                    alt="User Avatar"
                    className={`avatar ${collapse ? 'small-avatar' : ''}`}
                    onClick={() => { navigate("/profile") }}
                />
            </div>
            {!collapse && !isEdit &&
                <div className="user-info">
                    <h2 style={{ maxWidth: maxWidth }}>{userState?.account?.username}</h2>
                </div>
            }

            {isEdit && <>
                <div className="user-info">
                    <h2 style={{ maxWidth: maxWidth }}>{user?.username}</h2>
                    <p>Email: <strong>{user?.email}</strong></p>
                    <p>Role: <strong>{user?.role}</strong></p>
                    <p>Balance: ₽{user?.balance}</p>
                </div>
                <BorderColorIcon className="edit-icon" onClick={() => setShow(true)} />
                <ModalUpdateUser show={show} setShow={setShow} />
            </>
            }
        </div>
    );
};

export default UserProfileComponent;
