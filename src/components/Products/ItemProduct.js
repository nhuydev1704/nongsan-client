import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import React from 'react';
import { formatNumber } from '../../utils/common';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../../redux/actions/productAction';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { IconButton } from '@mui/material';

const Item = styled(Paper)(({ theme, color }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(0.4),
    textAlign: 'center',
    border: 0,
    borderRadius: '0.5rem',
    overflow: 'hidden',
    background: color,
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    position: 'relative',
    transition: 'all 0.1s ease-in-out',
}));

const ItemProduct = ({ product, setOpenDraw, setDetailProduct }) => {
    const dispatch = useDispatch();

    const handleChangeColor = (id, color) => {
        dispatch(updateProduct(id, color));
    };

    const handleOpenDetail = (detail) => {
        setDetailProduct(detail);
        setOpenDraw(true);
    };

    return (
        <Item color={product.color}>
            <div
                className="flex-shrink-0 m-6 relative overflow-hidden rounded-lg shadow-lg transition-all"
                style={{ background: product.color }}
            >
                <svg
                    className="absolute bottom-0 left-0 mb-8"
                    viewBox="0 0 375 283"
                    fill="none"
                    style={{ transform: 'scale(1.5)', opacity: 0.1 }}
                >
                    <rect
                        x="159.52"
                        y="175"
                        width="152"
                        height="152"
                        rx="8"
                        transform="rotate(-45 159.52 175)"
                        fill="white"
                    />
                    <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white" />
                </svg>
                <div className="relative pt-10 px-10 flex items-center justify-center">
                    <div
                        className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
                        style={{
                            background: 'radial-gradient(black, transparent 60%)',
                            transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)',
                            opacity: 0.2,
                        }}
                    ></div>
                    <img className="relative w-40 rounded-lg" src={product.image} alt="123" />
                </div>
                <div className="relative text-white px-6 pb-6 mt-6">
                    <span className="block text-base opacity-90 mb-2">{product.title}</span>
                    <div className="flex justify-between">
                        <span className="block font-semibold text-xl">
                            <Rating
                                name="simple-controlled"
                                style={{ color: 'yellow' }}
                                readOnly
                                value={Number((product.rating / product.numReviews).toFixed(1))}
                                precision={0.1}
                                size="small"
                                emptyIcon={<StarBorderIcon fontSize="inherit" color="action" />}
                            />
                        </span>
                        <span className=" bg-white rounded-full text-orange-500 text-sm font-bold px-3 py-2 leading-none flex items-center">
                            ${formatNumber(product.price)}
                        </span>
                    </div>
                </div>
                <div className="absolute top-2 right-2">
                    <IconButton onClick={() => handleOpenDetail(product)} aria-label="delete">
                        <RemoveRedEyeOutlinedIcon style={{ color: 'white' }} />
                    </IconButton>
                </div>
            </div>
            <div className="flex absolute bottom-0 right-0 bg-blue-100 z-10 p-1 px-2 rounded-tl-lg">
                <div
                    onClick={() => handleChangeColor(product._id, 'rgb(168 85 247)')}
                    className="w-3 h-3 bg-purple-500 hover:opacity-70 cursor-pointer rounded-t-sm hover:scale-125 hover:transition-all"
                />
                <div
                    onClick={() => handleChangeColor(product._id, 'rgb(245 158 11)')}
                    className="w-3 h-3 bg-amber-500 mx-2 hover:opacity-70 cursor-pointer rounded-t-sm hover:scale-125 hover:transition-all"
                />
                <div
                    onClick={() => handleChangeColor(product._id, 'rgb(16 185 129)')}
                    className="w-3 h-3 bg-emerald-500 hover:opacity-70 cursor-pointer rounded-t-sm hover:scale-125 hover:transition-all"
                />
            </div>
        </Item>
    );
};

export default ItemProduct;
