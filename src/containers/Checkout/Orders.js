import React from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling';

class Orders extends React.Component {
    state = {
        orders: [],
        loading: true,
    }

    componentWillMount() {
        axios.get('/orders.json')
            .then(resp => {
                console.log(resp.data);
                const fetchedOrders = [];
                for ( let key in resp.data) {
                    fetchedOrders.push({
                        ...resp.data[key],
                        id: key,
                    })
                } 
                this.setState({ orders: fetchedOrders, loading: false });
            }).catch(error => {
                this.setState({ loading: false });
            })
    }

    renderOrders = () => {
        return this.state.orders.map( order => (
            <Order 
                key={order.id}
                ingredients={order.ingredients} 
                price={order.price}    
            />
        ));
    }

    render() {
        return (
            <div>
                {this.renderOrders()}
            </div>            
        )
    }
}

export default withErrorHandling(Orders, axios);