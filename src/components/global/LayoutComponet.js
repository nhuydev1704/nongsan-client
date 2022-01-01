import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const LayoutComponet = ({ loading, children }) => {
    return (
        <>
            <Backdrop sx={{ color: '#fff', zIndex: 999 }} open={loading}>
                <CircularProgress color="inherit"></CircularProgress>
            </Backdrop>
            {children}
        </>
    );
};

export default LayoutComponet;
