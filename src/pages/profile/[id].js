import React from 'react';
import { useSelector } from 'react-redux';
import LayoutComponent from '../../components/global/LayoutComponent';
import Info from '../../components/Profile/Info';
const Profile = () => {
    const { auth, loading } = useSelector((state) => state);

    return (
        <LayoutComponent title="Thông tin cá nhân" isBack>
            <Info userData={auth.user} id_auth={auth.user._id} loading={loading} />
        </LayoutComponent>
    );
};

export default Profile;
