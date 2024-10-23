import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "./Product.scss"
import DetailProduct from './DetailProduct';
import { getDetailProducts } from '../../service/apiService';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { doFetchListOrder } from '../../redux/action/orderListAction';
import { toast } from 'react-toastify';
import cloneImage from '../../assets/image_products/apple_juice.jpg'
import Rating from '@mui/material/Rating';

const Product = (props) => {
    const { product } = props;
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const userState = useSelector(state => state.userState);
    const listProduct = useSelector(state => state.orderListState.orderList);
    const [detailProduct, setDetailProduct] = useState(null);

    const handleShowDetail = () => {
        fetchDetailProduct();
        setShow(true);
    }

    const handleAddToBasket = (event) => {
        if (!userState.isAuthenticated) {
            toast.error("You have to login to do this action!");
            return
        }
        dispatch(doFetchListOrder({ orderList: [...listProduct, product] }));
    }

    const fetchDetailProduct = async () => {
        const id = 4
        const res = await getDetailProducts(id);
        setDetailProduct({ ...res.data, id: id });
    }

    return (
        <div className='product-container'>
            <Card >
                <div className='img-product' onClick={handleShowDetail}>
                    <Card.Img variant="top" src={cloneImage} />
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
                        {product?.sale < product?.full_price ? (
                            <>
                                <span className='full-price'>
                                    {product?.full_price + " руб."}
                                </span>
                                <span className='sale'>
                                    {product?.sale + " руб."}
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
            <DetailProduct show={show} setShow={setShow} product={detailProduct} handleShowDetail={handleShowDetail}></DetailProduct>
        </div>
    );
}

export default Product;