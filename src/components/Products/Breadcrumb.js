import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { updateBanner } from '../../redux/actions/bannerAction';
import { getProducts } from '../../redux/actions/productAction';

function handleClick(event) {
    event.preventDefault();
}

export default function Breadcrumb({ title }) {
    const dispatch = useDispatch();

    const breadcrumbs = [
        <Link
            underline="hover"
            key="1"
            color="inherit"
            className="cursor-pointer text-2xl drop-shadow-lg font-medium"
            onClick={() => {
                dispatch(updateBanner(''));
                dispatch(getProducts());
            }}
        >
            Trang chủ
        </Link>,
        <Link
            underline="hover"
            key="2"
            color="inherit"
            className="cursor-pointer text-2xl drop-shadow-lg font-medium"
            onClick={handleClick}
        >
            Khuyến mại
        </Link>,
        <Typography key="3" className="drop-shadow-lg font-medium" variant="h5" color="text.primary">
            {title}
        </Typography>,
    ];

    return (
        <Stack spacing={2} className="mt-8 mb-2">
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
        </Stack>
    );
}
