import React, { useState } from 'react';
import { connect } from "react-redux";
import { changeQuantity, removeFromCart } from '../actions/shoppingCart';
import { Link } from 'react-router-dom';
import { getCorrespondDrinkImage } from "../util/ComponentUtil";

const Product = ({ product, onRemoveFromCart, onChangeQuantity }) => {
    const maxPurchaseNumber = product.quantity + product.stock;

    const [quantity, setQuantity] = useState(product.quantity);

    const handleInputChange = event => {
        const newQuantity = parseInt(event.target.value, 0);
        const updatedProduct = { ...product, quantity: newQuantity };
        onChangeQuantity(updatedProduct);
        setQuantity(newQuantity);
    };

    const handleOnKeyDown = event => {
        //add tabIndex="0" in input tag
        event.preventDefault();
    };

    return (
        <tr>
            <td className="col-sm-8 col-md-6">
                <div className="media">
                    <img className="mr-3 shopping-cart-product-img"
                        src={getCorrespondDrinkImage(product.image)}
                        alt='product' />
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
                <input type="number" className="form-control text-center" min='1' max={maxPurchaseNumber} value={quantity}
                    onChange={handleInputChange}
                    onKeyDown={handleOnKeyDown}
                    tabIndex="0" />
            </td>
            <td className="col-sm-1 col-md-1 text-center">
                <strong>{product.price}€</strong>
            </td>
            <td className="col-sm-1 col-md-1 text-center">
                <strong>{product.price * product.quantity}€</strong>
            </td>
            <td className="col-sm-1 col-md-1">
                <button type="button" className="btn btn-danger" onClick={onRemoveFromCart}>
                    <span className="glyphicon glyphicon-remove"></span>
                    Remove
                </button>
            </td>
        </tr>
    );
}


const ShoppingCartList = props => {
    return (
        <div className="container">
            {props.products.length > 0 ? <table className="table table-hover">
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
                    {props.products.map((product) =>
                        <Product
                            key={product.name}
                            product={product}
                            onRemoveFromCart={() => props.removeFromCart(product)}
                            onChangeQuantity={(pro) => props.changeQuantity(pro)}
                        />)}
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><h3>Total</h3></td>
                        <td className="text-right"><h3><strong>{props.total}€</strong></h3></td>
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
                            <Link to={'/onepagecheckout'}>
                                <button type="button" className="btn btn-success">
                                    Checkout
                                    <span className="fa fa-arrow-circle-right"></span>
                                </button>
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table>
                : <h3>Your cart is currently empty</h3>
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        products: state.shoppingCart.items,
        total: state.shoppingCart.total
    }
};

const mapDispatchToProps = {
    removeFromCart,
    changeQuantity,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartList);