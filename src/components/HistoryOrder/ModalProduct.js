import CloseIcon from '@mui/icons-material/Close';
import { Button, Grid, IconButton, TextField } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Fade from '../../utils/Fade';
import { formatNumber } from '../../utils/common';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 3,
};

const ModalProduct = ({ open, setOpen, dataProduct }) => {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 180,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <div className="flex justify-between items-center pb-4">
                                <span>Danh sách sản phẩm</span>
                                <IconButton onClick={handleClose} aria-label="close" size="large">
                                    <CloseIcon />
                                </IconButton>
                            </div>
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
                                {dataProduct &&
                                    dataProduct.length > 0 &&
                                    dataProduct.map((product, index) => (
                                        <div key={index} className="flex shadow-md rounded-xl mb-4 bg-white p-2">
                                            <img
                                                src={product.image}
                                                alt={index}
                                                className="object-cover h-[100px] w-[100px] p-4 shadow-sm rounded-xl mr-2"
                                            />
                                            <div>
                                                <div className="text-[15px] font-medium">{product.title}</div>
                                                <div className="my-1">Số lượng: {product.quantity}</div>
                                                <div>Đơn giá: {formatNumber(product.price)}</div>
                                            </div>
                                        </div>
                                    ))}
                            </Grid>
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default ModalProduct;
