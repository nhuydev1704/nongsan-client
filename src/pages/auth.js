import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormLogin from '../components/Auth/FormAuth/FormLogin';
import FormRegister from '../components/Auth/FormAuth/FormRegister';
import SocialLogin from '../components/Auth/Social';
import LayoutComponent from '../components/global/LayoutComponent';

const AuthPage = () => {
    const [isLogin, setIsLogin] = React.useState(true);

    let navigate = useNavigate();

    const { auth, loading } = useSelector((state) => state);

    React.useEffect(() => {
        if (auth.token) navigate('/');
    }, [auth.token, navigate]);

    return (
        <LayoutComponent loading={loading}>
            <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 fixed inset-0">
                <div className="h-screen w-full flex items-center justify-center">
                    <div className="max-w-lg w-full space-y-5 p-10 bg-white rounded-xl z-10">
                        <div className="text-center">
                            <h2 className="mt-6 text-3xl font-bold text-gray-900">Chào mừng bạn!</h2>
                            <p className="mt-2 text-sm text-gray-600">
                                {isLogin
                                    ? 'Xin hãy đăng nhập tài khoản của bạn'
                                    : 'Xin nhập đầy đủ thông tin để đăng ký'}
                            </p>
                        </div>
                        <div className="pt-2 flex flex-row justify-center items-center space-x-3">
                            <SocialLogin />
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                            <span className="h-px w-16 bg-gray-300"></span>
                            <span className="text-gray-500 font-normal">HOẶC</span>
                            <span className="h-px w-16 bg-gray-300"></span>
                        </div>
                        {isLogin ? <FormLogin /> : <FormRegister />}
                        <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                            <span>
                                {isLogin ? 'Bạn chưa có tài khoản?' : 'Bạn đã có tài khoản?'}{' '}
                                <span
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300"
                                >
                                    {isLogin ? 'Đăng ký' : 'Đăng nhập'}
                                </span>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </LayoutComponent>
    );
};

export default AuthPage;
