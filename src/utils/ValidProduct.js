export const ValidProduct = (product) => {
    const { title, price, description, image, category, child_category } = product;
    let error = '';
    if (!title) {
        error = 'Tên sản phẩm không được để trống';
    }
    if (!price) {
        error = 'Giá sản phẩm không được để trống';
    }
    if (!description) {
        error = 'Mô tả sản phẩm không được để trống';
    }
    if (!image) {
        error = 'Hình ảnh sản phẩm không được để trống';
    }
    if (!category) {
        error = 'Danh mục sản phẩm không được để trống';
    }

    return error;
};
