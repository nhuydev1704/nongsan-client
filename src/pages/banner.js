import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getDataAPI, postDataAPI, putDataAPI } from '../api/fetchData';
import FormBanner from '../components/Banner/FormBanner';
import ProviewBanner from '../components/Banner/ProviewBanner';
import LayoutComponent from '../components/global/LayoutComponent';
import { imageUpload } from '../utils/common';
import GetNotification from '../utils/GetNotification';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const initialState = {
    category: '',
    image: '',
    title: '',
};

const Banner = ({ id }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth, products } = useSelector((state) => state);

    const [dataBanner, setDataBanner] = React.useState(initialState);
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        if (dataBanner.category?._id === '' || dataBanner.image === '') {
            setLoading(false);
            return GetNotification('Vui lòng nhập đủ thông tin', 'error');
        }
        const photo = await imageUpload(dataBanner.image);
        if (photo) {
            if (id) {
                const res = await putDataAPI('banner/' + id, {
                    ...dataBanner,
                    image: photo.url,
                });
                if (res.status === 200) {
                    GetNotification('Cập nhật thành công', 'success');
                }
            } else {
                const res = await postDataAPI('banner', {
                    ...dataBanner,
                    image: photo.url,
                });
                if (res.status === 200) {
                    GetNotification('Thêm thành công', 'success');
                }
            }
        }
        setLoading(false);
    };

    React.useLayoutEffect(() => {
        if (id) {
            (async () => {
                const res = await getDataAPI(`banner/${id}`);
                if (res.status === 200) {
                    setDataBanner(res.data);
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
        <LayoutComponent loading={loading} title="Banner hệ thống" isBack>
            <div className="mt-10">
                <Grid container spacing={2}>
                    <Grid item xs={7} sm={7}>
                        <Item>
                            <FormBanner
                                id={id}
                                dataBanner={dataBanner}
                                handleSubmit={handleSubmit}
                                setDataBanner={setDataBanner}
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                        <Item>
                            <ProviewBanner id={id} dataBanner={dataBanner} />
                        </Item>
                    </Grid>
                </Grid>
            </div>
        </LayoutComponent>
    );
};

export default Banner;
