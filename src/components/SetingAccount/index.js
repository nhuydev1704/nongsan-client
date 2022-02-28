import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, Grid, IconButton, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useSelector } from 'react-redux';
import { postDataAPI } from '../../api/fetchData';
import GetNotification from '../../utils/GetNotification';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const initialState = {
    oldPassword: '',
    newPassword: '',
    renewPassword: '',
    showPassword: false,
    showNewPassword: false,
    showRePassword: false,
};
export const isEmpty = (value) => {
    if (!value) return true;
    return false;
};

const isLength = (password) => {
    if (password.length < 6) return true;
    return false;
};

const isMatch = (password, cf_password) => {
    if (password === cf_password) return true;
    return false;
};
const SetingAccount = ({ open, setOpen }) => {
    const { auth } = useSelector((state) => state);

    const [value, setValue] = React.useState(initialState);

    const handleChange = (prop) => (event) => {
        setValue({ ...value, [prop]: event.target.value });
    };

    const handleSubmit = async () => {
        if (isLength(value.newPassword)) {
            GetNotification('Mật khẩu tối thiểu 6 ký tự', 'error');
            return;
        }

        if (!isMatch(value.newPassword, value.renewPassword)) {
            GetNotification('Mật khẩu nhập lại không khớp', 'error');
            return;
        }

        try {
            const res = await postDataAPI(
                'reset',
                { oldPassword: value.oldPassword, newPassword: value.newPassword },
                auth.token
            );

            if (res.status === 200) {
                GetNotification(res.data.msg, 'success');
                setValue(initialState);
                setOpen(false);
            }
        } catch (err) {
            GetNotification(err.response.data.msg, 'error');
        }
    };

    const handleClickShowPassword = (pass) => {
        setValue({
            ...value,
            [pass]: !value[pass],
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{ marginBottom: '10px' }}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <div>Cài đặt tài khoản</div>
                            <IconButton onClick={() => setOpen(false)} aria-label="delete" size="small">
                                <CloseIcon fontSize="medium" />
                            </IconButton>
                        </Stack>
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={12}>
                            <FormControl fullWidth variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">Mật khẩu cũ</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={value.showPassword ? 'text' : 'password'}
                                    value={value.oldPassword}
                                    onChange={handleChange('oldPassword')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => handleClickShowPassword('showPassword')}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {value.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormControl fullWidth variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">Mật khẩu cũ</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={value.showNewPassword ? 'text' : 'password'}
                                    value={value.newPassword}
                                    onChange={handleChange('newPassword')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => handleClickShowPassword('showNewPassword')}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {value.showNewPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormControl fullWidth variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">Nhập lại mật khẩu</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={value.showRePassword ? 'text' : 'password'}
                                    value={value.renewPassword}
                                    onChange={handleChange('renewPassword')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => handleClickShowPassword('showRePassword')}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {value.showRePassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={8} className="flex" alignItems="center">
                            <Button variant="contained" onClick={handleSubmit}>
                                Cập nhật
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
};

export default SetingAccount;
