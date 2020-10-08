import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CardForm from './CardForm';

const stripePromise = loadStripe('pk_test_51HZgG1Du92WZ0z3mYl4yxhKmXgHDSm4ODDtQ1oYyV4ZVRS7bnwM1T8VASgygHTYRZHTUjNMQghlPEoxijOdhvXTz00itiJqIEd');

const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            <CardForm handlePayment={handlePayment}/>
        </Elements>
    );
};

export default ProcessPayment;