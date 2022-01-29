import React from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GrassIcon from '@mui/icons-material/Grass';
import { useDispatch, useSelector } from 'react-redux';
import GrainIcon from '@mui/icons-material/Grain';
import { getProducts, TYPES } from '../../redux/actions/productAction';
import { clearSort, findCategory } from '../../redux/actions/categoryAction';
import NavAdmin from './NavAdmin';

import { Link } from 'react-router-dom';
const Navigation = () => {
    const [active, setActive] = React.useState('Home');
    const dispatch = useDispatch();

    const { category, auth } = useSelector((state) => state);

    return (
        <ul className="mt-8">
            <Link to="/">
                <li
                    onClick={() => {
                        dispatch(clearSort(true));
                        dispatch(getProducts(1, '', '', true));
                        dispatch(findCategory('', 'Trang chủ'));
                        setActive('Home');
                        dispatch({ type: TYPES.UPDATE_PAGE, payload: true });
                    }}
                    className={`${
                        active === 'Home' && 'bg-indigo-700'
                    } flex w-full justify-between transition-all text-white font-medium hover:text-gray-300  cursor-pointer items-center py-3 px-8`}
                >
                    <div className="flex items-center">
                        <HomeOutlinedIcon width={20} height={20} />
                        <span className="text-base  ml-4">Trang chủ</span>
                    </div>
                </li>
            </Link>
            {auth?.user?.role === 'admin' ? (
                <NavAdmin active={active} setActive={setActive} />
            ) : (
                <>
                    <li className="flex w-full justify-between text-white font-medium items-center py-3 px-8">
                        <div className="flex items-center">
                            <span className="text-base text-amber-500">NÔNG SẢN</span>
                        </div>
                    </li>
                    {category.category &&
                        category.category.length > 0 &&
                        category.category.map(
                            (item, index) =>
                                item.type === 'agricultural' && (
                                    <Link to="/" key={index}>
                                        <li
                                            onClick={() => {
                                                dispatch(clearSort(true));
                                                setActive(item.name);
                                                dispatch(getProducts(1, `category=${item._id}`, '', true));
                                                dispatch(findCategory(item._id, item.name));
                                                dispatch({ type: TYPES.UPDATE_PAGE, payload: true });
                                            }}
                                            className={`${
                                                active === item.name && 'bg-indigo-700'
                                            } flex w-full justify-between transition-all text-white font-medium hover:text-gray-300  cursor-pointer items-center px-8 py-3 pl-12 my-[0.40rem]`}
                                        >
                                            <div className="flex items-center">
                                                <GrassIcon
                                                    className="icon icon-tabler icon-tabler-puzzle"
                                                    width={20}
                                                    height={20}
                                                />
                                                <span className="text-sm  ml-4">{item.name}</span>
                                            </div>
                                        </li>
                                    </Link>
                                )
                        )}

                    <li className="flex w-full justify-between text-white font-medium items-center py-3 px-8">
                        <div className="flex items-center">
                            <span className="text-base text-amber-500">SẢN PHẨM KHÁC</span>
                        </div>
                    </li>

                    {category.category &&
                        category.category.length > 0 &&
                        category.category.map(
                            (item, index) =>
                                item.type === 'other' && (
                                    <Link to="/" key={item._id}>
                                        <li
                                            onClick={() => {
                                                dispatch(clearSort(true));
                                                setActive(item.name);
                                                dispatch(getProducts(1, `category=${item._id}`, '', true));
                                                dispatch(findCategory(item._id, item.name));
                                                dispatch({ type: TYPES.UPDATE_PAGE, payload: true });
                                            }}
                                            className={`${
                                                active === item.name && 'bg-indigo-700'
                                            } flex w-full justify-between transition-all text-white font-medium hover:text-gray-300  cursor-pointer items-center px-8 py-3 pl-12 my-[0.40rem]`}
                                        >
                                            <div className="flex items-center">
                                                <GrassIcon
                                                    className="icon icon-tabler icon-tabler-puzzle"
                                                    width={20}
                                                    height={20}
                                                />
                                                <span className="text-sm  ml-4">{item.name}</span>
                                            </div>
                                        </li>
                                    </Link>
                                )
                        )}
                </>
            )}
        </ul>
    );
};

export default Navigation;
