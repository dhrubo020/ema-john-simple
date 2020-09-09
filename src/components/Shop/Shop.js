import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData'
import '../../components/Shop/Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const itemList = fakeData.slice(0, 10);
    //console.log(typeof (itemList))
    const [products, setProducts] = useState(itemList);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = getDatabaseCart(); // get all items as a object
        const productKeys = Object.keys(savedCart); // productKeys array
        // cartProduct is an Array of cart items from map()
        const cartProducts = productKeys.map(key => {     // loop through the keys
            const products = fakeData.find(pd => pd.key === key) // find each key in database
            products.quantity = savedCart[key]; // set a new property quantity in each product object
            return products; // return each updated product
        })

        console.log(cartProducts);
        setCart(cartProducts) // set updated cart list in state
    }, [])


    const handleAddCart = (props) => {
        const sameProduct = cart.find(pd => pd.key === props.key);
        let newCart;
        let count = 1;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const restProducts = cart.filter(pd => pd.key !== props.key)
            newCart = [...restProducts, sameProduct];
        } else {
            props.quantity = 1;
            newCart = [...cart, props]
        }
        setCart(newCart);
        addToDatabaseCart(props.key, count);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(singleProduct =>
                        <Product
                            addToCartButton={true}
                            key={singleProduct.key}
                            singleProductData={singleProduct}
                            handleAddCart={handleAddCart}
                        >
                        </Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cartData={cart}>
                    <Link to="/review">
                        <button type="button" className="palce-order" >Review order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;