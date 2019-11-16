import React, { Component } from "react";
import { connect } from "react-redux";
import { getAccountInfos, resetRedirectState } from "../actions/account";
import history from '../history';

class AccountInfo extends Component {
    componentDidMount() {
        this.props.getAccountInfos()
    }

    componentDidUpdate() {
        if (this.props.error) {
            this.props.resetRedirectState();
            // user not logged in
            history.push('/login');
        }
    }

    render() {
        // let { showDetail, currentOrderId } = this.state
        const { account, error, isLoading } = this.props
        return (
            <div className='container'>
                <div className="error">{error}</div>
                <h1>My infos</h1>
                <h2>firstname: {account.firstname}</h2>
                <h2>lastname: {account.lastname}</h2>
                <h2>email: {account.email}</h2>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account.account,
        error: state.account.error,
        isLoading: state.account.loading
    }
}

const mapDispatchToProps = {
    getAccountInfos,
    resetRedirectState
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo)