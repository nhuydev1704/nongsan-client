import React from 'react';

const Address = ({ inforCustomer, handleChange }) => {
    return (
        <>
            <span className="text-xs text-gray-400 ">Đơn hàng</span>
            <div className="overflow-visible flex justify-center md:justify-between items-center mt-2">
                <div className="rounded w-60 h-28 bg-gray-500 py-2 px-4 relative right-10">
                    <span className="italic text-lg font-medium text-gray-200 underline">Agricultural</span>
                    <div className="flex justify-between items-center pt-4 ">
                        {inforCustomer.address ? (
                            <span className="text-xs text-gray-200 font-medium truncate">{inforCustomer.address}</span>
                        ) : (
                            <>
                                <span className="text-xs text-gray-200 font-medium">****</span>
                                <span className="text-xs text-gray-200 font-medium">****</span>
                                <span className="text-xs text-gray-200 font-medium">****</span>
                                <span className="text-xs text-gray-200 font-medium">****</span>
                            </>
                        )}
                    </div>
                    <div className="flex justify-between items-center mt-3">
                        <span className="text-xs text-gray-200">
                            {inforCustomer.name ? inforCustomer.name : '*******'}
                        </span>
                        <span className="text-xs text-gray-200">
                            {inforCustomer.phone ? inforCustomer.phone : '*******'}
                        </span>
                    </div>
                </div>
                <div className="w-[10px] flex justify-center items-center flex-col relative"></div>
            </div>
            <div className="flex justify-center flex-col pt-3">
                <label className="text-xs text-gray-400 ">Họ tên</label>
                <input
                    value={inforCustomer.name}
                    onChange={handleChange}
                    name="name"
                    type="text"
                    className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                    placeholder="Họ và tên"
                />
            </div>
            <div className="flex justify-center flex-col pt-3">
                <label className="text-xs text-gray-400 ">Địa chỉ nhận hàng</label>
                <input
                    value={inforCustomer.address}
                    onChange={handleChange}
                    name="address"
                    type="text"
                    className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                    placeholder="Địa chỉ nhận hàng"
                />
            </div>
            <div className="flex justify-center flex-col pt-3 mb-4">
                <label className="text-xs text-gray-400 ">Số điện thoại</label>
                <input
                    value={inforCustomer.phone}
                    onChange={handleChange}
                    name="phone"
                    type="text"
                    className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                    placeholder="123456789"
                />
            </div>
        </>
    );
};

export default Address;
