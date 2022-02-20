import moment from 'moment';
import { formatNumber } from '../../utils/common';
export const columns = [
    { field: 'name', headerName: 'Tên đặt hàng', flex: 1 },
    { field: 'address', headerName: 'Địa chỉ', flex: 1 },
    { field: 'phone', headerName: 'Số điện thoại', flex: 1 },
    {
        field: 'priceCheckout',
        headerName: 'Tổng tiền',
        flex: 1,
        renderCell: (cellValues) => {
            return <>{formatNumber(Number(cellValues.value))} VND</>;
        },
    },
];
