import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { login } from '../../../redux/actions/authAction';
import { ValidLogin } from '../../../utils/ValidAuth';
import FormRegister from './FormRegister';

const initialState = {
    username: '',
    password: '',
    showPassword: false,
};

const DivStyled = styled.div`
    margin-top: 20px;
`;

const TypographyStyled = styled(Typography)`
    font-size: 1.5rem;
`;

const FormLogin = () => {
    const [values, setValues] = React.useState(initialState);
    const [isLogin, setIslogin] = React.useState(true);

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

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onSubmit = async () => {
        const rs = ValidLogin(values);
        if (!rs) {
            dispatch(login(values));
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '700px', marginLeft: '10px' }}>
                <TypographyStyled variant="h3" gutterBottom component="div">
                    {isLogin ? 'Đăng nhập' : 'Đăng ký'}
                </TypographyStyled>
                {isLogin ? (
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
                            inputProps={{
                                autoComplete: 'email',
                                form: {
                                    autoComplete: 'email',
                                },
                            }}
                            id="standard-basic"
                            value={values.username}
                            onChange={handleChange('username')}
                            label="Địa chỉ email"
                            variant="standard"
                            type="email"
                            style={{ marginTop: '10px' }}
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
                        <Button variant="contained" type="submit" onClick={onSubmit} style={{ marginTop: '30px' }}>
                            Đăng nhập
                        </Button>
                        <DivStyled>
                            Bạn chưa có tài khoản{' '}
                            <Button onClick={() => setIslogin(false)} variant="text">
                                Đăng ký ngay?
                            </Button>
                        </DivStyled>
                    </Box>
                ) : (
                    <FormRegister setIslogin={setIslogin} />
                )}
            </div>
        </div>
    );
};

export default React.memo(FormLogin);
