import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { Skeleton } from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSort } from '../../redux/actions/categoryAction';
import { getProducts, TYPES } from '../../redux/actions/productAction';
const people = [
    { name: 'Mới nhất', value: '' },
    { name: 'Cũ nhất', value: 'sort=oldest' },
    { name: 'Bán chạy nhất', value: 'sort=-sold' },
    { name: 'Cao - Thấp', value: 'sort=-price' },
    { name: 'Thấp - Cao', value: 'sort=price' },
];
const Filter = () => {
    const { category, loading, products } = useSelector((state) => state);
    const [childCate, setChildCate] = React.useState('');
    const dispatch = useDispatch();
    const [selected, setSelected] = React.useState(people[0]);

    React.useEffect(() => {
        if (!products.isNav) return;
        if (childCate && products.isNav) {
            setChildCate('');
        }
    }, [products.isNav]);

    React.useEffect(() => {
        if (category.clearSort) {
            setSelected(people[0]);
        }
    }, [category.clearSort]);

    return (
        <div className="flex justify-between items-center my-6">
            <div className="flex">
                {!loading &&
                    category.children.children &&
                    category.children.children.length > 0 &&
                    category.children.children.map((item, index) => (
                        <div
                            className="bg-white text-stone-500 font-bold py-2 px-4 rounded-full cursor-pointer w-40  text-center mr-4 shadow-lg transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:transform-none"
                            key={item._id}
                            style={{
                                background: childCate === item._id ? 'rgba(59,130,246,.8)' : 'white',
                                color: childCate === item._id ? 'white' : 'rgb(120 113 108)',
                            }}
                            onClick={() => {
                                dispatch(getProducts(1, '', `child_category=${item._id}`, false));
                                dispatch({ type: TYPES.UPDATE_PAGE, payload: true });
                                setChildCate(item._id);
                            }}
                        >
                            {item.name}
                        </div>
                    ))}
                {loading &&
                    Array.from(new Array(4)).map((item, index) => (
                        <Skeleton
                            key={index}
                            width={100}
                            height={30}
                            variant="rectangular"
                            animation="wave"
                            className="mr-4"
                            style={{ borderRadius: '9999px', backgroundColor: 'rgba(0,0,0,0.04)' }}
                        />
                    ))}
            </div>
            <div style={{ width: 240 }}>
                <Listbox
                    value={selected}
                    onChange={(value) => {
                        dispatch(clearSort(false));
                        setSelected(value);
                        dispatch(getProducts(1, '', '', false, products.params.replace('sort', value.value)));
                    }}
                >
                    <div className="relative">
                        <Listbox.Button className="relative w-full py-3 pl-3 pr-10 text-left rounded-full shadow-lg bg-white cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                            <span className="block truncate pl-2 font-bold text-stone-500">{selected.name}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </Listbox.Button>
                        <Transition
                            as={React.Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute w-full z-50 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {people.map((person, personIdx) => (
                                    <Listbox.Option
                                        key={personIdx}
                                        className={({ active }) =>
                                            `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                                            cursor-pointer select-none relative py-2 pl-10 pr-4`
                                        }
                                        value={person}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`${
                                                        selected ? 'font-medium' : 'font-normal'
                                                    } block truncate`}
                                                >
                                                    {person.name}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`${active ? 'text-amber-600' : 'text-amber-600'}
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                                    >
                                                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
            </div>
        </div>
    );
};

export default Filter;
