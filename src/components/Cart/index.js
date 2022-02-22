import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addCart, rmCart } from '../../redux/actions/authAction';
import { formatNumber } from '../../utils/common';
import ItemCart from './ItemCart';
import logo from '../global/logo.png';
import moment from 'moment';
import Address from './Address';
import Bill from './Bill';
import GetNotification from '../../utils/GetNotification';
import { createPayment, getPayments } from '../../redux/actions/paymentAction';
import { postDataAPI } from '../../api/fetchData';
import emptyCart from './emptyCart.png';
import { Button } from '@mui/material';

const initialState = {
    name: '',
    address: '',
    phone: '',
};

const Cart = ({ cart }) => {
    const dispatch = useDispatch();
    const { auth } = useSelector((state) => state);
    const [inforCustomer, setInfoCustomer] = React.useState(initialState);
    const [isBill, setIsBill] = React.useState(false);

    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="flex items-center flex-col">
                <img src={emptyCart} alt="empty_cart" />
                <Button variant="contained">
                    <Link to="/">Tiếp tục mua sắm</Link>
                </Button>
            </div>
        );
    }

    const handleDelete = (id) => {
        const newCart = cart.filter((item) => item._id !== id);
        dispatch(addCart({ loged: auth?.token, product: '', cart: newCart, token: auth.token }));
    };

    const increment = (id) => {
        const newCart = cart.map((item) => {
            if (item._id === id) {
                return { ...item, quantity: (item.quantity += 1) };
            }
            return item;
        });

        dispatch(addCart({ loged: auth?.token, product: '', cart: newCart, token: auth.token }));
    };

    const updateQuantity = (id, value) => {
        const newCart = cart.map((item) => {
            if (item._id === id) {
                return { ...item, quantity: value ? value : 0 };
            }
            return item;
        });

        dispatch(addCart({ loged: auth?.token, product: '', cart: newCart, token: auth.token }));
    };

    const decrement = (id) => {
        const newCart = cart.map((item) => {
            if (item._id === id) {
                return { ...item, quantity: item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1) };
            }
            return item;
        });

        dispatch(addCart({ loged: auth?.token, product: '', cart: newCart, token: auth.token }));
    };

    const handleChange = (e) => {
        setInfoCustomer({ ...inforCustomer, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (inforCustomer.name === '' || inforCustomer.address === '' || inforCustomer.phone === '') {
            GetNotification('Vui lòng nhập đầy đủ thông tin', 'error');
            return;
        }
        const res = await postDataAPI(
            'payment',
            {
                user: auth.user._id,
                cart,
                name: inforCustomer.name,
                address: inforCustomer.address,
                phone: inforCustomer.phone,
                priceCheckout: cart.reduce((init, prev) => Number(init) + Number(prev.price * prev.quantity), [0]),
            },
            auth.token
        );
        if (res.status === 200) {
            dispatch(rmCart(auth.token));
            GetNotification(res.data.msg, 'success');
            dispatch(getPayments());

            navigate('/');
        }
    };

    return (
        <div className="h-[89vh] flex items-center mt-36 md:mt-0">
            <div className="max-w-md mx-auto shadow-xl rounded-2xl md:max-w-5xl border-t border-solid border-slate-50 bg-slate-200">
                <div className="md:flex ">
                    <div className="w-full p-4 px-1 sm:px-5 py-5">
                        <div className="md:grid md:grid-cols-3 gap-2 ">
                            <div className="col-span-2 p-5">
                                <h1 className="text-xl font-medium ">Giỏ hàng</h1>
                                {cart.map((item) => (
                                    <ItemCart
                                        key={item._id}
                                        item={item}
                                        handleDelete={handleDelete}
                                        decrement={decrement}
                                        updateQuantity={updateQuantity}
                                        increment={increment}
                                    />
                                ))}
                                <div className="flex justify-between items-center mt-6 pt-6 border-t">
                                    <Link to="/" className="flex items-center">
                                        <i className="fa fa-arrow-left text-sm pr-2"></i>
                                        <span className="text-md font-medium text-blue-500">Tiếp tục mua sắm</span>
                                    </Link>
                                    <div className="flex justify-center items-end">
                                        <span className="text-sm font-medium text-gray-400 mr-1">Tổng tiền:</span>
                                        <span className="text-lg font-bold text-gray-800 ">
                                            $
                                            {formatNumber(
                                                cart.reduce(
                                                    (init, prev) => Number(init) + Number(prev.price * prev.quantity),
                                                    [0]
                                                )
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className=" p-5 bg-gray-800 rounded overflow-visible">
                                <span className="text-xl font-medium text-gray-100 block pb-3">
                                    {isBill ? 'Chi tiết hóa đơn' : 'Chi tiết đơn hàng'}
                                </span>
                                {isBill ? (
                                    <Bill products={cart} inforCustomer={inforCustomer} />
                                ) : (
                                    <Address inforCustomer={inforCustomer} handleChange={handleChange} />
                                )}
                                {isBill ? (
                                    <div className="flex">
                                        <button
                                            onClick={() => setIsBill(false)}
                                            className="h-10 w-1/2 mr-2  rounded focus:outline-none text-white hover:opacity-50"
                                        >
                                            Trở lại
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            className="h-10 w-full bg-blue-500 rounded focus:outline-none text-white hover:bg-blue-600"
                                        >
                                            Đặt hàng
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setIsBill(true)}
                                        className="h-10 w-full bg-blue-500 rounded focus:outline-none text-white hover:bg-blue-600"
                                    >
                                        Đặt hàng
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
