import React, {Component} from 'react';
import {fetchStores} from "../actions/stores";
import connect from "react-redux/es/connect/connect";

const Store = ({store, id}) => (
    <div className="card store-card">
        <img className="card-img-top" src={'/images/teatime_opera.png'} alt="Card image cap"/>
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
)

class StoreList extends Component {
    componentDidMount() {
        this.props.fetchStores()
    }

    render() {
        const {stores, error, isLoading} = this.props
        return (
            <div className="container">
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