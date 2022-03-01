import { CardActionArea, CardContent, CardMedia, Rating, Stack, Typography } from '@mui/material';
import React from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { formatNumber } from '../../utils/common';
import SliderWrapper from '../Products/_SlickSliderStyle';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';
import ItemProduct from '../Products/ItemProduct';

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
    arrows: false,
};
const ProviewBanner = ({ id, dataBanner }) => {
    const [bannerList, setBannerList] = React.useState([]);
    const { banners } = useSelector((state) => state);

    React.useEffect(() => {
        banners.banner && banners.banner.length > 0 && setBannerList(banners.banner);
    }, [banners.banner]);

    React.useEffect(() => {
        if (id) return;
        if (dataBanner.image && dataBanner.category) {
            setBannerList([
                ...bannerList,
                { ...dataBanner, image: id ? dataBanner.image : window.URL.createObjectURL(dataBanner.image) },
            ]);
        }
    }, [dataBanner.image]);

    return (
        <div>
            <div className="text-base text-left mx-6 py-6">Preview banner</div>
            <div className="w-full flex px-6">
                <CardActionArea>
                    <SliderWrapper>
                        <Slider {...settings}>
                            {bannerList &&
                                bannerList.length > 0 &&
                                bannerList.map((item, index) => (
                                    <div key={item._id} className="w-screen testimoni--wrapper">
                                        <img
                                            src={item.image}
                                            style={{
                                                zIndex: -1,
                                            }}
                                            alt="banner_sua"
                                        />
                                    </div>
                                ))}
                        </Slider>
                    </SliderWrapper>
                </CardActionArea>
            </div>
        </div>
    );
};

export default ProviewBanner;
