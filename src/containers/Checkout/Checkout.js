import React from 'react';
import OrderSummary from '../../components/Order/OrderSummary/OrderSummary';
import Burger from '../../components/Burger/Burger';
import classes from './Checkout.css';

class Checkout extends React.PureComponent {
    state = {
        ingredients: {
            salad: 1,
            cheese: 1,
            meat: 1,
            bacon: 1,
        }
    }

    componentDidMount() {
        console.log(this.props);
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        }
        this.setState({ ingredients: ingredients });
    }

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        return (
        <div className={classes.Checkout}>
            <Burger ingredients={this.state.ingredients}/>
            <OrderSummary 
                checkoutCanceled={this.checkoutCanceledHandler}
                checkoutContinued={this.checkoutContinuedHandler}
            />
        </div>        
        )
    }
}

export default Checkout;