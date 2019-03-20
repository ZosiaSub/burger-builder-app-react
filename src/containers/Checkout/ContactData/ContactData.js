import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classses from './ContactData.css';

class ContactData extends React.Component {
    state = {
        name: '',
        email: '',
        adress: {
            street: '',
            postalCode: ''
        }
    }
    
    render() {
        return (
            <div className={classses.ContactData}>
                <h4>Enter your contact data</h4>
                <form>
                    <input className={classses.Input} type='text' name='name' placeholder='Your name'></input>
                    <input className={classses.Input} type='email' name='email' placeholder='Your e-mail'></input>
                    <input className={classses.Input} type='text' name='street' placeholder='Street'></input>     <input className={classses.Input} type='text' name='postalCode' placeholder='Postal code'></input>
                    <Button btnType='Success'>ORDER</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;