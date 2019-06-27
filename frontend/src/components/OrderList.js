import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {fetchOrders} from "../actions/orders";

const Order = ({order}) => (
    <li className="list-group-item">{order.uuid} {order.total}</li>
)

class OrderList extends Component {

    componentDidMount() {
        this.props.fetchOrders()
    }

    render() {
        const {orders, error, isLoading, isSaving} = this.props
        return (
            <div>
                <div className="error">{error}</div>
                <ul className="list-group">
                    {orders.map((order) =>
                        <Order
                            key={order.id}
                            id={order.id}
                            order={order}
                        />)}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders.items,
        error: state.orders.error,
        isLoading: state.orders.loading,
        isSaving: state.orders.saving,
    }
}

const mapDispatchToProps = {
    fetchOrders,
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)