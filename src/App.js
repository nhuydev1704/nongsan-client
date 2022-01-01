import { Container } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Header from './components/global/Header';
import { GlobalStyles } from './GlobalStyles';
import { useDarkMode } from './hooks/useDarkMode';
import PageRender from './PageRender';
import HomePage from './pages';
import AuthPage from './pages/auth';
import { refreshToken } from './redux/actions/authAction';
import { darkTheme, lightTheme } from './static/theme/Theme';
function App() {
    const [loadingPage, setLoadingPage] = React.useState(false);
    let checkLogin = localStorage.getItem('firstLogin');
    const { auth } = useSelector((state) => state);
    console.log('🚀 ~ file: App.js ~ line 17 ~ App ~ auth', auth);

    const dispatch = useDispatch();

    const [theme, themeToggler] = useDarkMode();

    React.useEffect(() => {
        dispatch(refreshToken());
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
                <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
                    <Router>
                        <GlobalStyles />
                        {auth.token && <Header theme={theme} themeToggler={themeToggler} />}
                        <Container maxWidth="xxl">
                            <div style={{ marginTop: auth.token ? '84px' : 0 }}>
                                <Routes>
                                    <Route path="/" element={auth?.token || checkLogin ? <HomePage /> : <AuthPage />} />
                                    <Route
                                        path="/:page"
                                        element={auth?.token || checkLogin ? <PageRender /> : <AuthPage />}
                                    />
                                    <Route
                                        path="/:page/:id"
                                        element={auth?.token || checkLogin ? <PageRender /> : <AuthPage />}
                                    />
                                </Routes>
                            </div>
                        </Container>
                    </Router>
                </ThemeProvider>
            ) : (
                <div className="page_loading" style={{ backgroundColor: theme === 'light' ? '#fff' : '#363537' }}>
                    <div className="box">
                        <div className="coin"></div>
                    </div>
                </div>
            )}{' '}
        </>
    );
}

export default App;
