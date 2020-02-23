import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import Utils from '../util/Utils';

//参考https://github.com/fireship-io/193-paypal-checkout-v2-demos

class CheckoutForm extends Component {
    state = {
        redirect: false,
        orderId: ''
    }

    componentDidMount() {
        const { products, total } = this.props;
        window.paypal.Buttons({
            createOrder: (data, actions) => {
                // This function sets up the details of the transaction, including the amount and line item details.
                return actions.order.create({
                    purchase_units: [
                        {
                            // description: product.description,
                            description: "tea description",
                            amount: {
                                currency_code: 'EUR',
                                value: total,
                            },
                        },
                    ],
                });
            },
            onApprove: (data, actions) => {
                // This function captures the funds from the transaction.
                return actions.order.capture().then((details) => {
                    // alert(`Transaction completed by ${details.payer.name.given_name} and orderID: ${data.orderID}`);
                    // Call your server to save the transaction
                    const id = Utils.getAccountIdFromLocalStorage();
                    if (id) {
                        return fetch('v1/orders/saveOrder', {
                            method: 'post',
                            headers: {
                                'content-type': 'application/json',
                                'authorization': `Bearer ${localStorage.token}`
                            },
                            body: JSON.stringify({
                                accountId: id,
                                products,
                                total
                            })
                        }).then(res => {
                            return res.json();
                        }).then(res => {
                            console.log("fetch save order success ! res = " + JSON.stringify(res));
                            // redirect to comfirmation order page
                            this.setState({
                                redirect: true,
                                orderId: res.uuid
                            });
                        }).catch(err => {
                            console.log("fetch save order failed ! err = " + err);
                        });
                    }
                });
            },
            onError: err => {
                console.log(err);
            },
        }).render('#btn-paypal');//This function displays Smart Payment Buttons on your web page.
    }

    render() {
        const { products, total } = this.props;
        const { redirect, orderId } = this.state;

        if (redirect) {
            return <Redirect to={{
                pathname: '/confirmation_order',
                state: { orderId: orderId }
            }} />
        } else {
            return (
                <div className='container'>
                    <div className='row'>
                        <div className="col-sm-7 col-md-7 checkout-form border">
                            <h4>CHECKOUT FORM</h4>
                            {/*\ render paypal btn */}
                            <div id='btn-paypal'></div>
                        </div>
                        <div className="col-sm-4 col-md-4 checkout-summary border">
                            <h4>ORDER SUMMARY</h4>
                            <span>Price : {total}€</span>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.shoppingCart.items,
        total: state.shoppingCart.total
    }
}

export default connect(mapStateToProps, {})(CheckoutForm)