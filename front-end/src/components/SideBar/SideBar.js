import { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
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
import RedeemIcon from '@mui/icons-material/Redeem';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { getLogOut } from '../../service/apiService';
import "./SideBar.scss"
import UserProfileComponent from '../User/UserProfileComponent';


const SideBar = (props) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const userState = useSelector(state => state.userState);
    const dispatch = useDispatch();
    const isMobile = useMediaQuery({ query: '(max-width: 1000px)' });
    const { colapseOnMobile, setColapseOnMobile } = props;
    const navigate = useNavigate();
    const listProductAddedToBasket = useSelector(state => state.orderListState.orderList);

    const handleUserLogout = async () => {
        await getLogOut();
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

    const handleClickProfileMobile = () => {
        setColapseOnMobile(true);
    }

    return (
        <>
            {!isMobile &&
                <>
                    <div className="side-bar-menu" style={{ position: "fixed" }}>
                        <Sidebar collapsed={isCollapsed} className="app">
                            <Menu>
                                <MenuItem className="menu1" icon={<MenuRoundedIcon />} onClick={handleToggle}>
                                    <h3> Dashboard</h3>
                                </MenuItem>
                                {userState.isAuthenticated && <UserProfileComponent user={userState?.account} collapse={isCollapsed}></UserProfileComponent>}

                                {
                                    userState?.account?.role === "admin" &&
                                    <>
                                        <MenuItem icon={<WorkOutlineIcon />} onClick={() => navigate('/admin/productmanager')}>
                                            Product manager
                                        </MenuItem>
                                        <MenuItem icon={<RedeemIcon />} onClick={() => navigate('/admin/promocodemanager')}>
                                            Promocode manager
                                        </MenuItem>
                                    </>
                                }

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
                        <div className="side-bar-menu" >
                            <Sidebar collapsed={false} className="app" style={{ position: "fixed" }}>
                                <Menu>
                                    {userState.isAuthenticated &&
                                        <div style={{ marginTop: "20xp" }} onClick={handleClickProfileMobile} >
                                            <UserProfileComponent user={userState?.account} collapse={false}></UserProfileComponent>
                                        </div>}
                                    <MenuItem icon={<GitHubIcon />} component={<Link to="https://github.com/JirenMTA/LeakyWebApp" />}> Our repository </MenuItem>
                                    {
                                        !userState.isAuthenticated ?
                                            <>
                                                <MenuItem icon={<LoginIcon />} component={<Link to="/login" />}> Login </MenuItem>
                                                <MenuItem icon={<BorderColorIcon />} component={<Link to="/login" />}> Signup </MenuItem>
                                            </> :
                                            <>
                                                <MenuItem
                                                    icon={
                                                        <div className="basket-icon-wrapper">
                                                            <ShoppingBasketIcon />
                                                            {listProductAddedToBasket && listProductAddedToBasket.length > 0 && (
                                                                <span className="basket-count">
                                                                    {listProductAddedToBasket.length}
                                                                </span>
                                                            )}
                                                        </div>
                                                    }
                                                    onClick={handleClickBasket}
                                                >
                                                    Basket
                                                </MenuItem>
                                                <MenuItem icon={<CheckIcon />} onClick={handleClickPurchased}>
                                                    Purchased
                                                </MenuItem>
                                                {
                                                    userState?.account?.role === "admin" &&
                                                    <>
                                                        <MenuItem icon={<WorkOutlineIcon />} onClick={() => { navigate('/admin/productmanager'); setColapseOnMobile(true) }}>
                                                            Product manager
                                                        </MenuItem>
                                                        <MenuItem icon={<RedeemIcon />} onClick={() => { navigate('/admin/promocodemanager'); setColapseOnMobile(true) }}>
                                                            Promocode manager
                                                        </MenuItem>
                                                    </>
                                                }
                                                <MenuItem icon={<LogoutRoundedIcon />} onClick={handleUserLogout}>
                                                    Logout
                                                </MenuItem>
                                            </>
                                    }
                                </Menu>
                            </Sidebar>
                        </div>
                        <div className="side-bar-menu" style={{ visibility: "hidden" }}>
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