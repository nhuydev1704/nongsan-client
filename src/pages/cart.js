import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cart from '../components/Cart';
import LayoutComponent from '../components/global/LayoutComponent';

const CartPage = () => {
    const { auth } = useSelector((state) => state);
    const navigate = useNavigate();

    React.useLayoutEffect(() => {
        if (!auth.token) {
            navigate('/');
        }
    }, [auth.token, navigate]);

    return (
        <LayoutComponent title="Giỏ hàng" isBack>
            <Cart cart={auth.cart} />
        </LayoutComponent>
    );
};

export default CartPage;
