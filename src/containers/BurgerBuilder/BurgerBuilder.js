import React, { Component } from 'react';
import Aux from '../../hoc/Wrapper';
import Burger from '../../components/Burger/Burger';
import BuildConstrols from '../../../src/components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import BurgerSummary from '../../components/Burger/BurgerSummary/BurgerSummary';
import axios from '../../../src/axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandling/withErrorHandling';

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        ingredientsPrice: {
            salad: 0.5,
            cheese: 0.4,
            meat: 0.9,
            bacon: 0.7
        },
        totalPrice: 0,
        purchasable: false,
        purchasing: false,
        loading: false,
    }

    componentDidMount() {
        axios.get('https://burger-app-e1816.firebaseio.com/ingredients.json')
            .then(response => {
                console.log(response)
                this.setState({ingredients: response.data})
            })
            .catch(err => console.log('problems with retriving data'));
            
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.setState({ loading: true });
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Zenon Zorro',
        //         address: {
        //             street: 'Budyniowa 43',
        //             zipCode: '72-300',
        //             City: 'Szczecin',
        //         },
        //         email: 'zochurka@o2.pl',
        //     },
        //     deliveryMethod: 'fastest',
        // };
        // axios.post('./orders.json', order)
        //     .then((response) => {
        //         this.setState({ loading: false, purchasing: false });
        //     })
        //     .catch(error => {
        //         this.setState({ loading: false, purchasing: false });
        //     });
        
        const queryParams = [];
        queryParams.push('price=' + this.state.totalPrice);
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname:'/checkout',
            search: '?' + queryString,
        });
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
        let orderSummary = null;
        if (this.state.ingredients) {
            orderSummary = (
                <BurgerSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice.toFixed(2)}
            continueSummary={this.purchaseContinueHandler}
            cancel={this.purchaseCancelHandler}
            />
            )
        }
        
        if(this.state.loading) {
            orderSummary = <Spinner />;
        }
        let burger = <Spinner />;
        if (this.state.ingredients){
           burger = (
               <Aux>
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
        
        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
