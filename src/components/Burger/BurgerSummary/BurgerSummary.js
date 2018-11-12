import React from 'react';
import Aux from '../../../hoc/Wrapper';
import Button from '../../UI/Button/Button';

const burgerSummary = (props) => {
    const { ingredients } = props;
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
            <p><strong>Total price: {props.price}</strong></p>
            <p>Continue to checkout?</p>
            <Button 
                btnType='Danger' 
                clicked={props.cancel}>
                CANCEL
            </Button>
            <Button 
                btnType='Success'
                clicked={props.continue}>
                CONTINUE
            </Button>
        </Aux>
    )    
}

export default burgerSummary;