import React, { Component } from 'react';
import LoginForm from '../components/LoginForm'

export default class Login extends Component {
    render() {
        return (
            <div style={{marginTop: '60px'}}>
                <LoginForm />
            </div>
        );
    }
}