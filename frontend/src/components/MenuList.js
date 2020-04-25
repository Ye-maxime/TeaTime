import React, { Component } from 'react'
import { connect } from "react-redux";
import { Container, Row, Col } from 'react-bootstrap';
import { Modal } from 'antd';
import { fetchDrinks } from '../actions/drinks';
import { addToShoppingCart } from "../actions/shoppingCart";
import { getCorrespondDrinkImage } from "../util/ComponentUtil";

const Menuitem = ({ menuitem, onAddToShoppingCart }) => (
    <div className="menu-table-list row">
        <img className="col-md-3"
            src={getCorrespondDrinkImage(menuitem.image)}
            alt='product' />
        <div>
            <span>{menuitem.name}</span>
            <span className="menuPrice">{menuitem.price}€</span>
            <span className="icon addIcon" onClick={onAddToShoppingCart}>
                <i className="fas fa-plus-circle has-text-success" />
            </span>
        </div>
    </div>
)

class MenuList extends Component {
    state = { visible: false };

    componentDidMount() {
        this.props.fetchDrinks()
    }

    onAddToShoppingCart(product) {
        const productInCart = this.props.shoppingCartItems.find((item) => item.id === product.id);
        const currentStock = productInCart ? productInCart.stock : product.stock;

        if (currentStock > 0) {
            this.props.addToShoppingCart(product);
        } else {
            // Show modal
            this.setState({ visible: true });
        }
    }

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { drinks, error, isLoading } = this.props
        return (
            <div className="container">
                <Modal
                    title="Error"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>This product is out of stock!</p>
                </Modal>
                <h1 className="menuTitle">
                    MENU
                    </h1>
                <div className="error">{error}</div>
                {isLoading ? <div className="spinner-border text-primary" role="status" />
                    :
                    <Container>
                        <Row>
                            <Col>
                                <div className="menu-table-head">Brown Sugar Deerioca Series</div>
                                {drinks.filter((drink) => drink.collection === 'BROWN').map((brown) =>
                                    <Menuitem
                                        key={brown.id}
                                        id={brown.id}
                                        menuitem={brown}
                                        onAddToShoppingCart={() => this.onAddToShoppingCart(brown)}
                                    />)}
                            </Col>
                            <Col>
                                <div className="menu-table-head">LULU Fresh Fruit Series</div>
                                {drinks.filter((drink) => drink.collection === 'LULU').map((lulu) =>
                                    <Menuitem
                                        key={lulu.id}
                                        id={lulu.id}
                                        menuitem={lulu}
                                        onAddToShoppingCart={() => this.onAddToShoppingCart(lulu)}
                                    />)}
                            </Col>
                        </Row>
                    </Container>}
            </div>
        )
    }
}

const mapStateToProps = (state) => { //state is from store (type: DRINKS_DEFAULT_STATE)
    return {
        drinks: state.drinks.items,
        error: state.drinks.error,
        isLoading: state.drinks.loading,
        shoppingCartItems: state.shoppingCart.items
    }
}

const mapDispatchToProps = {
    fetchDrinks,
    addToShoppingCart
}
export default connect(mapStateToProps, mapDispatchToProps)(MenuList);