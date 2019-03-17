import React from 'react';
import OrderSummary from '../../components/Order/OrderSummary/OrderSummary';
import classes from './Checkout.css';

const Checkout = (props) => {
    return (
        <div className={classes.Checkout}>
            <OrderSummary />
        </div>        
    )
}

export default Checkout;