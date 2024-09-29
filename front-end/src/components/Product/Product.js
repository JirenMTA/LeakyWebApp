import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "./Product.scss"
import DetailProduct from './DetailProduct';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { doFetchListOrder } from '../../redux/action/orderListAction';
import { toast } from 'react-toastify';
import { useMediaQuery } from 'react-responsive';

const Product = (props) => {
    const { product } = props;
    const [show, setShow] = useState(false);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const dispatch = useDispatch();
    const userState = useSelector(state => state.userState);
    const listProduct = useSelector(state => state.orderListState.orderList);

    const handleShowDetail = () => {
        setShow(true);
    }

    const handleAddToBasket = (event) => {
        if (!userState.isAuthenticated) {
            toast.error("You have to login to do this action!");
            return
        }
        dispatch(doFetchListOrder({ orderList: [...listProduct, product] }));
    }

    return (
        <div className='product-container' style={{ width: isMobile ? '100%' : "undefined" }}>
            <Card >
                <div className='img-product' onClick={handleShowDetail}>
                    <Card.Img variant="top" src={product?.image} />
                </div>
                <Card.Body>
                    <Card.Title>{product?.name}</Card.Title>
                    <div className='price-product'>
                        <Card.Title>
                            {"Price: " + product?.price}
                        </Card.Title>
                    </div>
                    <div className='btn-buy-product'>
                        <Button variant="primary" onClick={(event) => handleAddToBasket()}>Add to basket</Button>
                    </div>
                </Card.Body>
            </Card>
            <DetailProduct show={show} setShow={setShow} product={product}></DetailProduct>
        </div>
    );
}

export default Product;