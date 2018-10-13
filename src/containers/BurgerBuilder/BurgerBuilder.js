import React, { Component } from 'react';
import Aux from '../../hoc/Wrapper';
import Burger from '../../components/Burger/Burger';
import BuildConstrols from '../../../src/components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            meat: 0,
            bacon: 0
        },
        ingredientsPrice: {
            salad: 0.5,
            cheese: 0.4,
            meat: 0.9,
            bacon: 0.7
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        const oldIngredients = this.state.ingredients[type];
        const newIngredients = oldIngredients + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newIngredients;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + this.state.ingredientsPrice[type]
        this.setState({
           ingredients: updatedIngredients,
           totalPrice: newPrice            
        })
    }

    deductIngredientHandler = (type) => {
        const oldIngredients = this.state.ingredients[type];
        if (oldIngredients <= 0) {
            return
        }
        const newIngredients = oldIngredients - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newIngredients;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - this.state.ingredientsPrice[type]
        this.setState({
            totalPrice:newPrice,
            ingredients: updatedIngredients
        })
    }

    render() {
        const disabledInfo = {...this.state.ingredients}
        for (let i in disabledInfo) {
            disabledInfo[i] = disabledInfo[i] <= 0
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildConstrols 
                    addHandler={this.addIngredientHandler}
                    deductHandler={this.deductIngredientHandler} 
                    disabled={disabledInfo}  
                    price={this.state.totalPrice} 
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;
