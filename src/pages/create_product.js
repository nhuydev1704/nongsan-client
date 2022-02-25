import { Grid } from '@mui/material';
import React from 'react';
import LayoutComponent from '../components/global/LayoutComponent';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FormProduct from '../components/Products/FormProduct';
import ProViewProduct from '../components/Products/ProViewProduct';
import { ValidProduct } from '../utils/ValidProduct';
import GetNotification from '../utils/GetNotification';
import { findPrice, formatNumber, imageUpload } from '../utils/common';
import { getDataAPI, postDataAPI, putDataAPI } from '../api/fetchData';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../redux/actions/productAction';
import { useDispatch, useSelector } from 'react-redux';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const initialState = {
    title: '',
    price: '',
    price_text: '/kg',
    description: '',
    image: '',
    category: '',
    child_category: '',
};

const CreateProduct = ({ id }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth, products } = useSelector((state) => state);

    const [dataProduct, setDataProduct] = React.useState(initialState);
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        const check = ValidProduct(dataProduct);
        if (check) {
            setLoading(false);
            return GetNotification(check, 'error');
        }
        const photo = await imageUpload(dataProduct.image);
        if (photo) {
            if (id) {
                const res = await putDataAPI('products/' + id, {
                    ...dataProduct,
                    category: dataProduct.category.parent ? dataProduct.category.parent : dataProduct.category._id,
                    child_category: dataProduct.category._id,
                    image: photo.url,
                    price_text: dataProduct.price_text,
                });
                await GetNotification(res.data.msg, 'success');
                dispatch(getProducts());
            } else {
                const data = {
                    ...dataProduct,
                    category: dataProduct.category.parent ? dataProduct.category.parent : dataProduct.category._id,
                    child_category: dataProduct.category._id,
                    image: photo.url,
                    price_text: dataProduct.price_text,
                };
                const res = await postDataAPI('product', data);

                await GetNotification(res.data.msg, 'success');
                dispatch(getProducts());
                postDataAPI('noti', {
                    title: `Quản trị viên đã thêm ${dataProduct.title} vào danh sách sản phẩm`,
                    user: auth.user._id,
                    imgProduct: photo.url,
                });
            }
        }
        setLoading(false);
        navigate('/');
    };

    React.useLayoutEffect(() => {
        if (id) {
            console.log('dataProduct', dataProduct);

            (async () => {
                const res = await getDataAPI(`product/${id}`);
                if (res.status === 200) {
                    setDataProduct(res.data.product);
                }
            })();
        }

        if (auth?.user?.role !== 'admin') {
            GetNotification('Bạn không có quyền', 'error');
            navigate('/');
            return;
        }
    }, [id]);

    return (
        <LayoutComponent loading={loading} title="Thêm sản phẩm" isBack>
            <div className="mt-10">
                <Grid container spacing={2}>
                    <Grid item xs={7} sm={7}>
                        <Item>
                            <FormProduct
                                id={id}
                                handleSubmit={handleSubmit}
                                dataProduct={dataProduct}
                                setDataProduct={setDataProduct}
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                        <Item>
                            <ProViewProduct id={id} dataProduct={dataProduct} setDataProduct={setDataProduct} />
                        </Item>
                    </Grid>
                </Grid>
            </div>
        </LayoutComponent>
    );
};

export default CreateProduct;
