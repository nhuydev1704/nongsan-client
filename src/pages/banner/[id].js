import React from 'react';
import { useParams } from 'react-router-dom';
import Banner from '../banner';

const EditProduct = () => {
    const { id } = useParams();
    return <Banner id={id} />;
};

export default EditProduct;
