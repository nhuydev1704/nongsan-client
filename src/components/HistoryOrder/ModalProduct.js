import CloseIcon from '@mui/icons-material/Close';
import { Grid, IconButton, Stack } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
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
                {/* <Fade in={open}> */}
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <div className="flex justify-between items-center pb-4">
                            <span>Thông tin đơn hàng</span>
                            <IconButton onClick={handleClose} aria-label="close" size="large">
                                <CloseIcon />
                            </IconButton>
                        </div>
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Stack direction="row">
                                        <div>Tên khách hàng: </div>
                                        <div style={{ fontWeight: 'bold', marginLeft: '4px' }}>
                                            {dataProduct?.row?.name}
                                        </div>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack direction="row">
                                        <div>Số điện thoại: </div>
                                        <div style={{ fontWeight: 'bold', marginLeft: '4px' }}>
                                            {dataProduct?.row?.phone}
                                        </div>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack direction="row">
                                        <div>Địa chỉ: </div>
                                        <div style={{ fontWeight: 'bold', marginLeft: '4px' }}>
                                            {dataProduct?.row?.address}
                                        </div>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack direction="row">
                                        <div>Phương thức thanh toán: </div>
                                        <div style={{ fontWeight: 'bold', marginLeft: '4px' }}>
                                            {dataProduct?.row?.type ? 'Paypal' : 'Tiền mặt'}
                                        </div>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            {dataProduct.value &&
                                dataProduct.value.length > 0 &&
                                dataProduct.value.map((product, index) => (
                                    <div key={index} className="flex shadow-md rounded-xl mb-4 bg-white p-2">
                                        <img
                                            src={product?.image}
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
                        <Grid item xs={12} md={12}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                <div className="flex justify-end items-center pb-4">
                                    <span>
                                        Tổng tiền:{' '}
                                        <span style={{ color: 'red' }}>
                                            {formatNumber(dataProduct?.row?.priceCheckout)}
                                        </span>
                                    </span>
                                </div>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                {/* </Fade> */}
            </Modal>
        </div>
    );
};

export default ModalProduct;
