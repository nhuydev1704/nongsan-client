import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './static/reset.css';
import './static/index.css';
import 'react-toastify/dist/ReactToastify.css';
import DataProvider from './redux/store';
import { ToastContainer } from 'react-toastify';
import './index.css';
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
            <App />
        </DataProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
