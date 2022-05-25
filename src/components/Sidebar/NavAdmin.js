import React from 'react';
import { Link, useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import CategoryIcon from '@mui/icons-material/Category';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import DashboardIcon from '@mui/icons-material/Dashboard';
const NavAdmin = ({ active, setActive }) => {
    const { page } = useParams();

    React.useEffect(() => {
        if (page) {
            setActive(page);
        }
    }, [page]);

    return (
        <>
            <Link onClick={() => setActive('dashboard')} to="/dashboard" className="flex items-center">
                <li
                    className={`${
                        active === 'dashboard' && 'bg-indigo-700'
                    } flex w-full justify-between transition-all text-white font-medium hover:text-gray-300  cursor-pointer items-center px-8 py-3 my-[0.40rem]`}
                >
                    <div className="flex items-center">
                        <DashboardIcon />
                        <span className="text-sm ml-4">Dashboard</span>
                    </div>
                </li>
            </Link>
            <Link onClick={() => setActive('create_product')} to="/create_product" className="flex items-center">
                <li
                    className={`${
                        active === 'create_product' && 'bg-indigo-700'
                    } flex w-full justify-between transition-all text-white font-medium hover:text-gray-300  cursor-pointer items-center px-8 py-3 my-[0.40rem]`}
                >
                    <div className="flex items-center">
                        <AddIcon />
                        <span className="text-sm ml-4">Thêm sản phẩm</span>
                    </div>
                </li>
            </Link>
            <Link onClick={() => setActive('category')} to="/category" className="flex items-center">
                <li
                    className={`${
                        active === 'category' && 'bg-indigo-700'
                    } flex w-full justify-between transition-all text-white font-medium hover:text-gray-300  cursor-pointer items-center px-8 py-3 my-[0.40rem]`}
                >
                    <div className="flex items-center">
                        <CategoryIcon />
                        <span className="text-sm ml-4">Danh mục sản phẩm</span>
                    </div>
                </li>
            </Link>
            <Link onClick={() => setActive('banner')} to="/banner" className="flex items-center">
                <li
                    className={`${
                        active === 'banner' && 'bg-indigo-700'
                    } flex w-full justify-between transition-all text-white font-medium hover:text-gray-300  cursor-pointer items-center px-8 py-3 my-[0.40rem]`}
                >
                    <div className="flex items-center">
                        <ViewCarouselIcon />
                        <span className="text-sm ml-4">Banner hệ thống</span>
                    </div>
                </li>
            </Link>
            <Link onClick={() => setActive('policy')} to="/policy" className="flex items-center">
                <li
                    className={`${
                        active === 'policy' && 'bg-indigo-700'
                    } flex w-full justify-between transition-all text-white font-medium hover:text-gray-300  cursor-pointer items-center px-8 py-3 my-[0.40rem]`}
                >
                    <div className="flex items-center">
                        <ViewCarouselIcon />
                        <span className="text-sm ml-4">Chính sách và điều khoản</span>
                    </div>
                </li>
            </Link>
        </>
    );
};

export default NavAdmin;
