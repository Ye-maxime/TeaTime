import React, {Component} from 'react'
import css from '../css/component.css'
import { Router, Link } from "@reach/router"

class Navbar extends Component {
    render() {
        return (
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
                        <a className="navbar-item navbar-item-margin" href="https://bulma.io/">
                            ABOUT
                        </a>
                        <a className="navbar-item navbar-item-margin" href="https://bulma.io/">
                            MENU
                        </a>
                        <a className="navbar-item navbar-item-margin" href="https://bulma.io/">
                            BOUTIQUE
                        </a>
                        <div className="navbar-item has-dropdown is-hoverable navbar-item-margin">
                            <a className="navbar-link" href="https://bulma.io/documentation/overview/start/">
                                ME
                            </a>
                            <div className="navbar-dropdown is-boxed">
                                <a className="navbar-item" href="https://bulma.io/documentation/overview/start/">
                                    my infos
                                </a>
                                <a className="navbar-item" href="https://bulma.io/documentation/modifiers/syntax/">
                                    shopping cart
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;