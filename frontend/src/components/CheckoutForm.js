import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { Modal } from 'antd';
import Utils from '../util/Utils';
import { getOPC } from '../actions/opc';

//参考https://github.com/fireship-io/193-paypal-checkout-v2-demos

class CheckoutForm extends Component {
    state = {
        redirect: false,
        visible: false,
        products: [],
        total: 0
        // orderId: ''
    }

    componentDidMount() {
        this.fetchOpcInfos();
    }

    fetchOpcInfos() {
        const id = Utils.getAccountIdFromLocalStorage();
        if (id) {
            return fetch('http://localhost:4000/v1/opc', {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.token}`
                },
                body: JSON.stringify(this.props.items)
            }).then(res => {
                return res.json();
            }).then(res => {
                console.log("CheckoutForm.js#fetchOpcInfos : get opc success, res = " + JSON.stringify(res));
                this.setState({
                    products: res.availableProducts,
                    total: res.total
                });

                this.registerPaypalButton();
            }).catch(err => {
                console.log("CheckoutForm.js#fetchOpcInfos : get opc failed, err = " + err);
            });
        }
    }

    registerPaypalButton() {
        const { products, total } = this.state;
        window.paypal.Buttons({
            createOrder: (data, actions) => {
                // This function sets up the details of the transaction, including the amount and line item details.
                return actions.order.create({
                    purchase_units: [
                        {
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
                    // Call your server to save the transaction
                    const id = Utils.getAccountIdFromLocalStorage();
                    if (id) {
                        return fetch('http://localhost:4000/v1/orders/saveOrder', {
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
                            console.log("CheckoutForm.js#onApprove : fetch save order success, res = " + JSON.stringify(res));
                            if (res.success) {
                                // Redirect to comfirmation order page
                                this.setState({
                                    redirect: true
                                });
                            } else {
                                // Show modal
                                this.setState({
                                    visible: true
                                });
                            }
                        }).catch(err => {
                            console.log("CheckoutForm.js#onApprove : fetch save order failed, err = " + err);
                        });
                    }
                });
            },
            onError: err => {
                console.log(err);
            },
        }).render('#btn-paypal');//This function displays Smart Payment Buttons on your web page.
    }

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { redirect, visible, total } = this.state;

        if (redirect) {
            return <Redirect to={{
                pathname: '/confirmation_order',
                // state: { orderId: orderId }
            }} />
        } else {
            return (
                <div className='container'>
                    <Modal
                        title="Error"
                        visible={visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <p>Some products are out of stock!</p>
                        <p>Please clean the cart!</p>
                    </Modal>
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
        items: state.shoppingCart.items
    }
}

const mapDispatchToProps = {
    getOPC
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)