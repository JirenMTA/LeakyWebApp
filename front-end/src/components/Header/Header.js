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

const Header = (props) => {
    const navigate = useNavigate();
    const listProductAddedToBasket = useSelector(state => state.orderListState.orderList);
    const userState = useSelector(state => state.userState);
    const dispatch = useDispatch();
    const { colapseOnMobile, setColapseOnMobile } = props
    const isMobile = useMediaQuery({ query: '(max-width: 1000px)' });

    const handleUserLogout = () => {
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
                                        <div className='container-purchased' onClick={() => navigate("/purchased")}>
                                            <CheckIcon />
                                            <div>Purchased</div>
                                        </div>
                                        <div className='container-basket' onClick={() => navigate("/basket")}>
                                            <ShoppingBasketIcon />
                                            <div>My basket</div>
                                            {listProductAddedToBasket && listProductAddedToBasket.length > 0 && (
                                                <span className='basket-count'>{listProductAddedToBasket.length}</span>
                                            )}
                                        </div>
                                        <NavDropdown title="Setting" id="basic-nav-dropdown">
                                            <NavDropdown.Item onClick={handleUserLogout}>
                                                Logout
                                            </NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <Link to="/users" className='dropdown-item'>Profile</Link>
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
