import React from 'react';
import { useNavigate } from "react-router-dom";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import avatar from "../../assets/avatar/goku.png"
import xss from "../../assets/avatar/test.svg"
import { toast } from "react-toastify";
import './UserProfileComponent.scss';

const UserProfileComponent = (props) => {
    const { collapse, user, maxWidth, isEdit } = props;
    const navigate = useNavigate();

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
                    <h2 style={{ maxWidth: maxWidth }}>Profile</h2>
                </div>
            }

            {isEdit && <>
                <div className="user-info">
                    <h2 style={{ maxWidth: maxWidth }}>{user?.username}</h2>
                    <p>Role: <strong>{user?.role}</strong></p>
                    <p>Balance: ${user?.balance?.toFixed(2)}</p>
                </div>
                <BorderColorIcon className="edit-icon" />
            </>
            }
        </div>
    );
};

export default UserProfileComponent;
