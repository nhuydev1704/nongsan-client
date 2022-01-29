import { CardActionArea, CardContent, CardMedia, Rating, Stack, Typography } from '@mui/material';
import React from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { formatNumber } from '../../utils/common';

const ProViewProduct = ({ dataProduct, id }) => {
    return (
        <div>
            <div className="text-base text-left mx-6 py-6">Preview sảm phẩm</div>
            {dataProduct.title && (
                <div className="w-full flex px-6">
                    <CardActionArea>
                        <Stack direction="row">
                            <CardMedia
                                component="img"
                                style={{
                                    maxHeight: '160px',
                                    maxWidth: '160px',
                                    height: '150px',
                                    width: '150px',
                                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                                }}
                                image={
                                    id
                                        ? dataProduct.image
                                        : dataProduct.image
                                        ? URL.createObjectURL(dataProduct.image)
                                        : 'https://res.cloudinary.com/hunre/image/upload/v1643106557/famer/t%E1%BA%A3i_xu%E1%BB%91ng_at4ce0.png'
                                }
                                alt="green iguana"
                                className="rounded-lg"
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    className="text-slate-700 text-left break-all"
                                    component="div"
                                >
                                    {dataProduct.title}
                                </Typography>
                                <Typography variant="body2" className="text-gray-600 text-left break-all">
                                    {dataProduct.description}
                                </Typography>
                                <div className="flex items-center mt-4 mb-6">
                                    <Rating
                                        name="simple-controlled"
                                        style={{ color: 'yellow' }}
                                        value={5}
                                        readOnly
                                        precision={0.1}
                                        size="medium"
                                        emptyIcon={<StarBorderIcon fontSize="inherit" color="warning" />}
                                    />
                                </div>
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    className="text-slate-600 text-left"
                                    component="div"
                                >
                                    {formatNumber(dataProduct.price)} <spa className="text-sm">Đồng</spa>
                                </Typography>
                            </CardContent>
                        </Stack>
                    </CardActionArea>
                </div>
            )}
        </div>
    );
};

export default ProViewProduct;
