import React, { useEffect } from 'react';
import { fetchStores, showStore, clickStore } from "../actions/stores";
import { connect } from "react-redux";
import { Container } from 'react-bootstrap';
import StoreMap from "./GoogleMap";

const Store = ({ store, selectedStore, clickStore }) => (
    <div className={"store-card " + (selectedStore === store.id ? 'storeSelected' : '')} onClick={clickStore}>
        <p className="store-title">{store.name}</p>
        <p className="store-text">{store.address}</p>
        <p className="store-text">{store.telephone}</p>
        <p className="store-text">{store.openTime}</p>
    </div>
)

const StoreList = props => {
    useEffect(() => {
        props.fetchStores();
    }, []);

    return (
        <Container>
            <div className="error">{props.error}</div>
            <div className="store-page">
                <div className="col-md-5 store-map">
                    <StoreMap stores={props.stores} showStore={props.showStore} storeSelected={props.storeSelected} />
                </div>
                <div className="col-md-5 store-list">
                    <div className="store-list-title"> Paris</div>
                    {props.stores.map((store) =>
                        <Store
                            key={store.id}
                            id={store.id}
                            store={store}
                            selectedStore={props.storeSelected}
                            clickStore={() => props.clickStore(store)}
                        />)}
                </div>
            </div>
        </Container>
    );
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