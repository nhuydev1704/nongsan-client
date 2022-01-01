import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import React from 'react';
import styled from 'styled-components';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import GetNotification from '../../../utils/GetNotification';
import { ValidRegister } from '../../../utils/ValidAuth';
import { register } from '../../../redux/actions/authAction';
import { useDispatch } from 'react-redux';
const initialState = {
    fullname: '',
    username: '',
    gender: 'male',
    email: '',
    password: '',
    re_password: '',
    showPassword: false,
    showRePassword: false,
};

const DivStyled = styled.div`
    margin-top: 20px;
`;
const FormRegister = ({ setIslogin }) => {
    const [values, setValues] = React.useState(initialState);

    const dispatch = useDispatch();

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleClickShowRePassword = () => {
        setValues({
            ...values,
            showRePassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onSubmit = async () => {
        const rs = ValidRegister(values);
        if (!rs) {
            dispatch(register(values));
        }
    };
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'column',
                width: '70%',
                marginLeft: '20px',
            }}
        >
            <TextField
                style={{ marginTop: '10px' }}
                id="standard-basic"
                value={values.fullname}
                onChange={handleChange('fullname')}
                label="Họ và tên"
                variant="standard"
                type="text"
                autoComplete="off"
            />
            <TextField
                style={{ marginTop: '10px' }}
                id="standard-basic"
                value={values.username}
                onChange={handleChange('username')}
                label="Tên tài khoản"
                variant="standard"
                type="text"
                autoComplete="off"
            />
            <TextField
                style={{ marginTop: '10px' }}
                inputProps={{
                    autoComplete: 'email',
                    form: {
                        autoComplete: 'email',
                    },
                }}
                id="standard-basic"
                value={values.email}
                onChange={handleChange('email')}
                label="Địa chỉ email"
                variant="standard"
                type="email"
            />
            <FormControl sx={{ marginTop: '10px' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Mật khẩu</InputLabel>
                <Input
                    id="standard-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <FormControl sx={{ marginTop: '10px' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Nhập lại mật khẩu</InputLabel>
                <Input
                    id="standard-adornment-password"
                    type={values.showRePassword ? 'text' : 'password'}
                    value={values.re_password}
                    onChange={handleChange('re_password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowRePassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <FormControl sx={{ marginTop: '20px' }} component="fieldset">
                <FormLabel component="legend">Giới tính</FormLabel>
                <RadioGroup
                    value={values.gender}
                    onChange={handleChange('gender')}
                    row
                    aria-label="gender"
                    name="row-radio-buttons-group"
                >
                    <FormControlLabel value="male" control={<Radio />} label="Nam" />
                    <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                    <FormControlLabel value="other" control={<Radio />} label="Khác" />
                </RadioGroup>
            </FormControl>
            <Button variant="contained" type="submit" onClick={onSubmit} style={{ marginTop: '30px' }}>
                Đăng ký
            </Button>
            <DivStyled>
                Bạn đã có tài khoản{' '}
                <Button onClick={() => setIslogin(true)} variant="text">
                    Đăng nhập ngay?
                </Button>
            </DivStyled>
        </Box>
    );
};

export default FormRegister;
