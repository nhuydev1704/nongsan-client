import Drawer from '@mui/material/Drawer';
import * as React from 'react';
import { getDataAPI } from '../../api/fetchData';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import moment from 'moment';
const Notification = ({ openDraw, setOpenDraw, notifications, page, setPage }) => {
    return (
        <div>
            <Drawer anchor="right" open={openDraw} onClose={() => setOpenDraw(false)}>
                <div className="bg-[#fff] h-full">
                    <div className="p-3 text-left text-lg font-medium" style={{ borderBottom: '1px solid #ccc' }}>
                        Thông báo
                    </div>
                    <div className="p-4 xs:w-0" style={{ width: 400, background: '#fff' }}>
                        <List sx={{ width: '100%' }}>
                            {notifications &&
                                notifications.length > 0 &&
                                notifications.map((noti, index) => (
                                    <div key={index}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src={noti.imgProduct ? noti.imgProduct : noti.user.avatar}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={noti.title}
                                                secondary={
                                                    <React.Fragment>
                                                        <div className="mt-3">
                                                            {moment(noti.createdAt).format('hh:mm DD-MM-YYYY')}
                                                        </div>
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </div>
                                ))}
                        </List>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default Notification;
