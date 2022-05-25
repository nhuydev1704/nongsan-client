import React from 'react';
import { ComposedChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ColumnChart = ({ products }) => {
    const dataReport = products
        .sort((a, b) => b?.sold - a?.sold)
        .map((product, index) => {
            if (product.sold && index < 5) {
                return {
                    name: product?.title,
                    sl: product.sold,
                    dt: product.sold * product.price,
                };
            }
            return null;
        })
        .filter((item) => item);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
                layout="vertical"
                width={500}
                height={400}
                data={dataReport}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                }}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis type="number" />
                <YAxis
                    tickFormatter={(value) => value.slice(0, 6) + '...'}
                    dataKey="name"
                    type="category"
                    scale="band"
                />
                <Tooltip />
                <Legend />
                <Area name="Số lượng" dataKey="sl" fill="#8884d8" stroke="#8884d8" />
                <Bar name="Doanh thu" dataKey="dt" barSize={20} fill="#413ea0" />
                {/* <Line dataKey="uv" stroke="#ff7300" /> */}
            </ComposedChart>
        </ResponsiveContainer>
    );
};

export default ColumnChart;
