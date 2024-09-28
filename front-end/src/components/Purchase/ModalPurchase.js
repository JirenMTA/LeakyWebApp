import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { YMaps, Map } from '@pbe/react-yandex-maps';
import YandexMapComponent from './YandexMapComponent';


const ModalPurchase = (props) => {
    const { show, setShow } = props;
    const handleClose = () => setShow(false);
    const [address, setAddress] = useState('');

    return (
        <>
            <Modal show={show} onHide={handleClose} size='xl' backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Choose delivery address </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <YandexMapComponent address={address} setAddress={setAddress} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalPurchase;