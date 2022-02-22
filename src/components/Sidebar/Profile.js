import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { auth } = useSelector((state) => state);

    return (
        <div className="flex items-center mt-10 mb-2 px-8">
            <div className="w-10 h-10 bg-cover rounded-md mr-3">
                <img
                    src={auth?.user?.avatar}
                    alt="hihi"
                    className="rounded-full h-full w-full overflow-hidden shadow"
                />
            </div>
            <div>
                <p className="text-white text-lg font-medium">{auth?.user?.username}</p>
                <Link
                    to={`/profile/${auth?.user?._id}`}
                    className="text-white font-medium text-xs mt-1 hover:opacity-80 cursor-pointer"
                >
                    Xem thông tin
                </Link>
            </div>
        </div>
    );
};

export default Profile;
