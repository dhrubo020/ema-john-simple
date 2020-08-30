import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const ReviewItem = (props) => {
    const data = props.singleProductData;

    const reviewItemStyle ={
        marginLeft: '100px',
        padding: '10px 20px',
        border: '1px solid gray',
        borderRadius: '20px',
        marginBottom: '10px'
    }
    return (
        <div style={reviewItemStyle}>
            {/* <div>
                <img src={data.img} alt=""/>
            </div> */}
            <div>
                <h4  className="product-name"><Link to={"/product/"+data.key}>{data.name}</Link></h4>
                <h3>${data.price}</h3>
            </div>
            <div>
                <p><b><small>Quantity :</small> {data.quantity}</b></p>
            </div>
            <button onClick={()=>props.itemRemove(data.key)} className="add-cart-btn">Remove</button>
        </div>
    );
};

export default ReviewItem;