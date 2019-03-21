import React, { PureComponent } from 'react';
import Button from '../../UI/Button/Button.js';
import classes from './OrderSummary.css';

class OrderSummary extends PureComponent {
    render() {
        return (
            <div className={classes.OrderSummary}>
                <h2>Looks tasty!</h2>
                <Button btnType='Danger' clicked={this.props.checkoutCanceled}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.checkoutContinued}>CONTINUE</Button>
            </div>
        )
    }
}

export default OrderSummary;