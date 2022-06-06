import { FormControl, Grid, InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import React from 'react';
import { deleteDataAPI, putDataAPI } from '../../api/fetchData';
import GetNotification from '../../utils/GetNotification';
import { GRID_DEFAULT_LOCALE_TEXT } from '../../utils/LanguageDataGrid';
import { columns } from './HistoryConfig';
import ModalProduct from './ModalProduct';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getPayments } from '../../redux/actions/paymentAction';
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    // height: '600px',
}));

const HistoryOrder = ({
    filterPayment,
    setFilterPayment,
    historyOrder,
    loading,
    auth,
    callback,
    setCallback,
    status,
    setStatus,
}) => {
    const [open, setOpen] = React.useState(false);
    const [cart, setCart] = React.useState([]);
    console.log('🚀 ~ file: index.js ~ line 41 ~ cart', cart);
    const dispatch = useDispatch();

    const [sortModel, setSortModel] = React.useState([
        {
            field: 'createdAt',
            sort: 'desc',
        },
    ]);
    return (
        <div className="mt-10">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <Item>
                        <FormControl style={{ width: '200px', margin: '15px 0' }}>
                            <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={status}
                                label="Trạng thái"
                                size="small"
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <MenuItem value="all">Tất cả</MenuItem>
                                <MenuItem value="1">Chờ duyệt</MenuItem>
                                <MenuItem value="2">Đã duyệt</MenuItem>
                                <MenuItem value="3">Hoàn thành</MenuItem>
                                <MenuItem value="0">Hủy</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl style={{ width: '200px', margin: '15px 40px' }}>
                            <InputLabel id="demo-simple-select-label">Hình thức thanh toán</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={filterPayment}
                                label="Hình thức thanh toán"
                                size="small"
                                onChange={(e) => setFilterPayment(e.target.value)}
                            >
                                <MenuItem value="all">Tất cả</MenuItem>
                                <MenuItem value="1">Tiền mặt</MenuItem>
                                <MenuItem value="2">Paypal</MenuItem>
                            </Select>
                        </FormControl>
                        <DataGrid
                            disableColumnFilter
                            sortModel={sortModel}
                            disableDensitySelector
                            hideFooterSelectedRowCount
                            disableColumnSelector
                            disableSelectionOnClick
                            localeText={GRID_DEFAULT_LOCALE_TEXT}
                            rows={historyOrder}
                            columns={
                                auth.user.role === 'admin'
                                    ? [
                                          {
                                              field: 'cart',
                                              headerName: '',
                                              renderCell: (cellValues) => {
                                                  return (
                                                      <Button
                                                          variant="text"
                                                          onClick={() => {
                                                              setCart(cellValues);
                                                              setOpen(true);
                                                          }}
                                                      >
                                                          Chi tiết
                                                      </Button>
                                                  );
                                              },
                                          },
                                          ...columns,
                                          {
                                              field: 'status',
                                              headerName: 'Trạng thái',
                                              flex: 1,
                                              renderCell: (cellValues) => {
                                                  return (
                                                      <>
                                                          <Select
                                                              className="select_edit_status"
                                                              labelId="demo-simple-select-standard-label"
                                                              id="demo-simple-select-standard"
                                                              fullWidth
                                                              //   value={age}
                                                              defaultValue={cellValues.value}
                                                              onChange={(e) => {
                                                                  const { value } = e.target;
                                                                  putDataAPI(
                                                                      'payment/' + cellValues.id,
                                                                      {
                                                                          status: value,
                                                                      },
                                                                      auth.token
                                                                  )
                                                                      .then((res) => {
                                                                          GetNotification(res.data.msg, 'success');
                                                                      })
                                                                      .catch((err) => {
                                                                          GetNotification(
                                                                              err.response.data.msg,
                                                                              'error'
                                                                          );
                                                                      });
                                                              }}
                                                              label="Age"
                                                          >
                                                              <MenuItem value="0">Hủy</MenuItem>
                                                              <MenuItem value="1">Chờ duyệt</MenuItem>
                                                              <MenuItem value="2">Đã duyệt</MenuItem>
                                                              <MenuItem value="3">Hoàn thành</MenuItem>
                                                          </Select>
                                                      </>
                                                  );
                                              },
                                          },
                                          {
                                              field: 'createdAt',
                                              headerName: 'Ngày tạo',
                                              flex: 1,
                                              renderCell: (cellValues) => {
                                                  return <>{moment(cellValues.value).format('hh:mm YYYY-MM-DD')}</>;
                                              },
                                          },
                                          {
                                              field: '',
                                              headerName: '',
                                              renderCell: (cellValues) => {
                                                  return (
                                                      <div className="flex justify-center align-middle w-full">
                                                          <IconButton
                                                              onClick={
                                                                  // delete category
                                                                  () => {
                                                                      deleteDataAPI('payment/' + cellValues.id)
                                                                          .then((res) => {
                                                                              GetNotification(res.data.msg, 'success');
                                                                              setCallback(!callback);
                                                                          })
                                                                          .catch((err) => {
                                                                              GetNotification(
                                                                                  err.response.data.msg,
                                                                                  'error'
                                                                              );
                                                                          });
                                                                  }
                                                              }
                                                              aria-label="delete"
                                                              size="large"
                                                          >
                                                              <DeleteIcon />
                                                          </IconButton>
                                                      </div>
                                                  );
                                              },
                                          },
                                      ]
                                    : [
                                          {
                                              field: 'cart',
                                              headerName: '',
                                              renderCell: (cellValues) => {
                                                  return (
                                                      <Button
                                                          variant="text"
                                                          onClick={() => {
                                                              setCart(cellValues);
                                                              setOpen(true);
                                                          }}
                                                      >
                                                          Chi tiết
                                                      </Button>
                                                  );
                                              },
                                          },
                                          ...columns,
                                          {
                                              field: 'status',
                                              headerName: 'Trạng thái',
                                              flex: 1,
                                              renderCell: (cellValues) => {
                                                  return (
                                                      <>
                                                          {cellValues.value === '0'
                                                              ? 'Hủy'
                                                              : cellValues.value === '1'
                                                              ? 'Chờ duyệt'
                                                              : 'Đang giao'}
                                                      </>
                                                  );
                                              },
                                          },
                                          {
                                              field: 'createdAt',
                                              headerName: 'Ngày tạo',
                                              flex: 1,
                                              renderCell: (cellValues) => {
                                                  return <>{moment(cellValues.value).format('hh:mm YYYY-MM-DD')}</>;
                                              },
                                          },
                                      ]
                            }
                            loading={loading}
                            autoHeight
                            pageSize={7}
                            rowsPerPageOptions={[7]}
                            onSortModelChange={(model) => setSortModel(model)}
                            LoadingOverlay
                        />
                    </Item>
                </Grid>
            </Grid>

            <ModalProduct open={open} setOpen={setOpen} dataProduct={cart} />
        </div>
    );
};

export default HistoryOrder;
