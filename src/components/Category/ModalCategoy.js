import CloseIcon from '@mui/icons-material/Close';
import { Button, Grid, IconButton, TextField } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useSelector } from 'react-redux';
import Fade from '../../utils/Fade';
import SelectComponent from '../../utils/SelectComponent';
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

const dataType = [
    { name: 'Nông sản', value: 'agricultural' },
    { name: 'Khác', value: 'other' },
];

const ModalCategoy = ({ open, setOpen, handleSubmit, dataCate, setDataCate }) => {
    const { category } = useSelector((state) => state);

    const handleClose = () => {
        const initialState = {
            selected: { name: 'Nông sản', value: 'agricultural' },
            selectedParent: { name: 'Chọn danh mục cha', value: '' },
            name: '',
            id: '',
        };
        setDataCate(initialState);
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
                                <span>Thêm danh mục</span>
                                <IconButton onClick={handleClose} aria-label="close" size="large">
                                    <CloseIcon />
                                </IconButton>
                            </div>
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    id="standard-basic"
                                    label="Tên danh mục"
                                    variant="standard"
                                    value={dataCate.name}
                                    onChange={(e) => setDataCate({ ...dataCate, name: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} style={{ marginTop: 3 }}>
                                <SelectComponent
                                    selected={dataCate.selected}
                                    handleChange={(key) => setDataCate({ ...dataCate, selected: key })}
                                    dataType={dataType}
                                />
                            </Grid>
                            <Grid item xs={6} md={6} style={{ marginTop: 3 }}>
                                <span className="flex items-center h-full">Nếu là danh mục con hãy lựa chọn:</span>
                            </Grid>
                            <Grid item xs={6} md={6} style={{ marginTop: 3 }}>
                                <SelectComponent
                                    disabled={dataCate.id && dataCate.selectedParent.value === ''}
                                    selected={dataCate.selectedParent}
                                    handleChange={(key) => setDataCate({ ...dataCate, selectedParent: key })}
                                    dataType={[
                                        { name: 'Chọn danh mục cha', value: '' },
                                        ...category?.category.filter((cte) => cte.type === dataCate.selected.value),
                                    ]}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={12}
                                style={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}
                            >
                                <Button onClick={handleSubmit} variant="contained">
                                    {dataCate?.id ? 'Cập nhật' : 'Thêm'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default ModalCategoy;
