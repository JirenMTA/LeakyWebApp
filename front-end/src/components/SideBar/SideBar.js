import { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu, SidebarProvider } from 'react-pro-sidebar';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Link } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useDispatch, useSelector } from 'react-redux';
import { doLogout } from '../../redux/action/userActions';
import { useMediaQuery } from 'react-responsive';
import LoginIcon from '@mui/icons-material/Login';
import BorderColorIcon from '@mui/icons-material/BorderColor';

const SideBar = (props) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const userState = useSelector(state => state.userState);
    const dispatch = useDispatch();
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const { colapseOnMobile, setColapseOnMobile } = props;

    const handleUserLogout = () => {
        dispatch(doLogout());
    }

    const handleToggle = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <>
            <div className="side-bar-menu" style={{ position: "fixed", collapsedWidth: "100px" }}>
                <Sidebar collapsed={isCollapsed} className="app">
                    <Menu>
                        <MenuItem className="menu1" icon={<MenuRoundedIcon />} onClick={handleToggle}>
                            <h3> Information</h3>
                        </MenuItem>
                        <MenuItem icon={<GitHubIcon />} component={<Link to="https://github.com/JirenMTA/LeakyWebApp" />}> Our repository </MenuItem>
                        {
                            isMobile && !userState.isAuthenticated &&
                            <>
                                <MenuItem icon={<LoginIcon />} component={<Link to="/login" />}> Login </MenuItem>
                                <MenuItem icon={<BorderColorIcon />} component={<Link to="/login" />}> Signup </MenuItem>
                            </>
                        }
                    </Menu>
                </Sidebar>
                {userState.isAuthenticated &&
                    <div className="menu-logout">
                        <Sidebar collapsed={isCollapsed}>
                            <Menu>
                                <MenuItem icon={<LogoutRoundedIcon />} onClick={handleUserLogout}>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Sidebar>
                    </div>
                }
            </div>
            <div className="side-bar-menu" style={{ visibility: "hidden" }}>
                <Sidebar collapsed={isCollapsed} className="app"  >
                </Sidebar>
            </div>
        </>

    );
};

export default SideBar;
