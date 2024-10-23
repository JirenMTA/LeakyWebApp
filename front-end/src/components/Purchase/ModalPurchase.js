import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import YandexMapComponent from './YandexMapComponent';
import "./ModalPurchase.scss"

const ModalPurchase = (props) => {
    const { show, setShow } = props;
    const handleClose = () => setShow(false);
    const [address, setAddress] = useState('');
    const { item } = props

    return (
        <>
            <Modal show={show} onHide={handleClose} size='xl' backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Purchase for {` "${item?.name}"`} </Modal.Title>
                </Modal.Header>
                <Modal.Body className='yandexmap-container'>
                    <YandexMapComponent address={address} setAddress={setAddress} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Purchase
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalPurchase;