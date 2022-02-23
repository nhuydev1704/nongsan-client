import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import React from 'react';
import { formatNumber } from '../../utils/common';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, updateProduct } from '../../redux/actions/productAction';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { IconButton, Skeleton, Tooltip } from '@mui/material';
import { SketchPicker } from 'react-color';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { deleteDataAPI } from '../../api/fetchData';
import GetNotification from '../../utils/GetNotification';
import { addCart } from '../../redux/actions/authAction';
const Item = styled(Paper)(({ theme, color }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    border: 0,
    borderRadius: '0.5rem',
    overflow: 'hidden',
    background: color,
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    position: 'relative',
    transition: 'all 0.1s ease-in-out',
    minHeight: '340px',
    maxHeight: '340px',
}));

const ItemProduct = ({ product, setOpenDraw, setDetailProduct }) => {
    const { auth } = useSelector((state) => state);
    const admin = auth?.user?.role === 'admin';

    const [displayColor, setDisplayColor] = React.useState(false);
    const [displayColorText, setDisplayColorText] = React.useState(false);

    const dispatch = useDispatch();

    const handleChangeColor = (id, color) => {
        dispatch(updateProduct(id, color));
    };

    const handleOpenDetail = (detail) => {
        setDetailProduct(detail);
        setOpenDraw(true);
    };

    const handleClick = () => {
        setDisplayColor(!displayColor);
    };

    const handleClose = () => {
        setDisplayColor(false);
    };

    const handleChange = (color) => {
        handleChangeColor(product._id, { color: color.hex, textColor: product.textColor });
    };

    const handleClickText = () => {
        setDisplayColorText(!displayColorText);
    };

    const handleCloseText = () => {
        setDisplayColorText(false);
    };

    const handleChangeText = (color) => {
        handleChangeColor(product._id, { color: product.color, textColor: color.hex });
    };

    return (
        product && (
            <Item color={product.color}>
                <div
                    className="flex-shrink-0 relative overflow-hidden rounded-lg shadow-lg min-h-[340px] max-h-[340px]"
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
                        <rect
                            y="107.48"
                            width="152"
                            height="152"
                            rx="8"
                            transform="rotate(-45 0 107.48)"
                            fill="white"
                        />
                    </svg>
                    <div className="flex flex-col justify-between h-[310px]">
                        <div className="relative pt-10 px-10 flex items-center justify-center">
                            <div
                                className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
                                style={{
                                    transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)',
                                    opacity: 0.2,
                                }}
                            ></div>
                            <img
                                className="relative w-[10rem] h-[12rem] rounded-lg object-cover"
                                src={product.image}
                                alt="ảnh bị lỗi zùi"
                            />
                        </div>
                        <div className="relative px-6 h-full mt-6 flex flex-col justify-between">
                            <span className="block text-base opacity-90 mb-2" style={{ color: product.textColor }}>
                                {product.title}
                            </span>
                            <div className="flex justify-between">
                                <span className="block font-semibold text-xl">
                                    <Rating
                                        name="simple-controlled"
                                        style={{ color: 'yellow' }}
                                        readOnly
                                        value={Number((product.rating / product.numReviewers).toFixed(1))}
                                        precision={0.1}
                                        size="medium"
                                        emptyIcon={<StarBorderIcon fontSize="inherit" style={{ color: '#ccc' }} />}
                                    />
                                </span>
                                <span className="bg-white rounded-full text-orange-500 text-sm font-bold px-3 py-2 leading-none flex items-center">
                                    ${formatNumber(product.price) + product.price_text}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-2 right-2">
                        <Tooltip arrow title="Chi tiết sản phẩm" placement="top">
                            <IconButton onClick={() => handleOpenDetail(product)} aria-label="detail">
                                <RemoveRedEyeOutlinedIcon style={{ color: product.textColor }} />
                            </IconButton>
                        </Tooltip>
                    </div>
                    {admin && (
                        <>
                            <div className="absolute top-12 right-2">
                                <Tooltip arrow title="Sửa thông tin sản phẩm" placement="top">
                                    <Link to={`/product/${product._id}`}>
                                        <IconButton aria-label="edit">
                                            <EditIcon style={{ color: product.textColor }} />
                                        </IconButton>
                                    </Link>
                                </Tooltip>
                            </div>
                            <div className="absolute top-24 right-2">
                                <Tooltip arrow title="Xóa sản phẩm" placement="top">
                                    <IconButton
                                        onClick={async () => {
                                            const res = await deleteDataAPI(`product/${product._id}`);
                                            GetNotification(res.data.msg, 'success');
                                            dispatch(getProducts());
                                        }}
                                        aria-label="delete"
                                    >
                                        <DeleteIcon style={{ color: product.textColor }} />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </>
                    )}

                    {!admin && (
                        <div className="absolute top-12 right-2">
                            <Tooltip arrow title="Thêm vào giỏ hảng" placement="top">
                                <IconButton
                                    onClick={() =>
                                        dispatch(
                                            addCart({ loged: auth?.token, product, cart: auth.cart, token: auth.token })
                                        )
                                    }
                                    aria-label="add-cart"
                                >
                                    <AddShoppingCartIcon style={{ color: product.textColor }} />
                                </IconButton>
                            </Tooltip>
                        </div>
                    )}
                </div>
                {admin && (
                    <div className="flex absolute justify-between bottom-0 right-0 z-10 p-1 px-4 w-full">
                        <div>
                            <div
                                style={{
                                    background: '#fff',
                                    borderRadius: '4px',
                                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                                    display: 'inline-block',
                                    cursor: 'pointer',
                                }}
                                onClick={handleClickText}
                            >
                                <Tooltip arrow title="Màu chữ">
                                    <div
                                        style={{
                                            width: '36px',
                                            height: '6px',
                                            borderRadius: '4px',
                                            background: `${product.textColor}`,
                                        }}
                                    />
                                </Tooltip>
                            </div>
                            {displayColorText ? (
                                <div
                                    style={{
                                        position: 'absolute',
                                        zIndex: '99999999',
                                        bottom: '0',
                                        left: '0',
                                    }}
                                >
                                    <div
                                        style={{
                                            position: 'fixed',
                                            top: '0px',
                                            right: '0px',
                                            bottom: '0px',
                                            left: '0px',
                                        }}
                                        onClick={handleCloseText}
                                    />
                                    <SketchPicker color={product.textColor} onChange={handleChangeText} />
                                </div>
                            ) : null}
                        </div>
                        <div>
                            <div
                                style={{
                                    padding: '1px',
                                    background: '#fff',
                                    borderRadius: '4px',
                                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                                    display: 'inline-block',
                                    cursor: 'pointer',
                                }}
                                onClick={handleClick}
                            >
                                <Tooltip arrow title="Màu nền">
                                    <div
                                        style={{
                                            width: '36px',
                                            height: '6px',
                                            borderRadius: '4px',
                                            background: `${product.color}`,
                                        }}
                                    />
                                </Tooltip>
                            </div>
                            {displayColor ? (
                                <div
                                    style={{
                                        position: 'absolute',
                                        zIndex: '99999999',
                                        bottom: '0',
                                        right: '0',
                                    }}
                                >
                                    <div
                                        style={{
                                            position: 'fixed',
                                            top: '0px',
                                            right: '0px',
                                            bottom: '0px',
                                            left: '0px',
                                        }}
                                        onClick={handleClose}
                                    />
                                    <SketchPicker color={product.color} onChange={handleChange} />
                                </div>
                            ) : null}
                        </div>
                    </div>
                )}
            </Item>
        )
    );
};

export default ItemProduct;
