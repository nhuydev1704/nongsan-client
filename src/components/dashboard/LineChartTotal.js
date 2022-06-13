import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import { formatNumber } from '../../utils/common';

const CustomizedLabel = (props) => {
    const { x, y, stroke, value } = props;
    return (
        <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
            {formatNumber(value)}
        </text>
    );
};

const CustomTooltip = ({ active, payload, label, isWebview }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white shadow-lg rounded-lg p-4">
                <p className="mb-1">
                    {`Ngày : `} <span className="font-bold">{label}</span>
                </p>
                <p>
                    {`${isWebview ? 'Tổng chi' : 'Doanh thu'} : `}{' '}
                    <span className="font-bold">{formatNumber(payload[0].value)}</span>
                </p>
            </div>
        );
    }

    return null;
};

const LineChartTotal = ({ payments, isWebview }) => {
    let sumedUpDates = [];
    let prices = [];
    let carts = [];

    function isDateSumedUp(date) {
        return sumedUpDates.indexOf(date.substring(0, 10)) !== -1;
    }

    function sumUpDate(date) {
        let sum = 0;
        let lengthCart = 0;

        payments.forEach((t) => {
            if (t.createdAt.substring(0, 10) === date.substring(0, 10)) {
                sum += parseInt(t.priceCheckout);
                lengthCart += t?.cart?.length;
            }
        });

        sumedUpDates.push(date.substring(0, 10));
        prices.push(sum);
        carts.push(lengthCart);
    }

    payments.forEach((t) => {
        if (!isDateSumedUp(t.createdAt)) {
            sumUpDate(t.createdAt);
        }
    });

    var obj = {};
    var obj2 = {};
    sumedUpDates.forEach((d, i) => (obj[d] = prices[i]));
    sumedUpDates.forEach((d, i) => (obj2[d] = carts[i]));

    const data = [];

    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            const valueCart = obj2[key];
            data.push({ createdAt: key, priceCheckout: value, cart: valueCart });
        }
    }

    return (
        <>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data ? data : []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="createdAt" height={60} />
                    {!isWebview && <YAxis />}
                    <Tooltip content={<CustomTooltip isWebview={isWebview} />} />
                    <Legend />
                    {isWebview ? (
                        <Line
                            name="Chi tiêu"
                            type="monotone"
                            dataKey="priceCheckout"
                            stroke="#8884d8"
                            label={<CustomizedLabel />}
                        />
                    ) : (
                        <Line type="monotone" dataKey="priceCheckout" stroke="#8884d8" label={<CustomizedLabel />} />
                    )}
                    {isWebview ? (
                        <Line name="Ngày chi" type="monotone" dataKey="cart" stroke="#82ca9d" />
                    ) : (
                        <Line type="monotone" dataKey="cart" stroke="#82ca9d" />
                    )}
                </LineChart>
            </ResponsiveContainer>
        </>
    );
};

export default LineChartTotal;
