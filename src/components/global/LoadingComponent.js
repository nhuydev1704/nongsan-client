import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

const LoadingComponent = ({ loading, children }) => {
    return (
        <>
            {loading && (
                <Backdrop sx={{ color: '#fff', zIndex: 999 }} open={loading}>
                    <CircularProgress color="inherit"></CircularProgress>
                </Backdrop>
            )}
            {children}
        </>
    );
};

export default LoadingComponent;
