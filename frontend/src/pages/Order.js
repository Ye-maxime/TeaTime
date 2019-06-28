import React, {Component} from 'react';
import OrderList from '../components/OrderList'

class Order extends Component {
    render() {
        return (
            <div style={{marginTop:  '100px'}}>
                <OrderList/>
            </div>
        );
    }
}

export default Order;