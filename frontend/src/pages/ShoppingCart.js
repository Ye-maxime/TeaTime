import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import '../css/page/shoppingCart.css'
import {changeQuantity, removeFromCart} from '../actions/shoppingCart'

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
                        <img className="mr-3"
                             src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png"
                             alt='product'
                            /*style="width: 72px; height: 72px;"*//>
                        <div className="media-body">
                            <h4 className="mt-0">{product.name}</h4>
                            <span>Status: </span>
                            <span className="text-success">
                                <strong>In Stock</strong>
                            </span>
                        </div>
                    </div>
                </td>
                <td className="col-sm-1 col-md-1" /*style="text-align: center"*/>
                    <input type="number" className="form-control" min='1' max='10' value={quantity}
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


class ShoppingCart extends Component {
    render() {
        const {products, total, changeQuantity, removeFromCart} = this.props
        return (
            <div className='container' style={{marginTop: '60px'}}>
                <h2 className="subtitle title-total">Total : {total}</h2>
                <div className='row'>
                    <div className="col-sm-12 col-md-10 col-md-offset-1">
                        <table className="table table-hover">
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
                                    key={product.id}
                                    id={product.id}
                                    product={product}
                                    onRemoveFromCart={() => removeFromCart(product)}
                                    onChangeQuantity={(pro) => changeQuantity(pro)}
                                />)}
                            </tbody>
                        </table>
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
    changeQuantity
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)