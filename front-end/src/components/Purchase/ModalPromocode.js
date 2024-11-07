import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { toast } from "react-toastify";
import './ModalPromocode.scss';

const ModalPromocode = (props) => {
    const { show, setShow, item, setItem, code, setCode, promocodeAll, setPromocodeAll } = props

    const handleClose = () => {
        setShow(false);
    }

    const onSubmitCode = () => {
        if (item === null) {
            setPromocodeAll(code);
        }
        else {
            if (code === 'PHAMNGOCHUNG' || code === 'PHAMNGOCDUONG' || code === 'JIRENMTA') {
                setCode(code)
                setItem({ ...item, total_price: item?.sale * 80 / 100, code: code });
            }
            else {
                toast.error("Invalid code");
                setCode('');
                setItem({ ...item, total_price: item?.sale, code: '' });
            }
        }
        handleClose();
    }


    return (
        <Modal show={show} onHide={handleClose} backdrop="static" className='modalpromocode' centered >
            <Modal.Header closeButton>
                <Modal.Title>Promocode for {item?.name} </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <TextField id="standard-basic" label="Code" variant="standard"
                    value={code}
                    style={{ width: "100%" }}
                    onChange={(event) => setCode(event.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} >
                    Close
                </Button>
                <Button variant="primary" onClick={onSubmitCode}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalPromocode;