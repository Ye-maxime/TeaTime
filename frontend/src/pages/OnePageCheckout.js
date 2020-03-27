import React, {Component} from 'react';
import CheckoutForm from '../components/CheckoutForm'

export default class OnePageCheckout extends Component {
    render() {
        return (
            <div className="custom-content">
                <CheckoutForm/>
            </div>
        );
    }
}