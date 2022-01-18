import React from 'react';
import Filter from '../components/Filter';
import LayoutComponent from '../components/global/LayoutComponent';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import ItemProduct from '../components/Products/ItemProduct';
import { useSelector } from 'react-redux';
import DetailProduct from '../components/Products/DetailProduct';

const HomePage = () => {
    const [openDraw, setOpenDraw] = React.useState(false);
    const [detailProduct, setDetailProduct] = React.useState({});

    const { products } = useSelector((state) => state);

    return (
        <LayoutComponent>
            Title
            <Filter />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                    {products.products &&
                        products.products.length > 0 &&
                        products.products.map((product, index) => (
                            <Grid key={product._id} item xs={12} sm={6} md={6} lg={4} xl={3}>
                                <ItemProduct
                                    product={product}
                                    setDetailProduct={setDetailProduct}
                                    setOpenDraw={setOpenDraw}
                                />
                            </Grid>
                        ))}
                </Grid>
            </Box>
            <DetailProduct detailProduct={detailProduct} openDraw={openDraw} setOpenDraw={setOpenDraw} />
        </LayoutComponent>
    );
};

export default HomePage;
