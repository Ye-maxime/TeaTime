import React, {Component} from 'react';
import OrderList from '../components/OrderList'

export default class Order extends Component {
    render() {
        return (
            <div style={{marginTop:  '100px'}}>
                <OrderList/>
            </div>
        );
    }
}