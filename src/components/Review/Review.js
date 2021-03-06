import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import orderPlacedImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';


const Review = () => {
    // showing car list
    const [cartList, setCarlist] = useState([]);
    const [orderPlace, setOrderPlace] = useState(false);
    useEffect(() => {
        const savedCart = getDatabaseCart(); // get all items as a object
        const productKeys = Object.keys(savedCart); // productKeys array

        fetch(`https://dhrubo001.herokuapp.com/productByKeys`,{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(productKeys)
        })
        .then(res=>res.json())
        .then(data=>setCarlist(data))



    // const [allProducts, setAllProducts] = useState([]);
    // useEffect(() => {
    //     fetch(`https://dhrubo001.herokuapp.com/allProduct`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setAllProducts(data);
    //         })
    // }, [])

        // if (allProducts.length > 0) {
        //     // cartProduct is an Array of cart items from map()
        //     const cartProducts = productKeys.map(key => {     // loop through the keys
        //         const products = allProducts.find(pd => pd.key === key) // find each key in database
        //         products.quantity = savedCart[key]; // set a new property quantity in each product object
        //         return products; // return each updated product
        //     })

        //     console.log(cartProducts);
        //     setCarlist(cartProducts) // set updated cart list in state
        // }
    }, [])

    const itemRemove = (props) => {
        const newCart = cartList.filter(pd => pd.key !== props);
        setCarlist(newCart);
        console.log(cartList.length);
        removeFromDatabaseCart(props);
    }

    const history = useHistory()
    const proceedCheckoutClick = () => {
        history.push('/shipment')
    }


    return (
        <div className="shop-container">

            <div className="product-container">
                {
                    cartList.map(each => <ReviewItem key={each.key} itemRemove={itemRemove} singleProductData={each}></ReviewItem>)
                }
                {
                    orderPlace && <img src={orderPlacedImage} alt="" />
                }
            </div>

            <div className="cart-container">
                <Cart cartData={cartList}>
                    <button type="button" onClick={proceedCheckoutClick} className="palce-order" >Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;