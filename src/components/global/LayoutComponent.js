import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Profile from '../Sidebar/Profile';
import Navigation from '../Sidebar/Navigation';
import FooterSidebar from '../Sidebar/FooterSidebar';
import SearchComponent from './SearchComponent';
import logo from './logo.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LayoutComponent = ({ loading, children }) => {
    const { auth } = useSelector((state) => state);

    return (
        <>
            {loading && (
                <Backdrop sx={{ color: '#fff', zIndex: 999 }} open={loading}>
                    <CircularProgress color="inherit"></CircularProgress>
                </Backdrop>
            )}
            <div>
                <div className="w-[19rem] bg-indigo-900 shadow-xl h-screen flex-col justify-between hidden lg:flex fixed overflow-y-auto">
                    <div>
                        <div className="h-14 w-full flex items-center px-8 mt-4">
                            <Link to="/">
                                <img src={logo} alt="hihi" />
                            </Link>
                        </div>
                        <Profile />
                        <Navigation />
                    </div>
                    <FooterSidebar />
                </div>
                <div className="lg:pl-[19rem] md:pl-0 w-full">
                    {auth.token && <SearchComponent />}
                    <div className="px-4 py-5 pt-[4rem]">{children}</div>
                </div>
            </div>
        </>
    );
};

export default LayoutComponent;
