import React from 'react';
import { useDispatch } from 'react-redux';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ForumIcon from '@mui/icons-material/Forum';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../../redux/actions/authAction';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SetingAccount from '../SetingAccount';
import Notification from '../Notification';
import Badge from '@mui/material/Badge';
import { getDataAPI } from '../../api/fetchData';
const FooterSidebar = () => {
    const [notifications, setNotifications] = React.useState([]);
    const [page, setPage] = React.useState(1);

    const [open, setOpen] = React.useState(false);
    const [openDraw, setOpenDraw] = React.useState(false);

    const dispatch = useDispatch();

    React.useEffect(() => {
        const getNotifications = async () => {
            const res = await getDataAPI('/noti', {
                limit: page * 10,
            });

            setNotifications(res.data.notifications);
        };

        getNotifications();
    }, [page]);

    return (
        <div className="px-8 bg-indigo-800">
            <ul className="w-full flex items-center justify-between ">
                <li className="font-medium pt-3 pb-2">
                    <Tooltip arrow title="Thông báo">
                        <IconButton onClick={() => setOpenDraw(!openDraw)}>
                            <Badge
                                badgeContent={notifications.length === 0 ? '0' : notifications.length}
                                color="secondary"
                            >
                                <NotificationsNoneIcon className="icon icon-tabler icon-tabler-bell text-white hover:opacity-80" />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                </li>
                <li className="font-medium pt-3 pb-2">
                    <Tooltip arrow title="Tư vấn">
                        <IconButton>
                            <ForumIcon className="icon icon-tabler icon-tabler-messages text-white hover:opacity-80" />
                        </IconButton>
                    </Tooltip>
                </li>
                <li className="font-medium pt-3 pb-2">
                    <Tooltip arrow title="Cài đặt">
                        <IconButton onClick={() => setOpen(true)}>
                            <SettingsIcon className="icon icon-tabler icon-tabler-settings text-white hover:opacity-80" />
                        </IconButton>
                    </Tooltip>
                </li>
                <li onClick={() => dispatch(logout())} className="font-medium pt-3 pb-2 ">
                    <Tooltip arrow title="Đăng xuất">
                        <IconButton>
                            <LogoutIcon className="icon icon-tabler icon-tabler-archive text-white hover:opacity-80" />
                        </IconButton>
                    </Tooltip>
                </li>
            </ul>
            <SetingAccount open={open} setOpen={setOpen} />
            <Notification
                notifications={notifications}
                setPage={setPage}
                page={page}
                openDraw={openDraw}
                setOpenDraw={setOpenDraw}
            />
        </div>
    );
};

export default FooterSidebar;
