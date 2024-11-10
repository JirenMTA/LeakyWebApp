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
import { getOrder, getProducts } from '../../service/apiService';
import { getCart } from '../../service/apiService';
import { doFetchListCart } from '../../redux/action/listCartAction';
import { doFetchListOrder } from '../../redux/action/listOrderAction';


const HomePage = (props) => {
    const importAll = (r) => {
        let imagesArray = [];
        r.keys().forEach((item) => { imagesArray.push(r(item)); });
        return imagesArray;
    };
    const images = importAll(require.context('../../assets/image_products', false, /\.(png|jpe?g|svg)$/));

    const [listProduct, setListProduct] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const userState = useSelector(state => state.userState);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const dispatch = useDispatch();
    const [listProductInBasket, setListProductInBasket] = useState([]);
    const [listOrderCount, setListOrderCount] = useState(0);


    const fetchProducts = async () => {
        let listCart = await getProducts();
        let listOrder = await getOrder();
        setListProduct(listCart?.data);
        setListOrderCount(listOrder?.data?.length);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (listProduct && listProduct?.filter) {
            const filteredProducts_ = listProduct.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
            );
            setFilteredProducts(filteredProducts_);
        }
    }, [listProduct, searchTerm])


    const fetchListCart = async (data) => {
        const res = await getCart(data);
        setListProductInBasket(res?.data?.products);
    }

    useEffect(() => {
        fetchListCart();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
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
                        {filteredProducts && filteredProducts.length > 0 && filteredProducts.map((item, key) => {
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
