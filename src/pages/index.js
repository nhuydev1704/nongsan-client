import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton, Skeleton, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { deleteDataAPI } from '../api/fetchData';
import noData from '../assets/images/Nodata.gif';
import Filter from '../components/Filter';
import LayoutComponent from '../components/global/LayoutComponent';
import Breadcrumb from '../components/Products/Breadcrumb';
import DetailProduct from '../components/Products/DetailProduct';
import ItemProduct from '../components/Products/ItemProduct';
import SliderWrapper from '../components/Products/_SlickSliderStyle.js';
import { getBanners, updateBanner } from '../redux/actions/bannerAction';
import { findProductDiscount, getProducts } from '../redux/actions/productAction';
import GetNotification from '../utils/GetNotification';
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style, display: 'block', right: '20px' }} onClick={onClick} />;
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', left: '20px', zIndex: 9999 }}
            onClick={onClick}
        />
    );
}

const settings = {
    className: 'banner_auto',
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 4000,
    infinite: true,
    variableWidth: true,
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: (i) => (
        <div className="ft-slick__dots--custom">
            <div className="loading" />
        </div>
    ),
    pauseOnHover: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
};
const HomePage = () => {
    const [openDraw, setOpenDraw] = React.useState(false);
    const [detailProduct, setDetailProduct] = React.useState({});
    const [page, setPage] = React.useState(1);

    const { products, loading, category, auth, banners } = useSelector((state) => state);
    const admin = auth?.user?.role === 'admin';
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (products.defaultPage) {
            setPage(1);
        }
    }, [products.defaultPage]);

    return (
        <LayoutComponent>
            <SliderWrapper>
                <Slider {...settings}>
                    {banners.banner &&
                        banners.banner.length > 0 &&
                        banners.banner.map((item, index) => (
                            <div
                                key={item._id}
                                onClick={() => {
                                    dispatch(findProductDiscount(item.category));
                                    dispatch(updateBanner(item.title));
                                }}
                                className="w-screen testimoni--wrapper cursor-pointer max-h-[320px] relative"
                            >
                                <img
                                    src={item.image}
                                    style={{
                                        width: 'calc(100vw - 270px)',
                                        maxHeight: '320px',
                                        minHeight: '320px',
                                        zIndex: -1,
                                        // objectFit: 'cover',
                                    }}
                                    alt="banner_sua"
                                />
                                {admin && (
                                    <>
                                        <div className="absolute top-4 z-50-">
                                            <Tooltip arrow title="Sửa thông tin banner" placement="top">
                                                <Link to={`/banner/${item._id}`}>
                                                    <IconButton aria-label="edit">
                                                        <EditIcon style={{ fontSize: '36px' }} />
                                                    </IconButton>
                                                </Link>
                                            </Tooltip>
                                        </div>
                                        <div className="absolute top-20 z-50">
                                            <Tooltip arrow title="Xóa banner" placement="top">
                                                <IconButton
                                                    onClick={async () => {
                                                        const res = await deleteDataAPI(`banner/${item._id}`);
                                                        GetNotification(res.data.msg, 'success');
                                                        dispatch(getBanners());
                                                    }}
                                                    aria-label="delete"
                                                >
                                                    <DeleteIcon style={{ fontSize: '36px' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                </Slider>
            </SliderWrapper>
            {
                <>
                    {banners.title ? (
                        <Breadcrumb title={banners.title} />
                    ) : (
                        <h2 className="text-3xl font-medium opacity-80 mt-8 mb-2 drop-shadow-lg">
                            {category?.children?.title}
                        </h2>
                    )}
                </>
            }
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
                <div className="flex justify-center mt-10">
                    {products.products.length < 8 ? (
                        <></>
                    ) : (
                        !loading &&
                        !products.isSearch &&
                        products.products.length > 0 &&
                        (products.result < page * 8 ? (
                            ''
                        ) : (
                            <Button
                                variant="contained"
                                onClick={() => {
                                    dispatch(
                                        getProducts(
                                            products.params.replace(
                                                products.params.slice(
                                                    products.params.indexOf('limit=') + 6,
                                                    products.params.indexOf('&')
                                                ),
                                                (page + 1) * 8
                                            )
                                        )
                                    );
                                    setPage(page + 1);
                                }}
                            >
                                Tải thêm
                            </Button>
                        ))
                    )}
                </div>
                <div className="flex justify-center">
                    {auth?.token && !(products.products.length > 0) && !loading && (
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
