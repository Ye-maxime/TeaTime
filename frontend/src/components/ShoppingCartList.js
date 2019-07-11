import React, {Component} from 'react';
import {connect} from "react-redux";
import {changeQuantity, removeFromCart, cleanCart} from '../actions/shoppingCart'
import {addOrder} from "../actions/orders";
import {Link} from 'react-router-dom';
import {getCorrespondDrinkImage} from "../util/ComponentUtil";

class Product extends Component {
    state = {quantity: this.props.product.quantity}

    handleInputChange(event) {
        const newQuantity = parseInt(event.target.value, 0)
        const updatedProduct = {...this.props.product, quantity: newQuantity}
        this.props.onChangeQuantity(updatedProduct)
        this.setState({quantity: newQuantity})
    }

    handleOnKeyDown(event) {
        //add tabIndex="0" in input tag
        event.preventDefault()
    }

    render() {
        let {quantity} = this.state
        const {product, onRemoveFromCart} = this.props
        return (
            <tr>
                <td className="col-sm-8 col-md-6">
                    <div className="media">
                        <img className="mr-3 shopping-cart-product-img"
                             src={getCorrespondDrinkImage(product.image)}
                             alt='product'/>
                        <div className="media-body">
                            <h4 className="mt-0">{product.name}</h4>
                            <span>Status: </span>
                            <span className="text-success">
                                <strong>In Stock</strong>
                            </span>
                        </div>
                    </div>
                </td>
                <td className="col-sm-1 col-md-1">
                    <input type="number" className="form-control text-center" min='1' max='10' value={quantity}
                           onChange={this.handleInputChange.bind(this)}
                           onKeyDown={this.handleOnKeyDown.bind(this)}
                           tabIndex="0"/>
                </td>
                <td className="col-sm-1 col-md-1 text-center">
                    <strong>{product.price}€</strong>
                </td>
                <td className="col-sm-1 col-md-1 text-center">
                    <strong>{product.price * product.quantity}€</strong>
                </td>
                <td className="col-sm-1 col-md-1">
                    <button type="button" className="btn btn-danger" onClick={onRemoveFromCart}>
                        <span className="glyphicon glyphicon-remove"></span> Remove
                    </button>
                </td>
            </tr>
        );
    }
}


class ShoppingCartList extends Component {
    checkout() {
        const {products, total, addOrder, cleanCart} = this.props
        addOrder(products, total)
        cleanCart()
    }

    render() {
        const {products, total, changeQuantity, removeFromCart} = this.props
        return (
            <div className='container'>
                <div className='row'>
                    <div className="col-sm-12 col-md-12 col-md-offset-1">
                        {products.length > 0 ? <table className="table table-hover">
                                <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th className="text-center">Price</th>
                                    <th className="text-center">Total</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {products.map((product) =>
                                    <Product
                                        key={product.name}
                                        product={product}
                                        onRemoveFromCart={() => removeFromCart(product)}
                                        onChangeQuantity={(pro) => changeQuantity(pro)}
                                    />)}
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td><h3>Total</h3></td>
                                    <td className="text-right"><h3><strong>{total}€</strong></h3></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <Link to={'/'}>
                                            <button type="button" className="btn btn-info">
                                                Continue Shopping
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={'/account'}>
                                            <button type="button" className="btn btn-success"
                                                    onClick={this.checkout.bind(this)}>
                                                Checkout <span className="fa fa-arrow-circle-right"></span>
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            : <h3>Your cart is currently empty</h3>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.shoppingCart.items,
        total: state.shoppingCart.total
    }
}

const mapDispatchToProps = {
    removeFromCart,
    changeQuantity,
    addOrder,
    cleanCart
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartList)