import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAccountInfos, resetRedirectState } from '../actions/account';
import history from '../history';

const AccountInfo = ({
    errorAccountInfo, account, getAccountInfos, resetRedirectState,
}) => {
    useEffect(() => {
        if (errorAccountInfo) {
            resetRedirectState();
            // user not logged in
            history.push('/login');
        } else {
            getAccountInfos();
        }
    }, [errorAccountInfo]);

    return (
        <div className="container">
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

const mapStateToProps = (state) => ({
    account: state.account.account,
    errorAccountInfo: state.account.errorAccountInfo, // error of getting account infos from backend
    isLoading: state.account.loading,
})

const mapDispatchToProps = {
    getAccountInfos,
    resetRedirectState,
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo)
