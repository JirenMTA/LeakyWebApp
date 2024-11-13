import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getImageByName, postComment } from "../../service/apiService";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import defaultAvatar from '../../assets/avatar/default.jpg'
import defaultProductImage from '../../assets/image_products/default.jpg'
import "./DetailProduct.scss"
import getSalePrice from '../utils/GetSalePrice';

const DetailProduct = (props) => {
    const { show, setShow, product, handleShowDetail, handleAddToBasket } = props
    const [review, setReview] = useState('');
    const handleClose = () => setShow(false);
    const [rate, setRate] = useState();
    const [hover, setHover] = useState(-1);
    const userState = useSelector(state => state.userState);

    const handlePostComment = async () => {
        if (!userState.isAuthenticated) {
            toast.error("You have to login to do this action!");
            return;
        }
        if (!review.trim()) {
            toast.error("Review is blank!");
            return;
        }

        const res = await postComment({
            "author_id": +userState?.account?.id,
            "product_id": +product?.id,
            "mark": rate,
            "comment": review
        });

        if (res && res.statusText === 'OK' && res.data.status === "Ok") {
            setReview('');
            handleShowDetail();
        }
        else {
            toast.error("Error sending review")
        }
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
                        <img src={product?.image ? getImageByName(product?.image, 'product') : defaultProductImage} />
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
                    </div>
                </div>
            </Modal.Body>
            <hr />
            <div className="review-container">
                {product && product.comments && product.comments.length > 0 && product?.comments.map((item, key) => {
                    return <Card key={key} className="card-review">
                        <CardContent>
                            <Box display="flex" alignItems="center" >
                                <img
                                    src={item?.author?.avatar ? getImageByName(item?.author?.avatar, 'avatar') : defaultAvatar}
                                    alt={item?.author?.username}
                                />
                                <Typography variant="h6">{item?.author?.username}</Typography>
                                <StarIcon className='mark-content' />
                                {item?.mark}
                            </Box>
                            {/* <div className="Container" dangerouslySetInnerHTML
                                ={{
                                    "__html": item?.comment
                                }}>
                            </div> */}
                            <Typography variant="body1" style={{ marginTop: '10px', fontSize: "13px" }}>
                                {item?.comment}
                            </Typography>
                        </CardContent>
                    </Card>
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
                <Button variant="primary" onClick={handleAddToBasket}>
                    Add to basket
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}

export default DetailProduct;