import 'react-toastify/dist/ReactToastify.css';
import "./HomePage.scss"
import { useEffect, useState } from "react";
import Product from "../Product/Product";
import { doFetchListOrder } from "../../redux/action/orderListAction";
import { useDispatch } from "react-redux";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { useSelector } from "react-redux";
import { useMediaQuery } from 'react-responsive';

const HomePage = (props) => {
    const importAll = (r) => {
        let imagesArray = [];
        r.keys().forEach((item) => { imagesArray.push(r(item)); });
        return imagesArray;
    };
    const images = importAll(require.context('../../assets/image_products', false, /\.(png|jpe?g|svg)$/));
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const { colapseOnMobile, setColapseOnMobile } = props;
    console.log(props);

    let clone = []
    for (let i = 0; i < 21; i++) {
        clone.push({
            id: i,
            name: `Apple Juice (${i * 100} ml)`,
            price: "100 rup",
            image: images[Math.floor(Math.random() * images.length)],
            reviews: [
                {
                    user: "stan@juice-sh.op",
                    review: "I'd stand on my head to make you a deal for this piece of art."
                },
                {
                    user: "bender@juice-sh.op",
                    review: "Just when my opinion of humans couldn't get any lower, along comes Stanewqceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
                }


            ],
            description: "Finest pressings of apples. Allergy disclaimer: Might contain traces of worms. Can be sent back to us for recycling."

        })
    }
    const [listProduct, setListProduct] = useState(clone);
    const [searchTerm, setSearchTerm] = useState('');
    const userState = useSelector(state => state.userState);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredProducts = listProduct.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );

    const dispatch = useDispatch();

    let cloneProductInBasket = [];
    const [listProductInBasket, setListProductInBasket] = useState(cloneProductInBasket);

    useEffect(() => {
        dispatch(doFetchListOrder({ orderList: listProductInBasket }));
    }, [listProductInBasket])


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
                        {filteredProducts && filteredProducts.length > 0 && filteredProducts.map((item) => {
                            return <Product product={item} key={item.id}></Product>
                        })}
                    </div>
                </div>
            }
        </>
    );
}

export default HomePage;
