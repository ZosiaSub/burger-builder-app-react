import React from 'react';
import Aux from '../../../hoc/Wrapper';

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
            <p>Continue to checkout?</p>

        </Aux>
    )    
}

export default burgerSummary;