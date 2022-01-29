import React from 'react';
import { useDispatch } from 'react-redux';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ForumIcon from '@mui/icons-material/Forum';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../../redux/actions/authAction';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const FooterSidebar = () => {
    const dispatch = useDispatch();

    return (
        <div className="px-8 bg-indigo-800">
            <ul className="w-full flex items-center justify-between ">
                <li className="font-medium pt-3 pb-2">
                    <Tooltip arrow title="Thông báo">
                        <IconButton>
                            <NotificationsNoneIcon className="icon icon-tabler icon-tabler-bell text-white hover:opacity-80" />
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
                        <IconButton>
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
        </div>
    );
};

export default FooterSidebar;
