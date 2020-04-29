import React, { useState } from 'react';
import LeftSideBar from '../components/LeftSideBar';
import OrderList from "../components/OrderList";
import AccountInfo from "../components/AccountInfo";
import '../assets/css/page.css';
import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import history from '../history';
import { logout } from "../actions/account";

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

const Account = props => {
    const tabList = [
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
    ];

    const [tabSelectedId, setTabSelectedId] = useState(1);

    const clickTab = tab => {
        if (tab.name !== tabs.LOGOUT) {
            setTabSelectedId(tab.id);
        } else {
            logout();
        }
    };

    const logout = () => {
        // clear account in store
        props.logout();
        // clear localStorage
        localStorage.removeItem("account");
        localStorage.removeItem("token");
        history.push('/login');
    }

    const renderTabContent = () => {
        return (
            <div>
                {SHOW_TAB_STATES[tabSelectedId]}
            </div>
        )
    };

    return (
        <div className='container custom-content'>
            <div className='row'>
                <div className='col-md-4'>
                    <LeftSideBar
                        tabSelectedId={tabSelectedId}
                        tabList={tabList}
                        clickTab={clickTab}
                    />
                </div>
                <div className='col-md-8 jumbotron jumbotron-fluid account-tab-content'>
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => { //state is from store (type: ACCOUNT_DEFAULT_STATE)
    return {
        redirect: state.account.redirect
    }
};

const mapDispatchToProps = {
    logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);