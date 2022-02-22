import CloseIcon from '@mui/icons-material/Close';
import {
    Avatar,
    Button,
    FormControlLabel,
    FormLabel,
    Grid,
    IconButton,
    Radio,
    RadioGroup,
    Skeleton,
    TextField,
} from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import UserProfile from './UserProfile';
import { checkImage, imageUpload } from '../../utils/common';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const initialState = {
    username: '',
    address: '',
    phone: '',
    website: '',
    story: '',
    gender: '',
};

const Info = ({ userData, loading }) => {
    const [open, setOpen] = React.useState(false);
    const [fileAvatar, setFileAvatar] = React.useState('');

    const [values, setValues] = React.useState({
        ...initialState,
        username: userData?.username,
        address: userData?.address,
        phone: userData?.phone,
        website: userData?.website,
        story: userData?.story,
        gender: userData?.gender,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    // const {name, password, account, avatar, } = auth
    const handleChangeFile = async (e) => {
        const target = e.target;
        const files = target.files;
        setFileAvatar(files[0]);
        // if (files) {
        //     const file = files[0];
        //     const check = checkImage(file);
        //     if (check) {
        //     }

        //     const photo = await imageUpload(file);
        //     // url = photo.url;
        // }
    };

    const handleSubmit = () => {
        console.log('🚀 ~ file: Info.js ~ line 76 ~ handleSubmit ~ values', values);
    };

    return (
        <div className="h-screnn">
            <Stack
                key={userData[0]?._id}
                direction={{ xs: 'column', sm: 'column', md: 'row' }}
                justifyContent="center"
                alignItems="center"
                spacing={14}
            >
                <Stack direction="column" justifyContent="center" spacing={3}>
                    {loading ? (
                        <Skeleton variant="rectangular" width={570} height={120} />
                    ) : (
                        <UserProfile dataUser={userData} setOpen={setOpen} />
                    )}
                </Stack>
            </Stack>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{ marginBottom: '10px' }}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <div> Sửa thông tin</div>
                            <IconButton aria-label="delete" size="small">
                                <CloseIcon onClick={() => setOpen(false)} fontSize="medium" />
                            </IconButton>
                        </Stack>
                    </Typography>
                    <div className="relative flex justify-center flex-col items-center mb-4">
                        <div className="shadow-xl rounded-full p-4 ">
                            <Avatar
                                alt={userData[0]?.username}
                                src={fileAvatar ? URL.createObjectURL(fileAvatar) : userData[0]?.avatar}
                                sx={{ width: 152, height: 152 }}
                            />
                        </div>
                        <Button
                            style={{ position: 'absolute' }}
                            className="-bottom-[10px]"
                            color="primary"
                            aria-label="delete"
                        >
                            <label style={{ display: 'contents', cursor: 'pointer' }} htmlFor="raised-button-file">
                                <input onChange={handleChangeFile} type="file" id="raised-button-file" hidden />
                                <FileUploadIcon />
                            </label>
                        </Button>
                    </div>
                    <Grid container spacing={4}>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                value={values.username}
                                onChange={handleChange('username')}
                                fullWidth
                                id="standard-basic"
                                label="Tên đầy đủ"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                value={values.phone}
                                onChange={handleChange('phone')}
                                fullWidth
                                id="standard-basic"
                                label="Số điện thoại"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                value={values.address}
                                onChange={handleChange('address')}
                                fullWidth
                                id="standard-basic"
                                label="Địa chỉ"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                value={values.website}
                                onChange={handleChange('website')}
                                fullWidth
                                id="standard-basic"
                                label="Website"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                value={values.story}
                                onChange={handleChange('story')}
                                id="filled-multiline-static"
                                label="Mô tả"
                                multiline
                                rows={4}
                                variant="filled"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <FormLabel component="legend">Giới tính</FormLabel>
                            <RadioGroup
                                value={values.gender}
                                onChange={handleChange('gender')}
                                row
                                aria-label="gender"
                                name="row-radio-buttons-group"
                            >
                                <Stack direction="row" spacing={3.5}>
                                    <FormControlLabel value="male" control={<Radio />} label="Nam" />
                                    <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                                    <FormControlLabel value="other" control={<Radio />} label="Khác" />
                                </Stack>
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={12} sm={4} className="flex" alignItems="center">
                            <Button variant="contained" onClick={handleSubmit}>
                                Cập nhật
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
};

export default React.memo(Info);
