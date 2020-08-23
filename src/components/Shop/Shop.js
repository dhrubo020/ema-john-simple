import React, { useState } from 'react';
import fakeData from '../../fakeData'
import '../../components/Shop/Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
    const itemList = fakeData.slice(0,10);
    const [products, setProducts] = useState(itemList);
    const [cart, setCart] = useState([]);

    const handleAddCart= (props) => {
        //console.log("clicked",props);
        const newCart = [...cart, props];
        setCart(newCart);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(singleProduct => 
                        <Product 
                            key={singleProduct.key} 
                            singleProductData={singleProduct}
                            handleAddCart = {handleAddCart}
                        >
                        </Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cartData={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;