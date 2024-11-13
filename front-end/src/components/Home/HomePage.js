import 'react-toastify/dist/ReactToastify.css';
import "./HomePage.scss"
import { useEffect, useState } from "react";
import Product from "../Product/Product";
import { useDispatch } from "react-redux";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { useSelector } from "react-redux";
import { useMediaQuery } from 'react-responsive';
import { dangerousGetFindProduct, getOrder, getProducts } from '../../service/apiService';
import { getCart } from '../../service/apiService';
import { doFetchListCart } from '../../redux/action/listCartAction';
import { doFetchListOrder } from '../../redux/action/listOrderAction';
import { useNavigate } from "react-router-dom";


const HomePage = (props) => {
    const [listProduct, setListProduct] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const userState = useSelector(state => state.userState);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const dispatch = useDispatch();
    const [listProductInBasket, setListProductInBasket] = useState([]);
    const [listOrderCount, setListOrderCount] = useState(0);

    const fetchProducts = async () => {
        let products = await getProducts();
        setListProduct(products?.data);
    };

    useEffect(() => {
        fetchListCart();
        fetchListOrder()
    }, [userState]);
    // useEffect(() => {
    //     if (listProduct && listProduct?.filter) {
    //         const filteredProducts_ = listProduct.filter((product) =>
    //             product.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    //         );
    //         setFilteredProducts(filteredProducts_);
    //     }
    // }, [listProduct, searchTerm])

    const fetchListOrder = async () => {
        if (userState.isAuthenticated) {
            let listOrder = await getOrder();
            setListOrderCount(listOrder?.data?.length);
        }
    }

    const fetchListCart = async (data) => {
        if (userState.isAuthenticated) {
            const res = await getCart(data);
            setListProductInBasket(res?.data?.products);
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchListCart();
        fetchListOrder()
    }, []);

    const handleSearchChange = async (e) => {
        if (e.target.value.length > 100)
            return;
        setSearchTerm(e.target.value);
        const res = await dangerousGetFindProduct(e.target.value.trim());
        setListProduct(res?.data);
    };

    useEffect(() => {
        dispatch(doFetchListCart({ orderList: listProductInBasket }));
        dispatch(doFetchListOrder({ numberOrder: listOrderCount }));
    }, [listProductInBasket, listOrderCount])


    return (
        <>
            {
                <div className="home-page-container">
                    <div className='label-homepage'>
                        {!isMobile &&
                            <div className="label-text">
                                {searchTerm === '' ? "All product" : `Search for word: "${searchTerm}"`}
                            </div>
                        }
                        <div className="search-product"  >
                            <TextField
                                id="standard-basic"
                                label="Search product"
                                variant="standard"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon sx={{
                                                cursor: 'pointer'
                                            }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                    </div>
                    <div className="list-product">
                        {listProduct && listProduct.length > 0 && listProduct.map((item, key) => {
                            return <Product
                                fetchListCart={fetchListCart}
                                listProductInBasket={listProductInBasket}
                                setListProductInBasket={setListProductInBasket}
                                product={item}
                                key={key}></Product>
                        })}
                    </div>
                </div>
            }
        </>
    );
}

export default HomePage;
