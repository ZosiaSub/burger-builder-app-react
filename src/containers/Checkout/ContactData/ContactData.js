import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classses from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
                <Input inputtype={'input'} type='text' name='name' placeholder='Your name'></Input>
                <Input inputtype={'input'} name='email' placeholder='Your e-mail'></Input>
                <Input inputtype={'input'} type='text' name='street' placeholder='Street'></Input>    
                <Input inputtype={'input'} type='text' name='postalCode' placeholder='Postal code'></Input>
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