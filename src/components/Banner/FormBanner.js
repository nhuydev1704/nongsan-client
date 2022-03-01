import React, { Fragment } from 'react';
import { Button, FormControl, Grid, InputLabel, TextField } from '@mui/material';
import NumberFormat from 'react-number-format';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { useSelector } from 'react-redux';
import GetNotification from '../../utils/GetNotification';
import BackupIcon from '@mui/icons-material/Backup';
import { imageUpload } from '../../utils/common';
import AddIcon from '@mui/icons-material/Add';

const FormBanner = ({ id, dataBanner, setDataBanner, handleSubmit }) => {
    console.log('🚀 ~ file: FormBanner.js ~ line 13 ~ FormBanner ~ id', id);
    const [dataCategory, setDataCategory] = React.useState([]);
    const [selected, setSelected] = React.useState({});
    const { category, auth } = useSelector((state) => state);
    const [checkUpdate, setCheckUpdate] = React.useState(false);

    React.useEffect(() => {
        if (!(category.category.length > 0) && !category) return;
        // map category category and children category
        const mapCategory = [];

        category.category.forEach((element) => {
            mapCategory.push(element);

            if (element.children) {
                element.children.forEach((element) => {
                    mapCategory.push(element);
                });
            }
        });

        if (!id) {
            setSelected(mapCategory[0]);
        }

        setDataCategory(mapCategory);
    }, [category.category, category]);

    const handleUpfile = async (e) => {
        e.preventDefault();
        try {
            if (auth?.user?.role !== 'admin') return GetNotification('Bạn không phải quản trị viên', 'error');
            const file = e.target.files[0];

            if (!file) return GetNotification('Tập tin không tồn tại', 'error');

            if (file.size > 1024 * 1024)
                //1mb
                return GetNotification('Kích cỡ quá lớn', 'error');

            if (file.type !== 'image/jpeg' && file.type !== 'image/png')
                //1mb
                return GetNotification('Tập tin không đúng định dạng', 'error');

            setDataBanner({ ...dataBanner, image: file });
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    React.useLayoutEffect(() => {
        if (checkUpdate) return;
        if (id) {
            const mapCategory = [];

            category.category.forEach((element) => {
                mapCategory.push(element);

                if (element.children) {
                    element.children.forEach((element) => {
                        mapCategory.push(element);
                    });
                }
            });
            // const data = mapCategory.find((item) => item._id == id);
            // find banner for id

            setSelected(() => mapCategory.find((item) => item._id === dataBanner.category));
            // setCheckUpdate(true);
        }
    }, [id, dataBanner?.category, dataBanner, dataCategory, category.category, category]);

    return (
        <div className="mx-6 py-12 relative">
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Tiêu đề khuyến mại"
                        name="title"
                        value={dataBanner.title}
                        onChange={(e) => setDataBanner({ ...dataBanner, title: e.target.value })}
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Listbox
                        value={selected}
                        onChange={(value) => {
                            setSelected(value);
                            setDataBanner({ ...dataBanner, category: value._id });
                        }}
                    >
                        <div className="relative">
                            <Listbox.Button className="relative w-full py-3 pl-3 pr-10 text-left bg-white rounded-lg  cursor-pointer shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                                <span className="block truncate text-base">{selected?.name}</span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="z-50 absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {dataCategory &&
                                        dataCategory.length > 0 &&
                                        dataCategory.map((person, personIdx) => (
                                            <Listbox.Option
                                                key={personIdx}
                                                className={({ active }) =>
                                                    `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                                                    cursor-pointer select-none relative py-2 pl-10 pr-4 `
                                                }
                                                value={person}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <span
                                                            className={`${
                                                                selected ? 'font-medium' : 'font-normal'
                                                            } block truncate text-left`}
                                                        >
                                                            {person.name}
                                                        </span>
                                                        {selected ? (
                                                            <span
                                                                className={`${
                                                                    active ? 'text-amber-600' : 'text-amber-600'
                                                                }
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
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button variant="contained" component="label" startIcon={<BackupIcon />}>
                        Chọn ảnh bìa
                        <input type="file" hidden onChange={handleUpfile} />
                    </Button>
                </Grid>
                <Grid item xs={12} md={12} className="flex items-center justify-center">
                    <div className="mt-4">
                        <Button variant="contained" onClick={handleSubmit} component="label" startIcon={<AddIcon />}>
                            {id ? 'Cập nhật' : 'Thêm'} banner
                        </Button>
                    </div>
                </Grid>
            </Grid>
            <div className="absolute right-0 mt-3 top-0 text-red-600">
                *Chọn ảnh banner và danh mục sản phẩm được giảm giá*
            </div>
        </div>
    );
};

export default FormBanner;
