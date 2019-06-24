import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";
import {Container,Row,Col,Table,Button} from 'react-bootstrap';


class MenuList extends Component {
    state = {drinksOrder: [], price:0}

    handleClick(event) {
        //this.setState({ value });
    }
    render() {
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
                                <tr>
                                    <th className="menu-table-list">
                                    Brown Sugar Deerioca Fresh Milk
                                        <Button variant="outline-warning" className="menu-order-button" onClick={this.handleClick()}>
                                            $6   Add
                                        </Button>
                                    </th>
                                </tr>
                                <tr>
                                    <th className="menu-table-list">
                                    Cocoa Brown Sugar Deerioca Milk
                                        <Button variant="outline-warning" className="menu-order-button" onClick={this.handleClick()}>
                                            $6   Add
                                        </Button>
                                    </th>
                                </tr>
                                <tr>
                                    <th className="menu-table-list">
                                    Matcha Brown Sugar Deerioca Milk
                                        <Button variant="outline-warning" className="menu-order-button" onClick={this.handleClick()}>
                                            $6   Add
                                        </Button>
                                    </th>
                                </tr>
                                <tr>
                                    <th className="menu-table-list">
                                    Crème Brûlée Deerioca Milk
                                        <Button variant="outline-warning" className="menu-order-button" onClick={this.handleClick()}>
                                            $6   Add
                                        </Button>
                                    </th>
                                </tr>
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