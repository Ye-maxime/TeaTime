import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";
import {Container, Row, Col} from 'react-bootstrap';
import {fetchDrinks} from '../actions/drinks';
import {addToShoppingCart} from "../actions/shoppingCart";

const Menuitem = ({menuitem, onAddToShoppingCart}) => (
    <div className="menu-table-list">
        <span>{menuitem.name}</span> <span className="menuPrice">$ {menuitem.price}</span>
        <span className="icon addIcon" onClick={onAddToShoppingCart}>
          <i className="fas fa-plus-circle has-text-success"/>
        </span>
    </div>
)

class MenuList extends Component {

    componentWillMount() {
        this.props.fetchDrinks()
    }

    render() {
        const {drinks, error, isLoading, isSaving, addToShoppingCart} = this.props
        return (
            <div>
                <div className="menuPage">
                    <h1 className="menuTitle">
                        MENU
                    </h1>
                    <div className="error">{error}</div>
                    <Container>
                        <Row>
                            <Col>
                                <div className="menu-table-head">Brown Sugar Deerioca Series</div>
                                {drinks.filter((drink) => drink.collection === 'BROWN').map((brown) =>
                                    <Menuitem
                                        key={brown.id}
                                        id={brown.id}
                                        menuitem={brown}
                                        onAddToShoppingCart={() => addToShoppingCart(brown)}
                                    />)}
                            </Col>
                            <Col>
                                <div className="menu-table-head">LULU Fresh Fruit Series</div>
                                {drinks.filter((drink) => drink.collection === 'LULU').map((lulu) =>
                                    <Menuitem
                                        key={lulu.id}
                                        id={lulu.id}
                                        menuitem={lulu}
                                        onAddToShoppingCart={() => addToShoppingCart(lulu)}
                                    />)}
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => { //state is from store (type: DRINKS_DEFAULT_STATE)
    return {
        drinks: state.drinks.items,
        error: state.drinks.error,
        isLoading: state.drinks.loading,
        isSaving: state.drinks.saving,
    }
}

const mapDispatchToProps = {
    fetchDrinks,
    addToShoppingCart
}
export default connect(mapStateToProps, mapDispatchToProps)(MenuList);