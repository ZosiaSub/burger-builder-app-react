import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classses from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends React.Component {
    state = {
        name: '',
        email: '',
        adress: {
            street: '',
            postalCode: ''
        },
        loading: false,
        totalPrice: 0,
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Zenon Zorro',
                address: {
                    street: 'Budyniowa 43',
                    zipCode: '72-300',
                    City: 'Szczecin',
                },
                email: 'zochurka@o2.pl',
            },
            deliveryMethod: 'fastest',
        };
        axios.post('./orders.json', order)
            .then((response) => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }
    
    render() {
        let form = (
            <form>
                <input className={classses.Input} type='text' name='name' placeholder='Your name'></input>
                <input className={classses.Input} type='email' name='email' placeholder='Your e-mail'></input>
                <input className={classses.Input} type='text' name='street' placeholder='Street'></input>     <input className={classses.Input} type='text' name='postalCode' placeholder='Postal code'></input>
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