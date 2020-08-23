import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const data = props.cartData;
    
    let totalPrice = 0;
    data.forEach(element => {
        totalPrice += parseFloat(element.price);
    });
    totalPrice = parseFloat(totalPrice.toFixed(2));
    let shippingCharge = 0; 
    if(totalPrice > 55.00){
        shippingCharge = 0;
    }else if(totalPrice > 15){
        shippingCharge = 5.9;
    }else{
        shippingCharge = 9.99;
    }
    let total = parseFloat((totalPrice + shippingCharge).toFixed(2));
    let tax = parseFloat((total*0.018).toFixed(2)); 
    let grandTotal = parseFloat((total + tax).toFixed(2));


    return (
        <div>
            <h2>Order Summary</h2>
            <h4>Items ordered : {data.length}</h4>
            <hr/>
            <small>
            <p>Items:               ${totalPrice}</p>
            <p>Shipping & Handling:	${shippingCharge}</p>
            <p>Total before tax:	${total}</p>
            <p>Estimated Tax:	    ${tax}</p>
            </small>
            <h3>Order Total:	    ${grandTotal}</h3>
            <button className="palce-order">Place order</button>
        </div>
    );
};

export default Cart;