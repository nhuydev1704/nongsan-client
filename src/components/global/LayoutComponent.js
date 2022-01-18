import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Profile from '../Sidebar/Profile';
import Navigation from '../Sidebar/Navigation';
import FooterSidebar from '../Sidebar/FooterSidebar';
import SearchComponent from './SearchComponent';
import logo from './logo.png';
import { Link } from 'react-router-dom';

const LayoutComponent = ({ loading, children }) => {
    return (
        <>
            {loading && (
                <Backdrop sx={{ color: '#fff', zIndex: 999 }} open={loading}>
                    <CircularProgress color="inherit"></CircularProgress>
                </Backdrop>
            )}
            <div>
                <div className="w-80 bg-indigo-900 shadow-xl h-screen flex-col justify-between hidden lg:flex fixed">
                    <div>
                        <div className="h-16 w-full flex items-center px-8  mt-4">
                            <Link to="/">
                                <img src={logo} alt="hihi" />
                            </Link>
                        </div>
                        <Profile />
                        <Navigation />
                    </div>
                    <FooterSidebar />
                </div>
                <div className="lg:pl-80 md:pl-0 w-full">
                    <div className="px-4 py-5">
                        <SearchComponent />
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LayoutComponent;
