import React, {Component} from 'react'
import '../css/component.css'
import {Link} from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to={'/'} className="navbar-brand">
                    <img src="/images/teatime_logo.png" className='rounded'
                         alt="teatime logo" width="150" height="60"/>
                </Link>
                <div className="collapse navbar-collapse" id="navbar">
                    <ul className="navbar-nav justify-content-center d-flex flex-fill">
                        <li className="nav-item active">
                            <Link to={'/'} className="nav-link"> HOME </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/menu'} className="nav-link"> MENU </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/store'} className="nav-link"> STORE </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/account'} className="nav-link"> ACCOUNT </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/shopping_cart'} className="nav-link"><i
                                className='fas fa-shopping-cart'/></Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;