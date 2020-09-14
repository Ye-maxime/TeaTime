import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchOrderDetail } from '../actions/orderDetail'
import { getCorrespondDrinkImage } from '../util/ComponentUtil';

const ProductDetail = ({ product }) => (
    <div className="card order-detail-item-card">
        <div className="row align-items-center">
            <img
                className="col-md-3 order-detail-product-img"
                src={getCorrespondDrinkImage(product.image)}
                alt="product"
            />
            <div className="col-md-3">
                <p className="card-text">{product.name}</p>
            </div>
            <div className="col-md-3">
                <p className="card-text">x{product.quantity}</p>
            </div>
            <div className="col-md-3">
                <p className="card-text">{product.quantity * product.price}€</p>
            </div>
        </div>
    </div>
)

// eslint-disable-next-line react/no-multi-comp
const OrderDetail = ({
    fetchOrderDetail, products, orderId, error, isLoading, clickBackToOrderList,
}) => {
    useEffect(() => {
        fetchOrderDetail(orderId);
    }, []);

    return (
        <div className="container">
            <div className="error">{error}</div>
            {isLoading ? <div className="spinner-border text-primary" role="status" />
                : (
                    <div className="order-detail-content">
                        <button
                            type="button"
                            className="btn btn-outline-secondary btn-back-to-list"
                            onClick={clickBackToOrderList}
                        >Back to my orders
                        </button>
                        {products.map((product) => (
                            <ProductDetail
                                key={product.id}
                                id={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                )}
        </div>
    );
}

const mapStateToProps = (state) => ({
    products: state.orderDetail.items,
    error: state.orderDetail.error,
    isLoading: state.orderDetail.loading,
})

const mapDispatchToProps = {
    fetchOrderDetail,
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail)
