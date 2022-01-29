import React from 'react';
import { useParams } from 'react-router-dom';
import CreateProduct from '../create_product';

const EditProduct = () => {
    const { id } = useParams();
    return <CreateProduct id={id} />;
};

export default EditProduct;
