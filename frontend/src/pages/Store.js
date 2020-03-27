import React, {Component} from 'react';
import StoreList from '../components/StoreList'

export default class Store extends Component {
    render() {
        return (
            <div className="custom-content">
                <StoreList/>
            </div>
        );
    }
}