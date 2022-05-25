import React from 'react';
import { getDataAPI } from '../api/fetchData';
import CardStatistic from '../components/dashboard/CardStatistic';
import LineChartTotal from '../components/dashboard/LineChartTotal';
import LayoutComponent from '../components/global/LayoutComponent';
import { formatNumber } from '../utils/common';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import PieChartReport from '../components/dashboard/PieChart';
import ColumnChart from '../components/dashboard/ColumnChart';
import { useLocation } from 'react-router-dom';

const ReportWebview = () => {
    const [reportPayment, setReportPayment] = React.useState([]);
    const [totalOrder, setTotalOrder] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const { search } = useLocation();
    const token = search.slice(search.indexOf('=') + 1);
    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await getDataAPI('report_auth', token);
            if (res.status === 200) {
                setReportPayment(res.data.payments);
                setTotalOrder(res.data.totalOrder);

                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="mt-6 px-3">
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                <CardStatistic
                    title="Đã chi"
                    total={formatNumber(reportPayment.reduce((acc, cur) => acc + cur.priceCheckout, 0))}
                    svg={
                        <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                            <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    }
                />
                <CardStatistic
                    title="Dã mua (sản phẩm)"
                    total={formatNumber(reportPayment.reduce((acc, cur) => acc + cur?.cart.length, 0))}
                    svg={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="20"
                            height="20"
                            viewBox="0 0 172 172"
                            fill="currentColor"
                        >
                            <g
                                fill="currentColor"
                                fillRule="nonzero"
                                stroke="none"
                                strokeWidth="1"
                                strokeLinecap="butt"
                                strokeLinejoin="miter"
                                strokeMiterlimit="10"
                                strokeDasharray=""
                                strokeDashoffset="0"
                                fontFamily="none"
                                fontWeight="none"
                                fontSize="none"
                                textAnchor="none"
                            >
                                <path d="M0,172v-172h172v172z" fill="none"></path>
                                <g fill="currentColor">
                                    <path d="M21.5,21.5v129h64.5v-32.25v-64.5v-32.25zM86,53.75c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25c-17.7805,0 -32.25,14.4695 -32.25,32.25zM118.25,86c-17.7805,0 -32.25,14.4695 -32.25,32.25c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25z"></path>
                                </g>
                            </g>
                        </svg>
                    }
                />
                <CardStatistic
                    title="Đơn hàng"
                    total={formatNumber(totalOrder)}
                    svg={
                        <svg fill="currentColor" viewBox="0 0 20 20" class="w-5 h-5">
                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                        </svg>
                    }
                />
                {/* <CardStatistic
                    title="Khách hàng"
                    total={formatNumber(totalUser)}
                    svg={
                        <svg fill="currentColor" viewBox="0 0 20 20" class="w-5 h-5">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                        </svg>
                    }
                /> */}
            </div>
            <div className="h-[500px] pb-12 pt-8 px-2 mb-4 bg-white rounded-lg shadow-xl">
                <h2 className="mb-3 font-bold">Biểu đồ thống kê chi tiêu</h2>
                <LineChartTotal isWebview payments={reportPayment} />
            </div>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-[500px] pb-12 pt-8 px-6 bg-white rounded-lg shadow-xl">
                    <h2>Biểu đồ thống kê giới tính khách hàng</h2>
                    <PieChartReport users={users} />
                </div>
                <div className="h-[500px] pb-12 pt-8 px-6 bg-white rounded-lg shadow-xl">
                    <h2>Biểu đồ thống kê doanh thu cao nhất 5 sản phẩm</h2>
                    <ColumnChart products={products} />
                </div>
            </div> */}
        </div>
    );
};

export default ReportWebview;
