import { Container } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/global/Header';
import HomePage from './pages';
import AuthPage from './pages/auth';
import { refreshToken } from './redux/actions/authAction';
import { getCategories } from './redux/actions/categoryAction';
import { getProducts } from './redux/actions/productAction';
import PageRender from './routes/PageRender';

function App() {
    const [loadingPage, setLoadingPage] = React.useState(false);
    let checkLogin = localStorage.getItem('firstLogin');
    const { auth } = useSelector((state) => state);

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(refreshToken());
        dispatch(getCategories());
        dispatch(getProducts());
    }, [dispatch]);

    React.useEffect(() => {
        const timeOutLoading = setTimeout(() => {
            setLoadingPage(true);
        }, 2000);
        return () => clearTimeout(timeOutLoading);
    }, []);

    return (
        <>
            {loadingPage ? (
                <Router>
                    {/* {auth.token && <Header />} */}
                    <div>
                        <Routes>
                            <Route path="/" element={auth?.token && checkLogin ? <HomePage /> : <AuthPage />} />
                            <Route
                                path="/:page"
                                element={auth?.token && checkLogin ? <PageRender /> : <Navigate to="/" />}
                            />
                            <Route
                                path="/:page/:id"
                                element={auth?.token && checkLogin ? <PageRender /> : <Navigate to="/" />}
                            />
                        </Routes>
                    </div>
                </Router>
            ) : (
                <div className="page_loading">
                    <div className="box">
                        <div className="coin"></div>
                    </div>
                </div>
            )}{' '}
        </>
    );
}

export default App;
