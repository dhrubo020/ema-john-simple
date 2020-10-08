import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {product_key} = useParams();
    const [product , setProduct] = useState({})
    useEffect(()=>{
        fetch(`https://dhrubo001.herokuapp.com/singleProduct/${product_key}`)
        .then(res=>res.json())
        .then(data=> {
            setProduct(data[0])
        })
    },[product_key])
    
    return (
        <div>
            <h1>{product_key} product details</h1>
            <Product addToCartButton={false} singleProductData={product}></Product>
        </div>
    );
};

export default ProductDetails;