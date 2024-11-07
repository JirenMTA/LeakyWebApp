import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';
import { TextField } from '@mui/material';
import './AdminModalAddProduct.scss'
import { useState } from 'react';
import { postProduct } from '../../../service/apiService';
import { toast } from 'react-toastify';

const AdminModalAddProduct = (props) => {
    const { showModalAddproduct, setShowModalAddproduct, fetchListProduct } = props;
    const handleClose = () => setShowModalAddproduct(false);

    const [name, setName] = useState('')
    const [description, setDescription] = useState('');
    const [fullPrice, setFullPrice] = useState(0);
    const [amount, setAmount] = useState(0);
    const [sale, setSale] = useState(0);


    const handlePostProduct = async (event) => {
        const res = await postProduct({
            name: name,
            description: description,
            full_price: +fullPrice,
            amount: +amount,
            sale: +sale
        })
        if (res?.data?.status === "Ok") {
            toast.success("Successfully add new product!");
        }
        else {
            toast.error("Error add new product!")
        }
        fetchListProduct();
        handleClose();
    }

    return <div className="modal-add-roduct">
        <Modal show={showModalAddproduct} onHide={handleClose} backdrop="static" centered>
            <Modal.Header closeButton>
                <Modal.Title>Add product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='body-card-container'>
                    <div className='form-add-product'>
                        <span>Name</span>
                        <TextField
                            className="input-text"
                            style={{ width: "100%" }}
                            value={name}
                            onChange={(event) => { setName(event.target.value) }}
                        >
                        </TextField>
                    </div>
                    <div className='form-add-product'>
                        <span>Description</span>
                        <TextField
                            className="input-text"
                            style={{ width: "100%" }}
                            value={description}
                            onChange={(event) => { setDescription(event.target.value) }}
                        >
                        </TextField>
                    </div>
                    <div className='price'>
                        <div className='form-add-product'>
                            <span>Full price</span>
                            <TextField
                                className="input-text"
                                style={{ width: "100%" }}
                                value={fullPrice}
                                onChange={(event) => { setFullPrice(event.target.value) }}
                            >
                            </TextField>
                        </div>
                        <div className='form-add-product'>
                            <span>Sale</span>
                            <TextField
                                className="input-text"
                                style={{ width: "100%" }}
                                value={sale}
                                onChange={(event) => { setSale(event.target.value) }}
                            >
                            </TextField>
                        </div>
                        <div className='form-add-product'>
                            <span>Amount</span>
                            <TextField
                                className="input-text"
                                style={{ width: "100%" }}
                                value={amount}
                                onChange={(event) => { setAmount(event.target.value) }}
                            >
                            </TextField>
                        </div>
                    </div>

                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handlePostProduct}>
                    Add product
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}

export default AdminModalAddProduct;