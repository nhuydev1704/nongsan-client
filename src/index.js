import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './static/reset.css';
import './static/index.css';
import 'react-toastify/dist/ReactToastify.css';
import DataProvider from './redux/store';
import { ToastContainer } from 'react-toastify';
import './index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'moment/locale/vi'; // without this line it didn't work
import moment from 'moment';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom';

moment.locale('vi');

ReactDOM.render(
    <React.StrictMode>
        <DataProvider>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
            />
            <Router>
                <App />
            </Router>
        </DataProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
