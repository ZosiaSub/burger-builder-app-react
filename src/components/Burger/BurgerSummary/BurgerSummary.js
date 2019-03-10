import React, { PureComponent } from 'react';
import Aux from '../../../hoc/Wrapper';
import Button from '../../UI/Button/Button';

class BurgerSummary extends PureComponent {
    componentWillUpdate () {
        console.log('BurgerSummary ComponentWillUpdate');
    }
    render () {
        const { ingredients, price, cancel, continueSummary } = this.props;
        const summaryIngredients = Object.keys(ingredients).map((key) => {
        return ( 
            <li key={key}>
                <span style={{ textTransform: 'capitalize' }}>{key}</span>: {ingredients[key]}
            </li> );
        });
        return (
            <Aux>
                <h3>YOUR ORDER</h3>
                <p>This is your delicious burger with following ingredients:</p>
                <ul>
                    {summaryIngredients}
                </ul>
                <p><strong>Total price: {price}</strong></p>
                <p>Continue to checkout?</p>
                <Button 
                    btnType='Danger' 
                    clicked={cancel}>
                    CANCEL
                </Button>
                <Button 
                    btnType='Success'
                    clicked={continueSummary}>
                    CONTINUE
                </Button>
            </Aux>
        )
    }
}

export default BurgerSummary;