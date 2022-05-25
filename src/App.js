import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages';
import AuthPage from './pages/auth';
import { addSocket, refreshToken } from './redux/actions/authAction';
import { getCategories } from './redux/actions/categoryAction';
import { getPayments } from './redux/actions/paymentAction';
import { getFullProduct, getProducts } from './redux/actions/productAction';
import PageRender from './routes/PageRender';
import io from 'socket.io-client';
import { getBanners } from './redux/actions/bannerAction';
import ReportWebview from './pages/rp_webview';
import RulesWebview from './pages/rules/RulesWebview';
import PrivateWebview from './pages/private';

function App() {
    const [loadingPage, setLoadingPage] = React.useState(false);
    let checkLogin = localStorage.getItem('firstLogin');
    const { auth } = useSelector((state) => state);

    const dispatch = useDispatch();

    const { pathname } = useLocation();

    React.useEffect(() => {
        const socket = io(`${process.env.REACT_APP_API}`, { transports: ['websocket'] });
        dispatch(addSocket(socket));
        dispatch(refreshToken());
        if (!auth.token) return;
        dispatch(getCategories());
        dispatch(getBanners());
        dispatch(getProducts());
        dispatch(getPayments());
        dispatch(getFullProduct());

        return () => socket.close();
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
                <div>
                    {pathname.includes('webview') ? (
                        <Routes>
                            <Route path="/rp_webview" element={<ReportWebview />} />
                            <Route path="/rules_webview" element={<RulesWebview />} />
                            <Route path="/private_webview" element={<PrivateWebview />} />
                        </Routes>
                    ) : (
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
                    )}
                </div>
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
