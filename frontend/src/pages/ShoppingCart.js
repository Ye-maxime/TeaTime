import React, {Component} from 'react';
import ShoppingCartList from '../components/ShoppingCartList'

export default class ShoppingCart extends Component {
    render() {
        return (
            <div style={{marginTop: '100px'}}>
                <ShoppingCartList/>
            </div>
        );
    }
}