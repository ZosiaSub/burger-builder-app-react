import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map(iKey => 
        {
            return [...Array(props.ingredients[iKey])].map((_, i) => {
                 return <BurgerIngredient key={iKey + i} type={iKey} />
            }) 
        }).reduce((arr, el) => {
            return arr.concat(el);
        }, []);
        console.log(transformedIngredients);
    if (transformedIngredients.length === 0){
        transformedIngredients = <p>Please select your ingredients!</p>
    };
    
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default burger;
