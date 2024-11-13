import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import CheckIcon from '@mui/icons-material/Check';
import { doLogout } from '../../redux/action/userActions';
import { useMediaQuery } from 'react-responsive';
import logo from "../../assets/logo/logo.png";
import "./Header.scss";
import { getLogOut } from '../../service/apiService';

const Header = (props) => {
    const navigate = useNavigate();
    const listProductAddedToBasket = useSelector(state => state.listCartState.orderList);
    const listOrderCount = useSelector(state => state.listOrderState.numberOrder);
    const userState = useSelector(state => state.userState);
    const dispatch = useDispatch();
    const { colapseOnMobile, setColapseOnMobile } = props
    const isMobile = useMediaQuery({ query: '(max-width: 1000px)' });

    const handleUserLogout = async () => {
        await getLogOut();
        dispatch(doLogout());
        navigate("/");
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary" style={{ height: "70px" }}>
            <Container>
                <div className='logo-header'>
                    <img src={logo} onClick={() => navigate("/")} alt="logo" />
                </div>
                <NavLink to='/' className='navbar-brand'>Electronic Shop</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => { setColapseOnMobile(!colapseOnMobile) }} />

                {!isMobile &&
                    <>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                {(
                                    <NavLink to='/' className='nav-link'>Home</NavLink>
                                )}
                            </Nav>
                            <Nav>
                                {!userState.isAuthenticated ? (
                                    <>
                                        <button className='btn-login' onClick={() => navigate("/login")}>Log in</button>
                                        <button className='btn-sign-up' onClick={() => navigate("/signup")}>Sign up</button>
                                    </>
                                ) : (
                                    <div className='header-authenticated-container'>
                                        <div className='container-basket' onClick={() => navigate("/cart")}>
                                            <ShoppingBasketIcon />
                                            <div>Cart</div>
                                            {listProductAddedToBasket && listProductAddedToBasket.length > 0 && (
                                                <span className='basket-count'>{listProductAddedToBasket.length}</span>
                                            )}
                                        </div>
                                        <div className='container-basket' onClick={() => navigate("/order")}>
                                            <CheckIcon />
                                            <div>Order</div>
                                            {listOrderCount > 0 && (
                                                <span className='basket-count'>{listOrderCount}</span>
                                            )}
                                        </div>
                                        <NavDropdown title="Setting" id="basic-nav-dropdown">
                                            <Link to="/profile" className='dropdown-item'>Profile</Link>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item onClick={handleUserLogout}>
                                                Logout
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    </div>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </>
                }
            </Container>
        </Navbar>
    );
};

export default Header;
