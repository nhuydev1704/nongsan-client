import React from 'react';

const CardStatistic = ({ svg, title, total }) => {
    return (
        <div className="min-w-0 rounded-lg shadow-lg overflow-hidden bg-white">
            <div className="p-4 flex items-center">
                <div className="p-3 rounded-full text-orange-500 bg-orange-100 mr-4">{svg}</div>
                <div>
                    <p className="mb-2 text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-lg font-semibold text-gray-700">{total}</p>
                </div>
            </div>
        </div>
    );
};

export default CardStatistic;
