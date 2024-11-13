import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/material';
import "./PromocodeManager.scss"
import { Checkbox, FormControlLabel } from '@mui/material';
import { useMediaQuery } from 'react-responsive';
import { deletePromocode, getPromocode, postPromocode, putPromocode } from '../../service/apiService';

const PromocodeManager = () => {
    const [promoCodes, setPromoCodes] = useState([]);
    const [open, setOpen] = useState(false);
    const [editPromo, setEditPromo] = useState(null);
    const [newPromo, setNewPromo] = useState({ code: '', sale: 0, active: false });
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const handleOpen = (promo) => {
        if (promo) {
            setEditPromo(promo);
            setNewPromo(promo);
        } else {
            setEditPromo(null);
            setNewPromo({ code: '', sale: 0, active: false });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        if (editPromo) {
            //setPromoCodes(promoCodes.map(p => (p.id === editPromo.id ? newPromo : p)));
            const data = {
                id: +editPromo?.id,
                code: newPromo?.code,
                sale: +newPromo?.sale,
                active: newPromo?.active
            }
            const res = await putPromocode(data);
            fetchListPromocode();
        } else {
            const res = await postPromocode(newPromo);
            fetchListPromocode();
        }
        handleClose();
    };

    const handleDelete = async (id) => {
        await deletePromocode({ id: +id });
        fetchListPromocode();
    };

    const fetchListPromocode = async () => {
        const res = await getPromocode();
        setPromoCodes(res?.data);
    }

    useEffect(() => {
        fetchListPromocode();
    }, [])

    return (!isMobile ?
        <div className='promocode-table'>
            <Button variant="contained" color="primary" onClick={() => handleOpen()}>
                Add Promo Code
            </Button>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Code</TableCell>
                            <TableCell>Sale</TableCell>
                            <TableCell>Active</TableCell>
                            <TableCell>Created</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(promoCodes) && (promoCodes.length > 0) && promoCodes.map((promo) => (
                            <TableRow key={promo.id}>
                                <TableCell>{promo.code}</TableCell>
                                <TableCell>{promo.sale}</TableCell>
                                <TableCell>{promo.active ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{promo.created}</TableCell>
                                <TableCell className='action-column'>
                                    <Button variant="contained" color="primary" onClick={() => handleOpen(promo)}>Edit</Button>
                                    <Button variant="contained" color="secondary" onClick={() => handleDelete(promo.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editPromo ? 'Edit Promo Code' : 'Add Promo Code'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Code"
                        type="text"
                        fullWidth
                        value={newPromo.code}
                        onChange={(e) => setNewPromo({ ...newPromo, code: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Sale"
                        type="number"
                        fullWidth
                        value={newPromo.sale}
                        onChange={(e) => setNewPromo({ ...newPromo, sale: Number(e.target.value) <= 0 ? 1 : Number(e.target.value) })}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={newPromo.active}
                                onChange={(e) => setNewPromo({ ...newPromo, active: e.target.checked })}
                                color="primary"
                            />
                        }
                        label="Active"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
        :
        <div>
            <Button variant="contained" color="primary" onClick={() => handleOpen()}>
                Add Promo Code
            </Button>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Code</TableCell>
                            <TableCell>Sale</TableCell>
                            <TableCell>Active</TableCell>
                            <TableCell>Detail</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(promoCodes) && (promoCodes.length > 0) && promoCodes.map((promo) => (
                            <TableRow key={promo.id}>
                                <TableCell>{promo.code}</TableCell>
                                <TableCell>{promo.sale}</TableCell>
                                <TableCell>{promo.active ? 'Yes' : 'No'}</TableCell>
                                <TableCell>
                                    {promo.created}
                                    <TableCell className='action-column'>
                                        <Button variant="contained" color="primary" onClick={() => handleOpen(promo)}>Edit</Button>
                                        <Button variant="contained" color="secondary" onClick={() => handleDelete(promo.id)}>Delete</Button>
                                    </TableCell>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editPromo ? 'Edit Promo Code' : 'Add Promo Code'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Code"
                        type="text"
                        fullWidth
                        value={newPromo.code}
                        onChange={(e) => setNewPromo({ ...newPromo, code: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Sale"
                        type="number"
                        fullWidth
                        value={newPromo.sale}
                        onChange={(e) => setNewPromo({ ...newPromo, sale: Number(e.target.value) })}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={newPromo.active}
                                onChange={(e) => setNewPromo({ ...newPromo, active: e.target.checked })}
                                color="primary"
                            />
                        }
                        label="Active"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default PromocodeManager;