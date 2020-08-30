import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {product_key} = useParams();
    const product = fakeData.find( pd => product_key === pd.key)
    console.log(product);
    return (
        <div>
            <h1>{product_key} product details</h1>
            <Product addToCartButton={false} singleProductData={product}></Product>
        </div>
    );
};

export default ProductDetails;