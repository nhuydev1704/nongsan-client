import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react';
import { useSelector } from 'react-redux';
import Filter from '../components/Filter';
import LayoutComponent from '../components/global/LayoutComponent';
import DetailProduct from '../components/Products/DetailProduct';
import ItemProduct from '../components/Products/ItemProduct';
import noData from '../assets/images/Nodata.gif';
const HomePage = () => {
    const [openDraw, setOpenDraw] = React.useState(false);
    const [detailProduct, setDetailProduct] = React.useState({});

    const { products, loading, category } = useSelector((state) => state);

    return (
        <LayoutComponent>
            <h2 className="text-3xl font-medium opacity-80 mt-4 mb-2">{category?.children?.title}</h2>
            <Filter />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {!loading &&
                        products.products &&
                        products.products.length > 0 &&
                        products.products.map((product, index) => (
                            <Grid key={product._id} item xs={12} sm={6} md={4} lg={3} xl={3}>
                                <ItemProduct
                                    product={product}
                                    setDetailProduct={setDetailProduct}
                                    setOpenDraw={setOpenDraw}
                                />
                            </Grid>
                        ))}
                    {loading &&
                        Array.from(new Array(8)).map((item, index) => (
                            <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={3}>
                                <Skeleton
                                    variant="rectangular"
                                    animation="wave"
                                    height={250}
                                    style={{ borderRadius: '4px', backgroundColor: 'rgba(0,0,0,0.04)' }}
                                />
                            </Grid>
                        ))}
                </Grid>
                <div className="flex justify-center">
                    {!(products.products.length > 0) && (
                        <div className="flex flex-col items-center">
                            <img className="h-[400px] w-[400px]" src={noData} alt="no data..." />
                            <span className="text-center text-[3rem]">Danh mục chưa có sản phẩm!</span>
                        </div>
                    )}
                </div>
            </Box>
            <DetailProduct detailProduct={detailProduct} openDraw={openDraw} setOpenDraw={setOpenDraw} />
        </LayoutComponent>
    );
};

export default HomePage;
