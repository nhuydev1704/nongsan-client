import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const BarchartPayment = ({ products, isWebview }) => {
    return (
        <div
            style={
                !isWebview && {
                    marginLeft: '-61px',
                    width: 'calc(100% + 61px)',
                    height: '100%',
                }
            }
        >
            <ResponsiveContainer width={!isWebview ? '100%' : '100%'} height="100%">
                <BarChart data={products.filter((p) => p.sold)} barSize={20}>
                    <XAxis
                        dataKey="title"
                        tickFormatter={(value) => value.slice(0, 4) + '...'}
                        scale="point"
                        padding={{ left: 10, right: 10 }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar name="Đã bán" dataKey="sold" fill="#8884d8" background={{ fill: '#eee' }} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarchartPayment;
