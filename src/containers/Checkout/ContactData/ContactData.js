import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classses from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends React.Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name',
                },
                value: '',
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',
                },
                value: '',
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail',
                },
                value: '',
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest'},
                        { value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value: '',
            }
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        const orderForm = this.state.orderForm;
        const orderData = {};
        for (let key in orderForm){
            orderData[key] = orderForm[key].value;
        }
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: orderData,
        }
        axios.post('./orders.json', order)
            .then((response) => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    changeInputHandler = (event, inputKey) => {
        const changedOrderForm = { ...this.state.orderForm };
        const orderFormOption = { ...changedOrderForm[inputKey]}
        orderFormOption.value = event.target.value;
        changedOrderForm[inputKey] = orderFormOption;
        this.setState({ orderForm: changedOrderForm })
    }
    
    render() {
        let formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key],
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements.map((formElement) => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig}    
                        value={formElement.config.value}
                        clicked={(event) => this.changeInputHandler(event, formElement.id)}
                    />
                ))}
                <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>    
            </form>
        )
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classses.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;