import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { cleanCart } from '../actions/shoppingCart';

const ConfirmationOrder = (props) => {
    useEffect(() => {
        props.cleanCart();
    }, []);

    return (
        <div className="custom-content">
            Thanks for your purchase!
        </div>
    );
}

const mapDispatchToProps = {
    cleanCart,
}

export default connect(null, mapDispatchToProps)(ConfirmationOrder)
