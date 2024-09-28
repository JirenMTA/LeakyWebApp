import "./DetailProduct.scss"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { doFetchListOrder } from "../../redux/action/orderListAction";
import { useDispatch } from "react-redux";

const DetailProduct = (props) => {
    const { show, setShow, product } = props
    const [review, setReview] = useState('');
    const handleClose = () => setShow(false);
    const dispatch = useDispatch();

    const userState = useSelector(state => state.userState);
    const listProduct = useSelector(state => state.orderListState.orderList);

    const handleUserAddToBasket = () => {
        if (!userState.isAuthenticated) {
            toast.error("You have to login to do this action!");
            return
        }
        dispatch(doFetchListOrder({ orderList: [...listProduct, product] }));
        handleClose();
    }


    return <div className="detail-product-container">
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{product?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="body-container">
                    <div className="img-container">
                        <img src={product?.image} />
                    </div>
                    <div className="description">
                        <div>
                            {product?.description}
                        </div>
                        <div>
                            {"Price: " + product?.price}
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <hr />
            <div className="review-container">
                {product?.reviews.map((item, key) => {
                    return <div key={key}>
                        <div className="user">
                            {"@" + item.user}
                        </div>
                        <div className="review">
                            {item.review}
                        </div>
                    </div>
                })}
            </div>
            <hr />
            <div className="add-review-container">
                <div>
                    Write a review
                </div>
                <div className="input-add-review">
                    <div className="input-field">
                        <Form.Control as="textarea" value={review} onChange={(e) => setReview(e.target.value)} />
                    </div>
                    <div className="btn-send-review">
                        <SendIcon className="send-icon" onClick={() => alert(review)} />
                    </div>
                </div>
            </div>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleUserAddToBasket}>
                    Add to basket
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}

export default DetailProduct;