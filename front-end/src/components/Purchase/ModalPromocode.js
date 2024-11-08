import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useEffect } from 'react';
import './ModalPromocode.scss';
import { postUsePromo } from '../../service/apiService';
import { toast } from 'react-toastify';

const ModalPromocode = (props) => {
    const { show, setShow, currentOrder, listOrder, setListOrder, fetchListOrder } = props
    const [code, setCode] = useState('');

    const handleClose = () => {
        setShow(false);
    }

    const onSubmitCode = async () => {
        const res = await postUsePromo({ order_id: +currentOrder?.id, promo: code });
        if (res?.statusText === "OK" && res?.status === 200) {
            setListOrder(prevListOrder =>
                prevListOrder.map(order =>
                    order.id === currentOrder.id
                        ? { ...order, code: code }
                        : order
                )
            );
            setShow(false);
            await fetchListOrder();
        }
        else {
            toast.error("Code used or wrong!");
        }
    }

    useEffect(() => {
        if (show && currentOrder) {
            setCode(currentOrder?.code || '');
        }
    }, [show, currentOrder]);

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" className='modalpromocode' centered >
            <Modal.Header closeButton>
                <Modal.Title>Promocode</Modal.Title>
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