import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages';
import AuthPage from './pages/auth';
import { refreshToken } from './redux/actions/authAction';
import { getCategories } from './redux/actions/categoryAction';
import { getPayments } from './redux/actions/paymentAction';
import { getProducts } from './redux/actions/productAction';
import PageRender from './routes/PageRender';

function App() {
    const [loadingPage, setLoadingPage] = React.useState(false);
    let checkLogin = localStorage.getItem('firstLogin');
    const { auth } = useSelector((state) => state);

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(refreshToken());
        if (!auth.token) return;
        dispatch(getCategories());
        dispatch(getProducts());
        dispatch(getPayments());
    }, [dispatch, auth.token]);

    React.useEffect(() => {
        if (auth.token) {
            setLoadingPage(true);
            return;
        }
        const timeOutLoading = setTimeout(() => {
            setLoadingPage(true);
        }, 2000);
        return () => clearTimeout(timeOutLoading);
    }, [auth.token]);

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
