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
import { postComment } from "../../service/apiService";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import cloneImage from '../../assets/image_products/banana_juice.jpg'
import { Typography, Box } from '@mui/material';


const DetailProduct = (props) => {
    const { show, setShow, product, handleShowDetail } = props
    const [review, setReview] = useState('');
    const handleClose = () => setShow(false);
    const dispatch = useDispatch();
    const [rate, setRate] = useState();
    const [hover, setHover] = useState(-1);
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

    const handlePostComment = async () => {
        if (!userState.isAuthenticated) {
            toast.error("You have to login to do this action!");
            return;
        }
        if (!review.trim()) {
            toast.error("Review is blank!");
            return;
        }
        await postComment({
            "author_id": userState?.account?.id,
            "product_id": product?.id,
            "mark": rate,
            "comment": review
        });
        handleShowDetail();
    }

    const labels = {
        1: 'Useless',
        2: 'Poor',
        3: 'Ok',
        4: 'Good',
        5: 'Excellent',
    };

    const getLabelText = (value) => {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    return <div className="detail-product-container">
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{product?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="body-container">
                    <div className="img-container">
                        <img src={cloneImage} />
                    </div>
                    <div className="description">
                        <div>
                            {product?.description}
                        </div>
                        <Rating
                            precision={0.1}
                            value={product?.rating || 0}
                            readOnly
                        ></Rating>
                        <div className='price-product'>
                            {product?.sale ? (
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
                    </div>
                </div>
            </Modal.Body>
            <hr />
            <div className="review-container">
                {product && product.comments && product.comments.length > 0 && product?.comments.map((item, key) => {
                    return <div key={key}>
                        <div className="user">
                            {"@" + item?.author?.username}
                        </div>
                        <div className="review">
                            <Box width={"500px"}>
                                <Typography variant="body1" component="p" style={{ whiteSpace: 'pre-line' }}>
                                    {item?.comment}
                                </Typography>
                            </Box>
                        </div>
                    </div>
                })}
            </div>
            <hr />
            <div className="add-review-container">
                <div className="rating-container">
                    Rate the product
                    <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
                        <Rating
                            name="hover-feedback"
                            value={rate || 0}
                            getLabelText={getLabelText}
                            onChange={(event, newValue) => {
                                setRate(newValue || 0);
                            }}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);
                            }}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        {rate !== null && (
                            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rate]}</Box>
                        )}
                    </Box>
                </div>
                <hr />

                <div>
                    Write a review
                </div>
                <div className="input-add-review">
                    <div className="input-field">
                        <Form.Control as="textarea" value={review} onChange={(e) => setReview(e.target.value)} />
                    </div>
                    <div className="btn-send-review">
                        <SendIcon className="send-icon" onClick={handlePostComment} />
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