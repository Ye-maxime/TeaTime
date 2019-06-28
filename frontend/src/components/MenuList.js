import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";
import {Container, Row, Col} from 'react-bootstrap';
import {fetchBrowMenu, fetchLuluMenu} from "../actions/menus";
import {addToShoppingCart} from "../actions/shoppingCart";

const Menuitem = ({menuitem, id, onAddToShoppingCart}) => (
    <div className="menu-table-list">
        <span>{menuitem.name}</span> <span className="menuPrice">$ {menuitem.price}</span>
        <span className="icon addIcon" onClick={onAddToShoppingCart}>
          <i className="fas fa-plus-circle has-text-success"/>
        </span>
    </div>
)

class MenuList extends Component {

    componentWillMount() {
        this.props.fetchBrowMenu()
        this.props.fetchLuluMenu()
    }

    render() {
        const {browMenus, error, luluMenus, addToShoppingCart} = this.props
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
                                {browMenus.map((brow) =>
                                    <Menuitem
                                        key={brow.id}
                                        id={brow.id}
                                        menuitem={brow}
                                        onAddToShoppingCart={() => addToShoppingCart(brow)}
                                    />)}
                            </Col>
                            <Col>
                                <div className="menu-table-head">LULU Fresh Fruit Series</div>
                                {luluMenus.map((lulu) =>
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
        browMenus: state.menus.browItems,
        luluMenus: state.menus.luluItems,
        error: state.menus.error,
        isLoading: state.menus.loading,
        isSaving: state.menus.saving,
    }
}

const mapDispatchToProps = {
    fetchBrowMenu,
    fetchLuluMenu,
    addToShoppingCart
}
export default connect(mapStateToProps, mapDispatchToProps)(MenuList);