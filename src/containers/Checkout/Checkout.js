import React from 'react';
import OrderSummary from '../../components/Order/OrderSummary/OrderSummary';
import classes from './Checkout.css';

class Checkout extends React.PureComponent {

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        return (
        <div className={classes.Checkout}>
            <OrderSummary 
                checkoutCanceled={this.checkoutCanceledHandler}
                checkoutContinued={this.checkoutContinuedHandler}
            />
        </div>        
        )
    }
}

export default Checkout;