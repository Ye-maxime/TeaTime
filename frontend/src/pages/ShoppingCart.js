import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import { substractQuantity, addQuantity, removeFromCart } from '../actions/shoppingCart'

const Product = ({product, onSubstractQuantity, onAddQuantity, onRemoveFromCart}) => (
    <div className="box drink-item level is-mobile">
        <span>
            <b>Product : </b> {product.name}
            <b> Price :   </b> {product.price}
        </span>
        <span  onClick={onSubstractQuantity}>
            <i className="fas fa-minus-circle"/>
        </span>
        <span>
            <b>Quantity : </b> {product.quantity}
        </span>
        <span  onClick={onAddQuantity}>
            <i className="fas fa-plus-circle"/>
        </span>
        <span  onClick={onRemoveFromCart}>
            <i className="fas fa-trash"/>
        </span>
    </div>
)

class ShoppingCart extends Component {
    render() {
        const {products, total, substractQuantity, addQuantity, removeFromCart} = this.props
        return (
            <div>
                <h2 className="subtitle">Total : {total}</h2>
                <div className="container drink-list">
                    {products.map((product) =>
                        <Product
                            key={product.id}
                            id={product.id}
                            product={product}
                            onSubstractQuantity={() => substractQuantity(product)}
                            onAddQuantity={() => addQuantity(product)}
                            onRemoveFromCart={() => removeFromCart(product)}
                        />)}
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
    substractQuantity,
    addQuantity,
    removeFromCart
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)