import React, { PureComponent } from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button.js';
import classes from './OrderSummary.css';

class OrderSummary extends PureComponent {
    state = {
        ingredients: {
            salad: 1,
            cheese: 1,
            meat: 1,
            bacon: 1,
        }
    }
    render() {
        return (
            <div className={classes.OrderSummary}>
                <h2>Looks tasty!</h2>
                <Burger ingredients={this.state.ingredients}/>
                <Button btnType='Danger'>CANCEL</Button>
                <Button btnType='Success'>CONTINUE</Button>
            </div>
        )
    }
}

export default OrderSummary;