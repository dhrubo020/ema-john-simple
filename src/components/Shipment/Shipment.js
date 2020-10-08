import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [shippingData, setShippingData] = useState(null)

    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = (data) => {
        setShippingData(data);
        console.log(data)
    };

    const handlePaymentSuccess=(paymentId)=>{
        console.log(paymentId)
        const savedCart = getDatabaseCart();
        const orderDetails = { ...loggedInUser, products: savedCart, shipment: shippingData, paymentId, orderTime: new Date() }

        fetch(`https://dhrubo001.herokuapp.com/addOrder`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                processOrder();
                alert("order placed successfully")
            })
    }

    console.log(watch("example")); // watch input value by passing the name of it

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div style={{display: shippingData ? 'none' : 'block'}} className="m-3">
                        < form  onSubmit={handleSubmit(onSubmit)} >
                            < input placeholder="name" name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} /><br /> <br />
                            {errors.exampleRequired && <span>name is required</span>}

                            < input placeholder="email" name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} /><br /> <br />
                            {errors.exampleRequired && <span>email is required</span>}

                            < input placeholder="phone" name="phone" ref={register({ required: true })} /><br /> <br />
                            {errors.exampleRequired && <span>phone is required</span>}

                            < input placeholder="address" name="address" ref={register({ required: true })} /><br /> <br />
                            {errors.exampleRequired && <span>address is required</span>}

                            <input type="submit" />
                        </form >
                    </div>
                </div>
                <div className="col-md-6">
                    <div style={{display: shippingData ? 'block' : 'none'}} className="m-3">
                        <h4>Payment Option</h4>
                        <ProcessPayment handlePayment={handlePaymentSuccess} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shipment;