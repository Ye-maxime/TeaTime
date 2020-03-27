import React, { Component } from 'react';
import LoginForm from '../components/LoginForm'

export default class Login extends Component {
    render() {
        return (
            <div className="custom-content">
                <LoginForm />
            </div>
        );
    }
}