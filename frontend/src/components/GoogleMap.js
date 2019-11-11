import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { clickIcon, defaultIcon } from '../assets/bundle';
import { googleMapApiKey } from '../config/config'

class StoreMap extends Component {
    state = {
        zoomValue: 12,
        center: { lat: 48.88, lng: 2.33 },
    }

    onMarkerClick = (props) => {
        this.props.showStore(props.position)
        this.setState({
            zoomValue: 15,
            center: props.position
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.storeSelected !== 0) {
            this.setState({
                center: this.getPositionFromId(nextProps.storeSelected),
                zoomValue: 15
            })
        }
    }

    getPositionFromId = (id) => {
        const storeFind = this.props.stores.find((store) => {
            return store.id === id
        });
        return { lat: storeFind.latitude, lng: storeFind.longitude }
    }


    displayMarkers = () => {
        return this.props.stores.map((store, index) => {
            return <Marker
                key={index}
                id={index}
                position={{ lat: store.latitude, lng: store.longitude }}
                onClick={this.onMarkerClick}
                icon={this.props.storeSelected === store.id ? clickIcon : defaultIcon} />
        })
    }

    render() {
        const { zoomValue, center } = this.state
        return (
            <Map
                google={this.props.google}
                zoom={zoomValue}
                className='mapStyles'
                initialCenter={center}
                center={center}>
                {this.displayMarkers()}
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: googleMapApiKey
})(StoreMap);