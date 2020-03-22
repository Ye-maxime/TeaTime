import React, { Component } from "react";
import { connect } from "react-redux";
import { getAccountInfos, resetRedirectState } from "../actions/account";
import history from '../history';

class AccountInfo extends Component {
    componentDidMount() {
        this.props.getAccountInfos()
    }

    componentDidUpdate() {
        if (this.props.errorAccountInfo) {
            this.props.resetRedirectState();
            // user not logged in
            history.push('/login');
        }
    }

    render() {
        // let { showDetail, currentOrderId } = this.state
        const { account, errorAccountInfo, isLoading } = this.props
        return (
            <div className='container'>
                <div className="error">{errorAccountInfo}</div>
                <div className="row">
                    <div className="col-sm-6 col-md-4 infos">
                        <h3>{account.firstname} {account.lastname}</h3>
                        <p>
                            <i className="fas fa-envelope iconStyle"></i>
                            {account.email}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account.account,
        errorAccountInfo: state.account.errorAccountInfo, // error of getting account infos from backend
        isLoading: state.account.loading
    }
}

const mapDispatchToProps = {
    getAccountInfos,
    resetRedirectState
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo)