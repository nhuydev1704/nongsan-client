import AddIcon from '@mui/icons-material/Add';
import { Button, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteDataAPI, postDataAPI, putDataAPI } from '../api/fetchData';
import { columns } from '../components/Category/CategoryConfig';
import ModalCategoy from '../components/Category/ModalCategoy';
import LayoutComponent from '../components/global/LayoutComponent';
import { getCategories } from '../redux/actions/categoryAction';
import GetNotification from '../utils/GetNotification';
import { GRID_DEFAULT_LOCALE_TEXT } from '../utils/LanguageDataGrid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    // height: '600px',
}));

const initialState = {
    selected: { name: 'Nông sản', value: 'agricultural' },
    selectedParent: { name: 'Chọn danh mục cha', value: '' },
    name: '',
    id: '',
    is_children: true,
};

const Category = () => {
    const [dataCate, setDataCate] = React.useState(initialState);

    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const { category, auth } = useSelector((state) => state);

    const [sortModel, setSortModel] = React.useState([
        {
            field: 'createdAt',
            sort: 'desc',
        },
    ]);
    const [dataCategory, setDataCategory] = React.useState();

    React.useEffect(() => {
        if (auth?.user?.role !== 'admin') {
            GetNotification('Bạn không có quyền', 'error');
            navigate('/');
            return;
        }
        if (!(category.category.length > 0) && !category) return;
        // map category category and children category
        const mapCategory = [];

        category.category.forEach((element) => {
            mapCategory.push({ ...element, id: element._id });

            if (element.children) {
                element.children.forEach((element) => {
                    mapCategory.push({ ...element, id: element._id });
                });
            }
        });

        setDataCategory(mapCategory);
    }, [category.category, auth?.user?.role]);

    const handleSubmit = async () => {
        const { id, name, selected, selectedParent } = dataCate;
        setLoading(true);
        if (!name) {
            GetNotification('Vui lòng nhập tên danh mục', 'error');
            return;
        }
        if (id) {
            if (selectedParent._id) {
                const res = await putDataAPI('category/children/' + id, { name, parent: selectedParent._id });
                await GetNotification(res.data.msg, 'success');
                dispatch(getCategories());
                setOpen(false);
            } else {
                const res = await putDataAPI('category/' + id, { name, type: selected.value });
                await GetNotification(res.data.msg, 'success');
                dispatch(getCategories());
                setOpen(false);
            }
        } else {
            if (selectedParent._id) {
                const res = await postDataAPI('category/children', { name, parent: selectedParent._id });
                await GetNotification(res.data.msg, 'success');
                dispatch(getCategories());
                setOpen(false);
            } else {
                const res = await postDataAPI('category', { name, type: selected.value });
                await GetNotification(res.data.msg, 'success');
                dispatch(getCategories());
                setOpen(false);
            }
        }

        setLoading(false);
        setDataCate(initialState);
    };

    return (
        <LayoutComponent title="Danh mục sản phẩm" isBack>
            <div className="mt-10">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <Item>
                            <div className="flex justify-end px-10 py-4">
                                <Button
                                    variant="contained"
                                    onClick={() => setOpen(true)}
                                    component="label"
                                    startIcon={<AddIcon />}
                                >
                                    Thêm danh mục
                                </Button>
                            </div>
                            <DataGrid
                                disableColumnFilter
                                sortModel={sortModel}
                                disableDensitySelector
                                hideFooterSelectedRowCount
                                disableColumnSelector
                                disableSelectionOnClick
                                localeText={GRID_DEFAULT_LOCALE_TEXT}
                                rows={dataCategory}
                                columns={[
                                    ...columns,
                                    {
                                        field: '',
                                        headerName: 'Thao tác',
                                        width: 140,
                                        renderCell: (cellValues) => {
                                            return (
                                                <div className="flex justify-center align-middle w-full">
                                                    <IconButton
                                                        onClick={
                                                            // delete category
                                                            () => {
                                                                if (!cellValues.row.parent) {
                                                                    deleteDataAPI('category/' + cellValues.id)
                                                                        .then((res) => {
                                                                            GetNotification(res.data.msg, 'success');
                                                                            dispatch(getCategories());
                                                                        })
                                                                        .catch((err) => {
                                                                            GetNotification(
                                                                                err.response.data.msg,
                                                                                'error'
                                                                            );
                                                                        });
                                                                } else {
                                                                    // delete children category
                                                                    deleteDataAPI('category/children/' + cellValues.id)
                                                                        .then((res) => {
                                                                            GetNotification(res.data.msg, 'success');
                                                                            dispatch(getCategories());
                                                                        })
                                                                        .catch((err) => {
                                                                            GetNotification(
                                                                                err.response.data.msg,
                                                                                'error'
                                                                            );
                                                                        });
                                                                }
                                                            }
                                                        }
                                                        aria-label="delete"
                                                        size="large"
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => {
                                                            setOpen(true);
                                                            setDataCate({
                                                                ...dataCate,
                                                                id: cellValues.id,
                                                                name: cellValues.row.name,
                                                                selected: {
                                                                    name:
                                                                        cellValues.row.type === 'agricultural'
                                                                            ? 'Nông sản'
                                                                            : 'Khác',
                                                                    value: cellValues.row.type,
                                                                },
                                                                selectedParent: category.category.find(
                                                                    (item) => item._id === cellValues?.row?.parent
                                                                )
                                                                    ? category.category.find(
                                                                          (item) => item._id === cellValues?.row?.parent
                                                                      )
                                                                    : {
                                                                          name: 'Chọn danh mục cha',
                                                                          value: '',
                                                                      },
                                                            });
                                                        }}
                                                        aria-label="edit"
                                                        size="large"
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </div>
                                            );
                                        },
                                    },
                                ]}
                                loading={loading}
                                autoHeight
                                pageSize={7}
                                rowsPerPageOptions={[7]}
                                onSortModelChange={(model) => setSortModel(model)}
                            />
                        </Item>
                    </Grid>
                </Grid>
            </div>
            <ModalCategoy
                open={open}
                setOpen={setOpen}
                handleSubmit={handleSubmit}
                dataCate={dataCate}
                setDataCate={setDataCate}
            />
        </LayoutComponent>
    );
};

export default Category;
