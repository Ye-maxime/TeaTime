import React, {Component} from 'react';
import LeftSideBar from '../components/LeftSideBar'
import OrderList from "../components/OrderList";
import '../css/page.css'

const tabs = {
    INFOS: 'Informations',
    ORDERS: 'Orders',
    PAYMENT: 'Payment',
    PREFERENCE: 'Preferences'
}

const SHOW_TAB_STATES = {
    1: <h1>My infos</h1>,
    2: <OrderList/>,
    3: <h1>My payment</h1>,
    4: <h1>My preferences</h1>,
}

export default class Account extends Component {

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
        ]
    }

    clickTab(tab) {
        this.setState({
            tabSelectedId: tab.id
        })
    }

    renderTabContent() {
        return (
            <div>
                {SHOW_TAB_STATES[this.state.tabSelectedId]}
            </div>
        )
    }

    render() {
        const {tabSelectedId, tabList} = this.state
        return (
            <div className='container' style={{marginTop: '60px'}}>
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