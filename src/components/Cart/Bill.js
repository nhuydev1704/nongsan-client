import * as React from 'react';
import { formatNumber } from '../../utils/common';

const Bill = ({ products, inforCustomer }) => {
    return (
        <>
            <div className="overflow-visible flex justify-between items-center mt-2 w-[15.71rem] mb-6">
                <div className="flex flex-col w-full">
                    <span className="text-lg font-medium text-gray-200 mb-2">Danh sách sản phẩm</span>
                    {products.map((product, index) => (
                        <div className="flex justify-between mb-3" key={index}>
                            <span className="text-white w-[60%] break-words truncate ">{product.title}</span>
                            <span className="text-white w-[40%] text-right truncate ">
                                {formatNumber(product.price)}
                            </span>
                        </div>
                    ))}
                    <div className="flex justify-between mb-3">
                        <span className="text-white font-bold">Tổng tiền</span>
                        <span className="text-white font-bold">
                            {formatNumber(products.reduce((init, prev) => Number(init) + Number(prev.price), [0]))}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-col mb-2">
                            <span className="text-white font-bold mb-2">Địa chỉ</span>
                            <span className="text-white ml-2">{inforCustomer.address}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white font-bold mb-2">Thông tin</span>
                            <div className="flex ml-2">
                                <span className="text-white">Họ tên:</span>
                                <span className="text-white ml-2 mb-2">{inforCustomer.name}</span>
                            </div>
                            <div className="flex ml-2">
                                <span className="text-white">Số điện thoại:</span>
                                <span className="text-white ml-2">{inforCustomer.phone}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[10px] flex justify-center items-center flex-col relative"></div>
            </div>
        </>
    );
};

export default Bill;
