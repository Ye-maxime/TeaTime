import React, { Component } from 'react';
import LeftSideBar from '../components/LeftSideBar'
import OrderList from "../components/OrderList";
import AccountInfo from "../components/AccountInfo";
import '../assets/css/page.css';
import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import history from '../history';

const tabs = {
    INFOS: <FormattedMessage
        id='account.tab.informations'
        defaultMessage='DEFAULT' />,
    ORDERS: <FormattedMessage
        id='account.tab.orders'
        defaultMessage='DEFAULT' />,
    PAYMENT: <FormattedMessage
        id='account.tab.payment'
        defaultMessage='DEFAULT' />,
    PREFERENCE: <FormattedMessage
        id='account.tab.preferences'
        defaultMessage='DEFAULT' />,
    LOGOUT: <FormattedMessage
        id='account.tab.logout'
        defaultMessage='DEFAULT' />
}

const SHOW_TAB_STATES = {
    1: <AccountInfo />,
    2: <OrderList />,
    3: <h1>My payment</h1>,
    4: <h1>My preferences</h1>,
}

class Account extends Component {

    state = {
        tabSelectedId: 1,
        tabList: [
            {
                id: 1,
                name: tabs.INFOS
            },
            {
                id: 2,
                name: tabs.ORDERS
            },
            {
                id: 3,
                name: tabs.PAYMENT
            },
            {
                id: 4,
                name: tabs.PREFERENCE
            },
            {
                id: 5,
                name: tabs.LOGOUT
            },
        ]
    }

    clickTab(tab) {
        if (tab.name !== tabs.LOGOUT) {
            this.setState({
                tabSelectedId: tab.id
            })
        } else {
            this.logout();
        }
    }

    logout() {
        // clear localStorage
        localStorage.removeItem("account");
        localStorage.removeItem("token");
        history.push('/login');
    }

    renderTabContent() {
        return (
            <div>
                {SHOW_TAB_STATES[this.state.tabSelectedId]}
            </div>
        )
    }

    render() {
        const { tabSelectedId, tabList } = this.state
        const { account, error, isLoading } = this.props
        return (
            <div className='container' style={{ marginTop: '60px' }}>
                <div className='row'>
                    <div className='col-md-4'>
                        <LeftSideBar
                            tabSelectedId={tabSelectedId}
                            tabList={tabList}
                            clickTab={this.clickTab.bind(this)}
                        />
                    </div>
                    <div className='col-md-8 jumbotron jumbotron-fluid account-tab-content'>
                        {this.renderTabContent()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => { //state is from store (type: ACCOUNT_DEFAULT_STATE)
    return {
        account: state.account.account,
        error: state.account.error,
        isLoading: state.account.loading,
        redirect: state.account.redirect
    }
}

export default connect(mapStateToProps, {})(Account)