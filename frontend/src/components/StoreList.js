import React, { Component } from 'react';
import { fetchStores, showStore, clickStore } from "../actions/stores";
import { connect } from "react-redux";
import { Container, Row, Col } from 'react-bootstrap';
import StoreMap from "./GoogleMap";

const Store = ({ store, selectedStore, clickStore }) => (
    <div className={"store-card " + (selectedStore === store.id ? 'storeSelected' : '')} onClick={clickStore}>
        <p className="store-title">{store.name}</p>
        <p className="store-text">{store.address}</p>
        <p className="store-text">{store.telephone}</p>
        <p className="store-text">{store.openTime}</p>
    </div>
)

class StoreList extends Component {
    componentDidMount() {
        this.props.fetchStores()
    }

    render() {
        const { stores, error, showStore, storeSelected, clickStore } = this.props

        return (
            <Container className="store-contrainer">
                <div className="error">{error}</div>
                <div className="store-page">
                    <div className="col-md-5 store-map">
                        <StoreMap stores={stores} showStore={showStore} storeSelected={storeSelected} />
                    </div>
                    <div className="col-md-5 store-list">
                        <div className="store-list-title"> Paris</div>
                        {stores.map((store) =>
                            <Store
                                key={store.id}
                                id={store.id}
                                store={store}
                                selectedStore={storeSelected}
                                clickStore={() => clickStore(store)}
                            />)}
                    </div>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        stores: state.stores.items,
        error: state.stores.error,
        isLoading: state.stores.loading,
        storeSelected: state.stores.storeSelected,
    }
}

const mapDispatchToProps = {
    fetchStores,
    showStore,
    clickStore
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreList)