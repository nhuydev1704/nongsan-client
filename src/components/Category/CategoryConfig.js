import moment from 'moment';
import React from 'react';

export const columns = [
    { field: 'name', headerName: 'Tên danh mục', flex: 1 },
    {
        field: 'type',
        headerName: 'Thể loại',
        flex: 1,
        renderCell: (cellValues) => {
            return <>{cellValues.value === 'agricultural' ? 'Nông sản' : 'Khác'}</>;
        },
    },
    {
        field: 'createdAt',
        headerName: 'Ngày tạo',
        flex: 1,
        renderCell: (cellValues) => {
            return <>{moment(cellValues.value).format('hh:mm YYYY-MM-DD')}</>;
        },
    },
];
