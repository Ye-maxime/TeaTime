import React, { Component } from 'react'
import { connect } from "react-redux";
import { signup, login, resetRedirectState } from '../actions/account';
import { FormattedMessage } from 'react-intl';
import history from '../history';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

class LoginForm extends Component {
    signupFormRef = React.createRef();

    validateMessages = {
        types: {
            email: 'It\'s not a validate email!',
        },
    };

    componentDidUpdate() {
        if (this.props.redirect) {
            console.log("logged in");
            this.props.resetRedirectState();
            // change route,  please not use :  window.location.href = '/';
            history.push('/');
        }
    }

    onFinishLogin = values => {
        this.props.login(values.loginEmail, values.loginPassword);
    };

    onFinishSignup = values => {
        this.props.signup(values.signUpFirstname, values.signUpLastname, values.signUpEmail, values.signUpPassword);
    };

    onReset = () => {
        this.signupFormRef.current.resetFields();
    };

    render() {
        const { account, errorSignUp, errorLogin, isLoading, redirect } = this.props;
        return (
            <div className="container">
                <div className="row row-form">
                    <div className="col-md-5">
                        <h6 className="subtitle-login">
                            <FormattedMessage
                                id='loginForm.subtitle'
                                defaultMessage='DEFAULT' />
                        </h6>
                        <h4>
                            <FormattedMessage
                                id='loginForm.title'
                                defaultMessage='DEFAULT' />
                        </h4>
                        <div className="error">{errorLogin}</div>
                        <Form
                            className="form-login"
                            name="loginForm"
                            ref={this.loginFormRef}
                            onFinish={this.onFinishLogin}
                            validateMessages={this.validateMessages}>
                            <Form.Item
                                name="loginEmail"
                                hasFeedback
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ]}
                            >
                                <Input
                                    className="input-login"
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    placeholder="Email Address"
                                    id="loginEmail" />
                            </Form.Item>
                            <Form.Item
                                name="loginPassword"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    className="input-login"
                                    placeholder="Your password"
                                    id="loginPassword" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className='dividingLine'>
                    </div>
                    <hr></hr>

                    <div className="col-md-5">
                        <h6 className="subtitle-login">
                            <FormattedMessage
                                id='register.subtitle'
                                defaultMessage='DEFAULT' />
                        </h6>
                        <h4>
                            <FormattedMessage
                                id='register.title'
                                defaultMessage='DEFAULT' />
                        </h4>
                        <div className="error">{errorSignUp}</div>
                        <Form
                            className="form-login"
                            name="signupForm"
                            ref={this.signupFormRef}
                            onFinish={this.onFinishSignup}
                            validateMessages={this.validateMessages}>
                            <Form.Item
                                name="signUpFirstname"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your firstname!',
                                    },
                                ]}
                            >
                                <Input className="input-login" placeholder="Firstname" id="signUpFirstname" />
                            </Form.Item>
                            <Form.Item
                                name="signUpLastname"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your lastname!',
                                    },
                                ]}
                            >
                                <Input className="input-login" placeholder="Lastname" id="signUpLastname" />
                            </Form.Item>
                            <Form.Item
                                name="signUpEmail"
                                hasFeedback
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ]}
                            >
                                <Input
                                    className="input-login"
                                    placeholder="Email Address"
                                    id="signUpEmail" />
                            </Form.Item>
                            <Form.Item
                                name="signUpPassword"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password
                                    className="input-login"
                                    placeholder="Your password"
                                    id="signUpPassword" />
                            </Form.Item>
                            <Form.Item
                                name="confirmPassword"
                                dependencies={['signUpPassword']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            if (!value || getFieldValue('signUpPassword') === value) {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject('The two passwords that you entered do not match!');
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    className="input-login"
                                    placeholder="Your confirm password"
                                    id="confirmPassword" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Signup
                                </Button>
                                <Button className="signup-reset-btn" type="secondary" htmlType="button" onClick={this.onReset}>
                                    Reset
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => { //state is from store (type: ACCOUNT_DEFAULT_STATE)
    return {
        account: state.account.account,
        errorSignUp: state.account.errorSignUp, // error of sign up from backend
        errorLogin: state.account.errorLogin, // error of login from backend
        isLoading: state.account.loading,
        redirect: state.account.redirect
    }
}

const mapDispatchToProps = {
    signup,
    login,
    resetRedirectState
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)