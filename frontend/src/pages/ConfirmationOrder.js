import React, { Component } from 'react';
import { connect } from "react-redux";
import { cleanCart } from '../actions/shoppingCart';

class ConfirmationOrder extends Component {
    componentDidMount() {
        this.props.cleanCart();
    }

    render() {
        return (
            <div style={{ marginTop: '100px' }}>
                Confirmation of your order {this.props.location.state.orderId}.
                <br></br>
                Thanks for your purchase!
            </div>
        );
    }
}

const mapStateToProps = (state) => { }

const mapDispatchToProps = {
    cleanCart
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationOrder)
