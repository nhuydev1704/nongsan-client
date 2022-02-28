import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/actions/authAction';
import { ValidLogin } from '../../../utils/ValidAuth';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const initialState = {
    username: '',
    password: '',
    showPassword: false,
};

const FormLogin = () => {
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

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onSubmit = async () => {
        const rs = ValidLogin(values);
        if (!rs) {
            dispatch(login(values));
        }
    };

    React.useEffect(() => {
        const listener = (event) => {
            if (event.code === 'Enter' || event.code === 'NumpadEnter') {
                event.preventDefault();
                onSubmit();
            }
        };
        document.addEventListener('keydown', listener);
        return () => {
            document.removeEventListener('keydown', listener);
        };
    }, [values]);

    return (
        <div className="mt-2 space-y-5">
            <div className="relative">
                <TextField
                    inputProps={{
                        autoComplete: 'email',
                        form: {
                            autoComplete: 'email',
                        },
                    }}
                    fullWidth
                    id="standard-basic"
                    value={values.username}
                    onChange={handleChange('username')}
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
            <div className="flex items-center justify-between pt-2">
                <div className="flex items-center">
                    <span className="flex items-center ml-2 text-sm text-gray-900">
                        <Checkbox {...label} defaultChecked />
                        Nhớ mật khẩu
                    </span>
                </div>
                <div className="text-sm">
                    <span className="font-medium text-indigo-500 hover:text-indigo-500 mr-4 cursor-pointer">
                        Quên mật khẩu?
                    </span>
                </div>
            </div>
            <div>
                <button
                    onClick={onSubmit}
                    className="w-full flex justify-center bg-indigo-500 text-gray-100 p-3 rounded-full tracking-wide
                                font-semibold  focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300"
                >
                    Đăng nhập
                </button>
            </div>
        </div>
    );
};

export default React.memo(FormLogin);
