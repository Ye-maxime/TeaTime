import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { Modal } from 'antd';
import Utils from '../util/Utils';
import { getOPC } from '../actions/opc';

//参考https://github.com/fireship-io/193-paypal-checkout-v2-demos

const CheckoutForm = props => {
    const [redirect, setRedirect] = useState(false);
    const [visible, setVisible] = useState(false);
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetchOpcInfos();
    }, []);

    const fetchOpcInfos = () => {
        const id = Utils.getAccountIdFromLocalStorage();
        if (id) {
            return fetch('http://localhost:4000/v1/opc', {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.token}`
                },
                body: JSON.stringify(props.items)
            }).then(res => {
                return res.json();
            }).then(res => {
                console.log("[CheckoutForm.js#fetchOpcInfos] : get opc success, res = " + JSON.stringify(res));
                setProducts(res.availableProducts);
                setTotal(res.total);
                // 传参数给registerPaypalButton 是为了避免取到的total为state中的total  因为可能为0
                registerPaypalButton(res.availableProducts, res.total);
            }).catch(err => {
                console.log("[CheckoutForm.js#fetchOpcInfos] : get opc failed, err = " + err);
            });
        }
    }

    const registerPaypalButton = (products, total) => {
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
                            console.log("[CheckoutForm.js#onApprove] : fetch save order success, res = " + JSON.stringify(res));
                            if (res.success) {
                                // Redirect to comfirmation order page
                                setRedirect(true);
                            } else {
                                // Show modal
                                setVisible(true);
                            }
                        }).catch(err => {
                            console.log("[CheckoutForm.js#onApprove] : fetch save order failed, err = " + err);
                        });
                    }
                });
            },
            onError: err => {
                console.log(err);
            },
        }).render('#btn-paypal');//This function displays Smart Payment Buttons on your web page.
    }

    const handleOk = e => {
        setVisible(false);
    };

    const handleCancel = e => {
        setVisible(true);
    };

    let content;
    if (redirect) {
        content = <Redirect to={{
            pathname: '/confirmation_order',
            // state: { orderId: orderId }
        }} />;
    } else {
        content = <div className='container'>
            <Modal
                title="Error"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
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
        </div>;
    }

    return content;
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