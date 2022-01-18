import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDataAPI } from '../../api/fetchData';
import Posts from '../../components/Profile/Posts';
import { getProfileUsers } from '../../redux/actions/profileAction';
import GetNotification from '../../utils/GetNotification';
const Profile = () => {
    const { id } = useParams();
    const { auth, profile, loading } = useSelector((state) => state);

    const dispatch = useDispatch();

    const [userData, setUserData] = React.useState([]);

    React.useEffect(() => {
        if (id === auth.user._id) {
            setUserData([auth.user]);
        } else {
            dispatch(getProfileUsers(profile.users, id, auth.token));
            const newData = profile.users.filter((user) => user._id === id);
            setUserData(newData);
        }
    }, [auth.token, id, auth.user, dispatch, profile.users]);

    return (
        <div>
            {/* {userData && userData.length > 0 && (
                <Info userData={userData} id={id} id_auth={auth.user._id} loading={loading} />
            )} */}
            <Posts />
        </div>
    );
};

export default Profile;
