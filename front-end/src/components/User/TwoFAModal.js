import React, { useState } from 'react';
import { Modal, Button, Typography, TextField, Box } from '@mui/material';
import { post_qr_code_setup } from '../../service/apiService';
import { toast } from 'react-toastify';
import auth_img from "../../assets/2fa/google_auth.png";
import { get_qr_code } from '../../service/apiService';
import shield from '../../assets/2fa/shield.png'
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userActions';
import "./TwoFAModal.scss";


const TwoFAModal = (props) => {
    const { openModal, setOpenModal } = props;
    const [qrCodeUrl, setQrCodeUrl] = useState(null);
    const dispatch = useDispatch();

    const handleConfirm2FA = async () => {
        setOpenModal(2);
        const res = await get_qr_code();
        const qrCodeUrl = URL.createObjectURL(res?.data);
        setQrCodeUrl(qrCodeUrl);
    };

    const handleQRScanned = async () => {
        setOpenModal(3);
    };

    const renderDots = () => (
        <div className="dots-container">
            <div className={`dot ${openModal === 1 ? 'active' : ''}`}></div>
            <div className={`dot ${openModal === 2 ? 'active' : ''}`}></div>
            <div className={`dot ${openModal === 3 ? 'active' : ''}`}></div>
        </div>
    );

    const handleConfirmSetup = async () => {
        const res = await post_qr_code_setup();

        dispatch(doLogin({
            account: {
                has2Fa: true
            }
        }));

        setOpenModal(0);
    }

    return (
        <div>
            <Modal open={openModal === 1} onClose={() => setOpenModal(0)}>
                <Box className={`modal-box slide-in`}>
                    <img className="auth_img" src={auth_img} alt="Auth App" />
                    <Typography variant="h6" component="h2">
                        Do you want to enable 2FA for your account?
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleConfirm2FA}>
                        Confirm
                    </Button>
                    {renderDots()}
                </Box>
            </Modal>

            <Modal open={openModal === 2} onClose={() => setOpenModal(0)}>
                <Box className={`modal-box ${openModal === 2 ? 'slide-in' : 'slide-out'}`}>
                    <Typography variant="h6" component="h2">
                        Scan this QR Code with your authenticator app
                    </Typography>
                    <img src={qrCodeUrl} alt="QR Code" style={{ marginTop: '1rem', width: "100%", height: "auto" }} />
                    <Button variant="contained" color="primary" onClick={handleQRScanned}>
                        I've Scanned the QR Code
                    </Button>
                    {renderDots()}
                </Box>
            </Modal>
            <Modal open={openModal === 3} onClose={() => setOpenModal(0)}>
                <Box className={`modal-box ${openModal === 3 ? 'slide-in' : 'slide-out'}`}>
                    <Typography variant="h6" component="h2">
                        Your account will be enabled 2FA. Don't lose your QR code!
                    </Typography>
                    <img src={shield} alt="QR Code" style={{ marginTop: '1rem', width: "100%", height: "auto" }} />
                    <Button variant="contained" color="primary" onClick={handleConfirmSetup}>
                        CONFIRM
                    </Button>
                    {renderDots()}
                </Box>
            </Modal>
        </div>
    );
}

export default TwoFAModal;
