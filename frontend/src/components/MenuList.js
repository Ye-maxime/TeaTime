import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";
import {Container,Row,Col,Table,Button} from 'react-bootstrap';

const menuitem = ({drink, id, onAddToShoppingCart}) => (
    <div className="box drink-item level is-mobile">
        <span>{drink.name} {drink.price}</span>
        <span className="icon" onClick={onAddToShoppingCart}>
          <i className="fas fa-plus-circle has-text-success"/>
        </span>
    </div>
)
class MenuList extends Component {
    state = {drinksOrder: [], price:0}

    handleClick(event) {
        //this.setState({ value });
    }
    render() {
        const {browmenu, lulumenu, addToShoppingCart} = this.props
        return (
            <div className="menuPage">
                <h1 className="menuTitle">
                    MENU
                </h1>
                <Container>
                    <Row>
                        <Col>
                            <Table responsive>
                                <thead>
                                <tr>
                                    <th className="menu-table-head">Brown Sugar Deerioca Series</th>
                                </tr>
                                </thead>
                                <tbody>
                                {browmenu.map((brow) =>
                                    <menuitem
                                        key={brow.id}
                                        id={brow.id}
                                        drink={brow}
                                        onAddToShoppingCart = {() => addToShoppingCart(brow)}
                                    />)}
                                </tbody>
                            </Table>
                        </Col>
                        <Col>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th className="menu-table-head">
                                    LULU Fresh Fruit Series
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th className="menu-table-list">
                                    Snow Strawberry Lulu (Daily limited)
                                        <Button variant="outline-warning" className="menu-order-button" onClick={this.handleClick()}>
                                            $6   Add
                                        </Button>
                                    </th>
                                </tr>
                                <tr>
                                    <th className="menu-table-list">
                                    Orange Lulu
                                        <Button variant="outline-warning" className="menu-order-button" onClick={this.handleClick()}>
                                            $6   Add
                                        </Button>
                                    </th>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default (MenuList);