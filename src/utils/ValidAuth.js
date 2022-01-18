import { validateEmail } from './common';
import GetNotification from './GetNotification';

export const ValidRegister = (data) => {
    console.log('🚀 ~ file: ValidAuth.js ~ line 5 ~ ValidRegister ~ data', data);
    if (!data.username || !data.email || !data.password || !data.re_password) {
        return GetNotification('Vui lòng điền đầy đủ thông tin!', 'error');
    }

    if (!validateEmail(data.email)) {
        return GetNotification('Email không hợp lệ!', 'error');
    }

    if (data.password.length < 6) {
        return GetNotification('Mật khẩu phải có ít nhất 6 kí tự!', 'error');
    }

    if (data.password !== data.re_password) {
        return GetNotification('Mật khẩu nhập lại không trùng khớp!', 'error');
    }

    return false;
};

export const ValidLogin = (data) => {
    if (!data.username || !data.password) {
        return GetNotification('Vui lòng điền đầy đủ thông tin!', 'error');
    }
    if (!validateEmail(data.username)) {
        return GetNotification('Email không hợp lệ!', 'error');
    }

    if (data.password.length < 6) {
        return GetNotification('Mật khẩu phải có ít nhất 6 kí tự!', 'error');
    }
    return false;
};
