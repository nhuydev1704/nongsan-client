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
    }, [auth.token, auth.role, search]);

    React.useLayoutEffect(() => {
        if (!auth.token) {
            navigate('/');
        }
    }, [auth.token, navigate]);

    return (
        <LayoutComponent title="Lịch sử đặt hàng" isBack isSearchOder setSearch={setSearch}>
            <HistoryOrder historyOrder={historyOrder} loading={loading} auth={auth} />
        </LayoutComponent>
    );
};

export default History;
