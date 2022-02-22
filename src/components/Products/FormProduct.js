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

const FormProduct = ({ dataProduct, setDataProduct, handleSubmit, id }) => {
    const [dataCategory, setDataCategory] = React.useState([]);
    const [selected, setSelected] = React.useState({});

    const { category, auth } = useSelector((state) => state);

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
    }, [category.category, id, dataProduct]);

    React.useEffect(() => {
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
            console.log('🚀 ~ file: FormProduct.js ~ line 53 ~ React.useEffect ~ id', id);
            if (dataProduct?.category?.parent) {
                setSelected(dataProduct?.category?.child_category);
            } else {
                setSelected(dataProduct?.category);
            }
        }
    }, [category.category, dataProduct?.category, id]);

    const handleChangeText = (e) => {
        setDataProduct({ ...dataProduct, [e.target.name]: e.target.value });
    };

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

            setDataProduct({ ...dataProduct, image: file });
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    return (
        <div className="mx-6 py-6">
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Tiêu đề sản phẩm"
                        name="title"
                        value={dataProduct.title}
                        onChange={handleChangeText}
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className="flex items-center">
                        <div className="flex-auto">
                            <NumberFormat
                                thousandsGroupStyle="thousand"
                                variant="standard"
                                name="price"
                                prefix="$"
                                decimalSeparator="."
                                value={dataProduct.price}
                                onValueChange={(values) =>
                                    handleChangeText({ target: { name: 'price', value: values.value } })
                                }
                                customInput={TextField}
                                type="text"
                                thousandSeparator={true}
                                allowNegative={true}
                                fullWidth
                                id="standard-basic"
                                label="Giá sản phẩm"
                            />
                        </div>
                        <div>
                            <TextField
                                id="standard-basic"
                                label=" "
                                name="price_text"
                                value={dataProduct.price_text}
                                onChange={handleChangeText}
                                variant="standard"
                                style={{ width: '40px', marginLeft: '10px' }}
                            />
                        </div>
                    </div>
                </Grid>
                <Grid xs={12} md={12}>
                    <label className="block ml-8 mt-5">
                        <span className="block text-base font-medium text-slate-700 text-left">Mô tả sản phẩm</span>
                        <textarea
                            rows="4"
                            type="text"
                            name="description"
                            value={dataProduct.description}
                            onChange={handleChangeText}
                            placeholder="Nhập mô tả sản phẩm"
                            className="mt-1 block px-4 w-full  py-2 bg-white border border-slate-400 rounded-md text-base shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
                        />
                    </label>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Listbox
                        value={selected}
                        onChange={(value) => {
                            setSelected(value);
                            setDataProduct({ ...dataProduct, category: value });
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
                <Grid item xs={12} md={6} className="flex items-center justify-center">
                    <Button variant="contained" component="label" startIcon={<BackupIcon />}>
                        Chọn ảnh bìa
                        <input type="file" hidden onChange={handleUpfile} />
                    </Button>
                </Grid>
                <Grid item xs={12} md={12} className="flex items-center justify-center">
                    <div className="mt-4">
                        <Button variant="contained" onClick={handleSubmit} component="label" startIcon={<AddIcon />}>
                            {id ? 'Cập nhật' : 'Thêm'} sản phẩm
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default FormProduct;
