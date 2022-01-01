import { toast } from 'react-toastify';

const GetNotification = (text, status = '') => {
    if (status) {
        return toast[`${status}`](text, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            pauseOnHover: false,
        });
    } else {
        return toast(text, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            pauseOnHover: false,
        });
    }
};

export default GetNotification;
