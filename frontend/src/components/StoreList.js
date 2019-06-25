import React, {Component} from 'react';
import {fetchStores} from "../actions/stores";
import connect from "react-redux/es/connect/connect";

const Store = ({store, id}) => (
    <div className="box drink-item level is-mobile">
        <span>{store.name}</span>
        <span>{store.address}</span>
        <span>{store.telephone}</span>
        <span>{store.openTime}</span>
    </div>
)

class StoreList extends Component {
    componentDidMount() {
        this.props.fetchStores()
    }

    render() {
        const {stores, error, isLoading} = this.props
        return (
            <div className="container drink-list">
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