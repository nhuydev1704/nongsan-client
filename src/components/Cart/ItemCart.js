import React from 'react';
import { formatNumber } from '../../utils/common';

const ItemCart = ({ item, handleDelete, decrement, increment, updateQuantity }) => {
    return (
        <div className="flex justify-between items-center mt-6 pt-6 shadow-md rounded-md px-4 py-2 bg-slate-100 relative border-t border-solid border-slate-50">
            <div className="flex items-center">
                <img src={item.image} width="60" height="60" className="rounded-full h-[60px]" alt="lỗi ảnh rồi" />
                <div className="flex flex-col ml-3">
                    <span className="md:text-md font-medium">{item?.title}</span>
                    <span className="text-xs font-light text-gray-400">#{item?.category?.name}</span>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <div className="pr-8 flex ">
                    <span className="font-semibold cursor-pointer" onClick={() => decrement(item._id)}>
                        -
                    </span>
                    <input
                        type="text"
                        className="focus:outline-none border h-6 w-8 rounded text-sm px-2 mx-2"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item._id, e.target.value)}
                    />
                    <span className="font-semibold cursor-pointer" onClick={() => increment(item._id)}>
                        +
                    </span>
                </div>
                <div className="pr-8">
                    <span className="text-xs font-medium w-16 block">
                        ${formatNumber(item?.price * item?.quantity ?? 0)}
                    </span>
                </div>
                <div>
                    <i className="fa fa-close text-xs font-medium"></i>
                </div>
            </div>
            <div
                onClick={() => handleDelete(item._id)}
                className="absolute top-3 right-2 rounded-full inline-flex items-center justify-center text-red-600 hover:opacity-60 focus:outline-none cursor-pointer"
            >
                <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
        </div>
    );
};

export default ItemCart;
