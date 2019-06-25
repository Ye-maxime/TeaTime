import React, {Component} from 'react';
import StoreList from '../components/StoreList'

class Store extends Component {
    render() {
        return (
            <div style={{marginTop:  '100px'}}>
                <StoreList/>
            </div>
        );
    }
}

export default Store;