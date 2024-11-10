import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DetailProduct from './DetailProduct';
import { getDetailProducts, getImageByName, postCart } from '../../service/apiService';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import defaultImageProduct from '../../assets/image_products/default.jpg'
import Rating from '@mui/material/Rating';
import { doFetchListCart } from '../../redux/action/listCartAction';
import getSalePrice from '../utils/GetSalePrice';
import "./Product.scss"

const Product = (props) => {
    const { product, fetchListCart, listProductInBasket, setListProductInBasket } = props;
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const userState = useSelector(state => state.userState);
    const [detailProduct, setDetailProduct] = useState(null);

    const handleShowDetail = () => {
        fetchDetailProduct();
        setShow(true);
    }

    const handleAddToBasket = async (event) => {
        if (!userState.isAuthenticated) {
            toast.error("You have to login to do this action!");
            return
        }
        const res = await postCart({
            "product_id": +product?.id,
            "amount": 1
        })
        if (!(res?.status === 200 && res?.statusText === 'OK' && res?.data?.status === "Ok")) {
            toast.error("Error add to basket");
        }
        else {
            toast.success("Successfuly added to basket");
        }

        fetchListCart();
        dispatch(doFetchListCart({ orderList: listProductInBasket }));
    }

    const fetchDetailProduct = async () => {
        const res = await getDetailProducts(product?.id);
        setDetailProduct(res.data);
    }

    return (
        <div className='product-container'>
            <Card >
                <div className='img-product' onClick={handleShowDetail}>
                    <Card.Img variant="top" src={product?.image ? getImageByName(product?.image, 'product') : defaultImageProduct} />
                </div>
                <Card.Body className='body-product-card' >
                    <Card.Title>{product?.name}</Card.Title>
                    <div className='rating-container'>
                        <Rating
                            value={product?.rating}
                            readOnly
                            size="small"
                        />
                    </div>
                    <div className='price-product'>
                        {product?.sale > 0 ? (
                            <>
                                <span className='full-price'>
                                    {product?.full_price + " руб."}
                                </span>
                                <span className='sale'>
                                    {getSalePrice(product?.full_price, product?.sale) + " руб."}
                                </span>
                            </>
                        ) : (
                            <span>{product?.full_price + " руб."}</span>
                        )}
                    </div>
                    <div className='btn-buy-product'>
                        <Button variant="primary" onClick={(event) => handleAddToBasket()}>Add to basket</Button>
                    </div>
                </Card.Body>
            </Card>
            <DetailProduct
                show={show}
                setShow={setShow}
                handleAddToBasket={handleAddToBasket}
                product={detailProduct}
                handleShowDetail={handleShowDetail}></DetailProduct>
        </div>
    );
}

export default Product;