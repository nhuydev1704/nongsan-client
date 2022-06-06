import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getDataAPI } from '../api/fetchData';
import LayoutComponent from '../components/global/LayoutComponent';
import HistoryOrder from '../components/HistoryOrder';

const History = () => {
    const [search, setSearch] = React.useState('');

    const { auth } = useSelector((state) => state);
    const navigate = useNavigate();

    const [historyOrder, setHistoryOrder] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [callback, setCallback] = React.useState(false);
    const [status, setStatus] = React.useState('all');
    const [filterStatus, setFilterStatus] = React.useState('all');
    const [filterPayment, setFilterPayment] = React.useState([]);
    const [filterByStatus, setFilterByStatus] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            setLoading(true);
            let res;
            if (auth.user.role === 'admin') {
                res = await getDataAPI(`payment?name[regex]=${search}`, auth.token);
            } else {
                res = await getDataAPI(`history?name[regex]=${search}`, auth.token);
            }

            setHistoryOrder(() => {
                const data = res.data.map((item) => {
                    return { ...item, id: item._id };
                });
                return data;
            });
            setLoading(false);
        })();
    }, [auth.token, auth.role, search, callback]);

    React.useLayoutEffect(() => {
        if (!auth.token) {
            navigate('/');
        }
    }, [auth.token, navigate]);

    React.useEffect(() => {
        console.log('🚀 ~ file: history.js ~ line 59 ~ React.useEffect ~ filterStatus', filterStatus);

        if (status === 'all') {
            setFilterPayment(historyOrder);
            setFilterByStatus(historyOrder);
        } else {
            setFilterPayment(historyOrder.filter((item) => item.status === status));
            setFilterByStatus(historyOrder.filter((item) => item.status === status));
        }
    }, [status, historyOrder]);

    React.useEffect(() => {
        if (filterStatus === 'all') {
            setFilterPayment(filterByStatus);
        } else {
            if (filterStatus === '1') {
                setFilterPayment(filterByStatus.filter((item) => !item.type));
            } else {
                setFilterPayment(filterByStatus.filter((item) => item.type));
            }
        }
    }, [filterStatus]);

    return (
        <LayoutComponent title="Lịch sử đặt hàng" isBack isSearchOder setSearch={setSearch}>
            <HistoryOrder
                historyOrder={filterPayment && filterPayment.length > 0 && filterPayment}
                loading={loading}
                auth={auth}
                setCallback={setCallback}
                callback={callback}
                status={status}
                setStatus={setStatus}
                filterPayment={filterStatus}
                setFilterPayment={setFilterStatus}
            />
        </LayoutComponent>
    );
};

export default History;
