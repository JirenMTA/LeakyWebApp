import { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu, SidebarProvider } from 'react-pro-sidebar';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Link, useNavigate } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useDispatch, useSelector } from 'react-redux';
import { doLogout } from '../../redux/action/userActions';
import { useMediaQuery } from 'react-responsive';
import LoginIcon from '@mui/icons-material/Login';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import CheckIcon from '@mui/icons-material/Check';

const SideBar = (props) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const userState = useSelector(state => state.userState);
    const dispatch = useDispatch();
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const { colapseOnMobile, setColapseOnMobile } = props;
    const navigate = useNavigate();

    const handleUserLogout = () => {
        dispatch(doLogout());
    }

    const handleToggle = () => {
        setIsCollapsed(!isCollapsed);
    };


    // Only for mobile
    const handleClickPurchased = () => {
        navigate("/purchased");
        setColapseOnMobile(true);
    }
    const handleClickBasket = () => {
        navigate("/basket");
        setColapseOnMobile(true);
    }

    return (
        <>
            {!isMobile &&
                <>
                    <div className="side-bar-menu" style={{ position: "fixed" }}>
                        <Sidebar collapsed={isCollapsed} className="app" style={{ height: "100%" }}>
                            <Menu>
                                <MenuItem className="menu1" icon={<MenuRoundedIcon />} onClick={handleToggle}>
                                    <h3> Information</h3>
                                </MenuItem>
                                <MenuItem icon={<GitHubIcon />} component={<Link to="https://github.com/JirenMTA/LeakyWebApp" />}> Our repository </MenuItem>
                                {userState.isAuthenticated &&
                                    <MenuItem icon={<LogoutRoundedIcon />} onClick={handleUserLogout}>
                                        Logout
                                    </MenuItem>
                                }
                            </Menu>
                        </Sidebar>
                    </div>
                    <div className="side-bar-menu" style={{ visibility: "hidden" }}>
                        <Sidebar collapsed={isCollapsed} className="app"  >
                        </Sidebar>
                    </div>
                </>
            }
            <>
                {
                    isMobile && !colapseOnMobile &&
                    <>
                        <Sidebar collapsed={false} className="app" style={{ width: "100vw", position: "fixed" }}>
                            <Menu>
                                <MenuItem icon={<GitHubIcon />} component={<Link to="https://github.com/JirenMTA/LeakyWebApp" />}> Our repository </MenuItem>
                                {
                                    !userState.isAuthenticated ?
                                        <>
                                            <MenuItem icon={<LoginIcon />} component={<Link to="/login" />}> Login </MenuItem>
                                            <MenuItem icon={<BorderColorIcon />} component={<Link to="/login" />}> Signup </MenuItem>
                                        </> :
                                        <>
                                            <MenuItem icon={<ShoppingBasketIcon />} onClick={handleClickBasket}>
                                                Basket
                                            </MenuItem>
                                            <MenuItem icon={<CheckIcon />} onClick={handleClickPurchased}>
                                                Purchased
                                            </MenuItem>
                                            <MenuItem icon={<LogoutRoundedIcon />} onClick={handleUserLogout}>
                                                Logout
                                            </MenuItem>
                                        </>
                                }
                            </Menu>
                        </Sidebar>
                        <div className="side-bar-menu" style={{ width: "100vw", visibility: "hidden" }}>
                            <Sidebar collapsed={false} className="app"  >
                            </Sidebar>
                        </div>
                    </>
                }

            </>
        </>

    );
};

export default SideBar;
