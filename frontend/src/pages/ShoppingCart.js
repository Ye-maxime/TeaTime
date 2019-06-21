import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";

const Product = ({product}) => (
    <div className="box drink-item level is-mobile">
        <span>
            <b>Product : </b> {product.name}
            <b> Price :   </b> {product.price}
        </span>
        <span>
            <b>Quantity : </b> {product.quantity}
        </span>
    </div>
)

class ShoppingCart extends Component {
    render() {
        const {products, total} = this.props
        return (
            <div>
                <h1>Total : {total}</h1>
                <div className="container drink-list">
                    {products.map((product) =>
                        <Product
                            key={product.id}
                            id={product.id}
                            product={product}
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

export default connect(mapStateToProps, null)(ShoppingCart)