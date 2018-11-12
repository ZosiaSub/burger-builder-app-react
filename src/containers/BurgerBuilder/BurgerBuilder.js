import React, { Component } from 'react';
import Aux from '../../hoc/Wrapper';
import Burger from '../../components/Burger/Burger';
import BuildConstrols from '../../../src/components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import BurgerSummary from '../../components/Burger/BurgerSummary/BurgerSummary';

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
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        alert('You continue this later ;)');
    }

    updatePurchasable = (ingredients) => {
        const sum = Object.keys(ingredients)
        .map(key => {
            return ingredients[key]
        }).reduce((sum, el) => {
            return sum + el;
        }, 0)
        this.setState({ purchasable: sum > 0 });
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
        this.updatePurchasable(updatedIngredients);
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
        });
        this.updatePurchasable(updatedIngredients);
    }

    render() {
        const disabledInfo = {...this.state.ingredients}
        for (let i in disabledInfo) {
            disabledInfo[i] = disabledInfo[i] <= 0
        }
        return (
            <Aux>
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    <BurgerSummary 
                        ingredients={this.state.ingredients} 
                        price={this.state.totalPrice.toFixed(2)}
                        continue={this.purchaseContinueHandler}
                        cancel={this.purchaseCancelHandler}
                    />
                </Modal>   
                <Burger ingredients={this.state.ingredients} />
                <BuildConstrols 
                    addHandler={this.addIngredientHandler}
                    deductHandler={this.deductIngredientHandler} 
                    disabled={disabledInfo}  
                    purchasable={this.state.purchasable}
                    purchasing={this.purchaseHandler}
                    price={this.state.totalPrice} 
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;
