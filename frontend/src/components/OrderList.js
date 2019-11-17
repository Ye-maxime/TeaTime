import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchOrders } from "../actions/orders";
import OrderDetail from "./OrderDetail";
import history from '../history';
import Utils from '../util/Utils';

const Order = ({ order, onClickSeeDetail }) => (
    <div className="card order-item-card">
        <div className="card-body">
            <h5 className="card-title">Order n°{order.uuid}</h5>
            <hr />
            <p className="card-text order-item-date">Date : {Utils.formatOrderDate(order.createdAt)}</p>
            <div className='row'>
                <div className='col-md-9'>
                    <p className="card-text order-item-date">Amount : {order.total}€</p>
                </div>
                <button className='btn btn-outline-info col-md-3' onClick={onClickSeeDetail}>See the detail</button>
            </div>
        </div>
    </div>
)

class OrderList extends Component {

    state = {
        showDetail: false,
        currentOrderId: 0
    }

    clickSeeDetail(orderId) {
        this.setState({
            showDetail: true,
            currentOrderId: orderId
        })
    }

    clickBackToOrderList() {
        this.setState({
            showDetail: false,
            currentOrderId: 0
        })
    }

    componentDidMount() {
        this.props.fetchOrders()
    }

    componentDidUpdate() {
        if (this.props.error) {
            // user not logged in
            history.push('/login');
        }
    }

    render() {
        let { showDetail, currentOrderId } = this.state
        const { orders, error, isLoading } = this.props
        return (
            <div className='container'>
                <div className="error">{error}</div>
                {!showDetail ?
                    (isLoading ? <div className="spinner-border text-primary" role="status" />
                        :
                        orders.map((order) =>
                            <Order
                                key={order.id}
                                id={order.id}
                                order={order}
                                onClickSeeDetail={() => this.clickSeeDetail(order.id)}
                            />))
                    :
                    <OrderDetail
                        orderId={currentOrderId}
                        clickBackToOrderList={() => this.clickBackToOrderList()}
                    />}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders.items,
        error: state.orders.error,
        isLoading: state.orders.loading,
    }
}

const mapDispatchToProps = {
    fetchOrders,
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)