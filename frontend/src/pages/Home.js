import React, { Component } from 'react';
import DrinkList from '../components/DrinkList'

export default class Home extends Component {
    render() {
        return (
            <div className="custom-content">
                <DrinkList />
            </div>
        );
    }
}