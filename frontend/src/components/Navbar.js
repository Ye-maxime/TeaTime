import React, {Component} from 'react'
import '../css/component.css'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Home from '../pages/Home'
import Menu from '../pages/Menu'
import Store from '../pages/Store'
import ShoppingCart from "../pages/ShoppingCart";
import Order from "../pages/Order";

class Navbar extends Component {
    render() {
        return (
            <Router>
                <nav className="navbar is-transparent is-fixed-top is-light">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="https://bulma.io">
                            <img src="https://bulma.io/images/bulma-logo.png"
                                 alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28"/>
                        </a>
                        <div className="navbar-burger burger" data-target="navbarExampleTransparentExample">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div id="navbarExampleTransparentExample" className="navbar-menu">
                        <div className="navbar-start navbar-center">
                            <Link to={'/'} className="navbar-item navbar-item-margin"> HOME </Link>
                            <Link to={'/menu'} className="navbar-item navbar-item-margin"> MENU </Link>
                            <Link to={'/store'} className="navbar-item navbar-item-margin"> STORE </Link>
                            <div className="navbar-item has-dropdown is-hoverable navbar-item-margin">
                                <a className="navbar-link" href="https://bulma.io/documentation/overview/start/">
                                    ACCOUNT
                                </a>
                                <div className="navbar-dropdown is-boxed">
                                    <a className="navbar-item" href="https://bulma.io/documentation/overview/start/">
                                        Informations
                                    </a>
                                    <Link to={'/order'} className="navbar-item">
                                        Orders
                                    </Link>
                                </div>
                            </div>
                            <Link to={'/shopping_cart'} className="navbar-item navbar-item-margin"><i className="fas fa-shopping-cart"/></Link>
                        </div>
                    </div>
                </nav>
                <hr/>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/menu' component={Menu} />
                    <Route path='/store' component={Store} />
                    <Route path='/shopping_cart' component={ShoppingCart} />
                    <Route path='/order' component={Order} />
                </Switch>
            </Router>
        );
    }
}

export default Navbar;