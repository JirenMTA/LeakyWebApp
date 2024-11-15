import React, { useState } from 'react';
import { Modal, Button, Typography, TextField, Box } from '@mui/material';

const ModalOTP = (props) => {
    const { openModal, setOpenModal, handleOTPSubmit, otpCode, setOtpCode } = props;

    return (
        <div>
            <Modal open={openModal === 1} onClose={() => setOpenModal(0)}>
                <Box className={`modal-box ${openModal === 1 ? 'slide-in' : 'slide-out'}`}>
                    <Typography variant="h6" component="h2">
                        Enter the OTP from your authenticator app
                    </Typography>
                    <TextField
                        label="OTP Code"
                        value={otpCode}
                        onChange={(e) => { setOtpCode(e.target.value) }}
                        fullWidth
                        variant="standard"
                        style={{ marginTop: '1rem' }}
                    />
                    <Button variant="contained" color="primary" onClick={handleOTPSubmit}>
                        Submit OTP
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalOTP;
