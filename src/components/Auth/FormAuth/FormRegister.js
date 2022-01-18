import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import GetNotification from '../../../utils/GetNotification';
import { ValidRegister } from '../../../utils/ValidAuth';
import { register } from '../../../redux/actions/authAction';
import { useDispatch } from 'react-redux';
import SocialLogin from '../Social';
const initialState = {
    username: '',
    gender: 'male',
    email: '',
    password: '',
    re_password: '',
    showPassword: false,
    showRePassword: false,
};

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
            showRePassword: !values.showRePassword,
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
        <div className="mt-2 space-y-5">
            <div className="content-center">
                <TextField
                    id="standard-basic"
                    value={values.username}
                    onChange={handleChange('username')}
                    label="Họ và tên"
                    variant="standard"
                    type="text"
                    autoComplete="off"
                    fullWidth
                />
            </div>
            <div className="mt-4 content-center">
                <TextField
                    inputProps={{
                        autoComplete: 'email',
                        form: {
                            autoComplete: 'email',
                        },
                    }}
                    fullWidth
                    id="standard-basic"
                    value={values.email}
                    onChange={handleChange('email')}
                    label="Địa chỉ email"
                    variant="standard"
                    type="email"
                />
            </div>
            <div className="mt-4 content-center">
                <FormControl fullWidth variant="standard">
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
            </div>
            <div className="mt-4 content-center">
                <FormControl fullWidth variant="standard">
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
                                    {values.showRePassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </div>

            <div>
                <button
                    onClick={onSubmit}
                    className="w-full flex justify-center bg-indigo-500 text-gray-100 p-3 rounded-full tracking-wide
                                font-semibold  focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300"
                >
                    Đăng ký
                </button>
            </div>
        </div>
    );
};

export default FormRegister;
