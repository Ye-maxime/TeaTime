import React, {Component} from 'react';
import ShoppingCartList from '../components/ShoppingCartList'

export default class ShoppingCart extends Component {
    render() {
        return (
            <div className="custom-content">
                <ShoppingCartList/>
            </div>
        );
    }
}