import React, {Component} from 'react';
import {fetchStores} from "../actions/stores";
import connect from "react-redux/es/connect/connect";

const STORE_OPERA = 'Teatime Opéra'
const STORE_HAUSSMANN = 'Teatime Haussmann'

class Store extends Component {
    render() {
        const {store} = this.props
        const imagePath = getLocalImagePath(store.name)
        return (
            <div className="card store-card">
                <img className="card-img-top store-google-image" src={imagePath} alt="map screen"/>
                <div className="card-body">
                    <h5 className="card-title">{store.name}</h5>
                    <p className="card-text">{store.address}</p>
                    <p className="card-text">{store.telephone}</p>
                    <p className="card-text">{store.openTime}</p>
                    <a href={store.mapLink} className="btn btn-primary" target="_blank">
                        Google map
                    </a>
                </div>
            </div>
        );
    }
}

function getLocalImagePath(storeName) {
    switch (storeName) {
        case STORE_OPERA:
            return '/images/teatime_opera.png'
        case STORE_HAUSSMANN:
            return '/images/teatime_haussmann.png'
        default:
            return '/images/teatime_opera.png'
    }
}


class StoreList extends Component {
    componentDidMount() {
        this.props.fetchStores()
    }

    render() {
        const {stores, error, isLoading} = this.props
        return (
            <div className="container">
                <div className="error">{error}</div>
                {stores.map((store) =>
                    <Store
                        key={store.id}
                        id={store.id}
                        store={store}
                    />)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        stores: state.stores.items,
        error: state.stores.error,
        isLoading: state.stores.loading,
    }
}

const mapDispatchToProps = {
    fetchStores
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreList)