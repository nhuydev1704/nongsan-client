import React from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GrassIcon from '@mui/icons-material/Grass';
import { useSelector } from 'react-redux';
import GrainIcon from '@mui/icons-material/Grain';
const Navigation = () => {
    const [active, setActive] = React.useState('Home');

    const { category } = useSelector((state) => state);

    return (
        <ul className="mt-10">
            <li
                onClick={() => setActive('Home')}
                className={`${
                    active === 'Home' && 'bg-indigo-700'
                } flex w-full justify-between transition-all text-white font-medium hover:text-gray-300  cursor-pointer items-center py-3 px-8`}
            >
                <div className="flex items-center">
                    <HomeOutlinedIcon width={24} height={24} />
                    <span className="text-lg  ml-4">Trang chủ</span>
                </div>
            </li>
            <li className="flex w-full justify-between text-white font-medium items-center py-3 px-8">
                <div className="flex items-center">
                    <span className="text-lg text-amber-500">NÔNG SẢN</span>
                </div>
            </li>
            {category.map(
                (item, index) =>
                    item.type === 'agricultural' && (
                        <li
                            onClick={() => setActive(item.name)}
                            key={item._id}
                            className={`${
                                active === item.name && 'bg-indigo-700'
                            } flex w-full justify-between transition-all text-white font-medium hover:text-gray-300  cursor-pointer items-center px-8 py-3 pl-12 my-2`}
                        >
                            <div className="flex items-center">
                                <GrassIcon className="icon icon-tabler icon-tabler-puzzle" width={24} height={24} />
                                <span className="text-md  ml-4">{item.name}</span>
                            </div>
                        </li>
                    )
            )}

            <li className="flex w-full justify-between text-white font-medium items-center py-3 px-8">
                <div className="flex items-center">
                    <span className="text-lg text-amber-500">SẢN PHẨM KHÁC</span>
                </div>
            </li>
            <li className="flex w-full justify-between text-white font-medium hover:text-gray-300  cursor-pointer items-center px-8 py-3 pl-12">
                <div className="flex items-center">
                    <GrainIcon className="icon icon-tabler icon-tabler-puzzle" width={24} height={24} />
                    <span className="text-md  ml-4">Nông sản công nghiệp</span>
                </div>
            </li>
            <li className="flex w-full justify-between text-white font-medium hover:text-gray-300  cursor-pointer items-center px-8 py-3 pl-12">
                <div className="flex items-center">
                    <GrainIcon className="icon icon-tabler icon-tabler-puzzle" width={24} height={24} />
                    <span className="text-md  ml-4">Nông sản công nghiệp</span>
                </div>
            </li>
            <li className="flex w-full justify-between text-white font-medium hover:text-gray-300  cursor-pointer items-center px-8 py-3 pl-12">
                <div className="flex items-center">
                    <GrainIcon className="icon icon-tabler icon-tabler-puzzle" width={24} height={24} />
                    <span className="text-md  ml-4">Nông sản công nghiệp</span>
                </div>
            </li>
            <li className="flex w-full justify-between text-white font-medium hover:text-gray-300  cursor-pointer items-center px-8 py-3 pl-12">
                <div className="flex items-center">
                    <GrainIcon className="icon icon-tabler icon-tabler-puzzle" width={24} height={24} />
                    <span className="text-md  ml-4">Nông sản công nghiệp</span>
                </div>
            </li>
        </ul>
    );
};

export default Navigation;
