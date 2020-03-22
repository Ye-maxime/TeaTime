import React, { Component } from 'react'
import { connect } from "react-redux";
import { signup, login, resetRedirectState } from '../actions/account';
import { FormattedMessage } from 'react-intl';
import history from '../history';
import Utils from '../util/Utils';

class LoginForm extends Component {
    state = {
        // fields for signup
        signUpFirstname: '',
        signUpLastname: '',
        signUpEmail: '',
        signUpPassword: '',
        confirmPassword: '',
        // fields for login
        loginEmail: '',
        loginPassword: '',
        errorMsgSignUp: '',
        errorMsgLogin: ''
    }

    componentDidUpdate() {
        if (this.props.redirect) {
            console.log("logged in");
            this.props.resetRedirectState();
            // change route,  please not use :  window.location.href = '/';
            history.push('/');
        }
    }

    signup(event) {
        event.preventDefault(); // Prevent form from reloading page
        const { signUpFirstname, signUpLastname, signUpEmail, signUpPassword, confirmPassword } = this.state;
        const validateInfo = Utils.validateSignupForm(signUpFirstname, signUpLastname, signUpEmail, signUpPassword, confirmPassword);
        if (validateInfo.validated) {
            this.props.signup(signUpFirstname, signUpLastname, signUpEmail, signUpPassword);
            this.setState({ signUpPassword: '', confirmPassword: '', errorMsgSignUp: '' });
        } else {
            this.setState({ errorMsgSignUp: validateInfo.errorMsg });
        }
    }

    login(event) {
        event.preventDefault(); // Prevent form from reloading page
        const { loginEmail, loginPassword } = this.state;
        const validateInfo = Utils.validateLoginForm(loginEmail, loginPassword);
        if (validateInfo.validated) {
            this.props.login(loginEmail, loginPassword);
            this.setState({ loginPassword: '', errorMsgLogin: '' });
        } else {
            this.setState({ errorMsgLogin: validateInfo.errorMsg });
        }
    }

    render() {
        let { signUpFirstname, signUpLastname, signUpEmail, signUpPassword, confirmPassword, loginEmail, loginPassword, errorMsgSignUp, errorMsgLogin } = this.state;
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
                        <div className="error">{errorMsgLogin || errorLogin}</div>
                        <form className="form-login" onSubmit={this.login.bind(this)}>
                            <input className="form-control input-login"
                                value={loginEmail}
                                placeholder="Email Address"
                                onChange={(e) => this.setState({ loginEmail: e.target.value })} />
                            <input className="form-control input-login"
                                value={loginPassword}
                                placeholder="Password"
                                onChange={(e) => this.setState({ loginPassword: e.target.value })} />
                            <button type="submit" className="btn btn-info button-login">
                                Login
                            </button>
                        </form>
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
                        <div className="error">{errorMsgSignUp || errorSignUp}</div>
                        <form className="form-login" onSubmit={this.signup.bind(this)}>
                            <input className="form-control input-login"
                                value={signUpFirstname}
                                placeholder="First name"
                                onChange={(e) => this.setState({ signUpFirstname: e.target.value })} />
                            <input className="form-control input-login"
                                value={signUpLastname}
                                placeholder="Last name"
                                onChange={(e) => this.setState({ signUpLastname: e.target.value })} />
                            <input className="form-control input-login"
                                value={signUpEmail}
                                placeholder="Email Address"
                                onChange={(e) => this.setState({ signUpEmail: e.target.value })} />
                            <input className="form-control input-login"
                                value={signUpPassword}
                                placeholder="Password"
                                onChange={(e) => this.setState({ signUpPassword: e.target.value })} />
                            <input className="form-control input-login"
                                value={confirmPassword}
                                placeholder="Confirm Password"
                                onChange={(e) => this.setState({ confirmPassword: e.target.value })} />
                            <button type="submit" className="btn btn-info button-login">
                                Sign up
                            </button>
                        </form>
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