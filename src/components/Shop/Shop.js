import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData'
import '../../components/Shop/Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    // const itemList = fakeData.slice(0, 10);
    //console.log(typeof (itemList))
    const [allProducts, setAllProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch(`https://dhrubo001.herokuapp.com/allProduct`)
            .then(res => res.json())
            .then(data => {
                setAllProducts(data);
            })
    }, [])

    useEffect(() => {
        const savedCart = getDatabaseCart(); // get all items as a object
        const productKeys = Object.keys(savedCart); // productKeys array

        fetch(`https://dhrubo001.herokuapp.com/productByKeys`,{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(productKeys)
        })
        .then(res=>res.json())
        .then(data=>setCart(data))


        // cartProduct is an Array of cart items from map()
        // console.log(allProducts, productKeys)
        // if(allProducts.length > 0){
        //     const cartProducts = productKeys.map(key => {     // loop through the keys
        //         const products = allProducts.find(pd => pd.key === key) // find each key in database
        //         products.quantity = savedCart[key]; // set a new property quantity in each product object
        //         return products; // return each updated product
        //     })
    
        //     // console.log(cartProducts);
        //     setCart(cartProducts) // set updated cart list in state
        // }
    }, [allProducts])


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


    const [searchQuery, setSearchQuery] = useState(null)
    const [storeQuery, setStoreQuery] = useState(null);

    const handleSearch=(event)=>{
        if(event.target.name === 'search')
            setSearchQuery(event.target.value)
    }

    // const submitSearch=()=>{
    //     console.log(storeQuery)
    //     setSearchQuery(storeQuery)
    // }
   
    useEffect(()=>{
        console.log(searchQuery)
        searchQuery 
        &&
            fetch(`https://dhrubo001.herokuapp.com/searchproduct?q=`+searchQuery)
            .then(res=>res.json())
            .then(data=>{
                setAllProducts(data);
            })
    },[searchQuery])

    return (
        <div className="shop-container">
            <div className="product-container">
                {/* <form onSubmit={submitSearch}> */}
                    <input type="text" name="search" onChange={handleSearch} className="form-control w-50" placeholder="Search by product name..." /> 
                    {/* <button type="submit" onSubmit className="btn btn-primary">Search</button> */}
                {/* </form> */}
             <br/>
                {
                    allProducts.length > 0
                    ?
                    allProducts.map((singleProduct, index) =>
                        <Product
                            addToCartButton={true}
                            key={index}
                            singleProductData={singleProduct}
                            handleAddCart={handleAddCart}
                        >
                        </Product>)
                    :
                    <h3>Loading.....</h3>
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