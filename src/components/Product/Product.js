import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const data = props.singleProductData;
    //const {img, name, seller, price, stock} = props.singleProductData;
    //console.log(data)
    return (
        <div className="single-product">
            <div>
                <img src={data.img} alt=""/>
            </div>
            <div>
                <h4  className="product-name"><Link to={"/product/"+data.key}>{data.name}</Link></h4>
                <p><small>By : {data.seller}</small></p>
                <h3>${data.price}</h3>
                <p><small>Only {data.stock} left in stock - Order soon</small></p>

                {
                    props.addToCartButton && <button 
                        className="add-cart-btn"
                        onClick={() => props.handleAddCart(data)}
                        >
                        <FontAwesomeIcon icon={faShoppingCart} /> 
                        Add to Cart
                    </button>
                }
                
            </div>
            
        </div>
    );
};

export default Product;