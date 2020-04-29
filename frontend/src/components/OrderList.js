import React, { useState, useEffect } from 'react';
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

const OrderList = props => {
    const [showDetail, setShowDetail] = useState(false);
    const [currentOrderId, setCurrentOrderId] = useState(0);

    const clickSeeDetail = orderId => {
        setShowDetail(true);
        setCurrentOrderId(orderId);
    };

    const clickBackToOrderList = () => {
        setShowDetail(false);
        setCurrentOrderId(0);
    };

    useEffect(() => {
        if (props.error) {
            // user not logged in
            history.push('/login');
        } else {
            props.fetchOrders();
        }
    }, [props.error]);

    return (
        <div className='container'>
            <div className="error">{props.error}</div>
            {!showDetail ?
                (props.isLoading ? <div className="spinner-border text-primary" role="status" />
                    :
                    props.orders.map((order) =>
                        <Order
                            key={order.id}
                            id={order.id}
                            order={order}
                            onClickSeeDetail={() => clickSeeDetail(order.id)}
                        />))
                :
                <OrderDetail
                    orderId={currentOrderId}
                    clickBackToOrderList={() => clickBackToOrderList()}
                />}
        </div>
    );
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