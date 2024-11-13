import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { postProduct, postUploadProductImage } from '../../../service/apiService';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import defaultImageProduct from '../../../assets//image_products//default.jpg'
import { getImageByName } from '../../../service/apiService';
import './AdminModalAddProduct.scss'


const AdminModalAddProduct = (props) => {
    const { showModalAddproduct, setShowModalAddproduct, fetchListProduct, product } = props;
    const handleClose = () => setShowModalAddproduct(false);

    const [name, setName] = useState('')
    const [description, setDescription] = useState('');
    const [fullPrice, setFullPrice] = useState(0);
    const [amount, setAmount] = useState(0);
    const [sale, setSale] = useState(0);
    const [image, setImage] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    const handleFileChange = (event) => {
        setImage(event.target.files[0])
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
    };

    const handlePostProduct = async (event) => {
        if (!product) {
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
        else {
            const res = await postUploadProductImage(product?.id, image)
            if (!(res && res?.data?.status === "Ok")) {
                toast.error("Error upload image");
                return;
            }
            fetchListProduct();
            handleClose();
        }
    }

    useEffect(() => {
        setName(product?.name || '')
        setAmount(product?.amount || 0);
        setDescription(product?.description || '');
        setFullPrice(product?.fullPrice || 0);
        setSale(product?.sale || 0)
        setPreviewImage(product?.image ? getImageByName(product?.image, 'product') : defaultImageProduct)
        setImage(product?.image ? true : false);

    }, [showModalAddproduct, product])

    return <div className="modal-add-roduct">
        <Modal show={showModalAddproduct} onHide={handleClose} backdrop="static" centered>
            <Modal.Header closeButton>
                <Modal.Title>{product ? "Change product" : "Add product"}</Modal.Title>
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
                    <div className="col-md-12">
                        <label> Image </label>
                        <div className="input-group mb-3" style={{ margin: "20px 0" }}>
                            <input type="file" className="form-control" id="inputGroupFile02" onChange={handleFileChange} />
                            <label className="input-group-text">Upload</label>
                        </div>
                        <div className="img-preview" >
                            <img src={previewImage} hidden={!image} />
                            {image ? <></> : <div className="border-dotted-no-image">No preview image</div>}
                        </div>
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handlePostProduct}>
                    {product ? "Change product" : "Add product"}
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}

export default AdminModalAddProduct;