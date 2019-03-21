import React from 'react';
import OrderSummary from '../../components/Order/OrderSummary/OrderSummary';
import Burger from '../../components/Burger/Burger';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import classes from './Checkout.css';


class Checkout extends React.PureComponent {
    state = {
        ingredients: null,
        totalPrice: 0,
        loading: false,
    }

    componentWillMount() {
        console.log(this.props);
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            if (param === 'price') {
                this.setState({totalPrice: param[1]})
            }
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
            <Route path={this.props.match.path + '/contact-data'} 
            render={() => (<ContactData ingredients={this.state.ingredients} {...this.props}/>)} />
        </div>        
        )
    }
}

export default Checkout;