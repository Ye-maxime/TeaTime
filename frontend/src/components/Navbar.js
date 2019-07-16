import React, { Component } from 'react';
import { connect } from "react-redux";
import '../assets/css/component.css';
import { Link } from 'react-router-dom';
import teatime_logo from '../assets/images/teatime_logo.png';
import uk_flag from '../assets/images/uk.png';
import fr_flag from '../assets/images/fr.png';
import { FormattedMessage } from 'react-intl';
import { setLocale } from '../actions/locale';

class Navbar extends Component {
    render() {
        const { products, setLocale } = this.props
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to={'/'} className="navbar-brand">
                    <img src={teatime_logo} className='rounded'
                        alt="teatime logo" width="150" height="60" />
                </Link>
                <div className="collapse navbar-collapse" id="navbar">
                    <ul className="navbar-nav justify-content-center d-flex flex-fill">
                        <li className="nav-item active">
                            <Link to={'/'} className="nav-link">
                                <FormattedMessage
                                    id='navbar.home'
                                    defaultMessage='DEFAULT' />
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/menu'} className="nav-link">
                                <FormattedMessage
                                    id='navbar.menu'
                                    defaultMessage='DEFAULT' />
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/store'} className="nav-link">
                                <FormattedMessage
                                    id='navbar.store'
                                    defaultMessage='DEFAULT' />
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/account'} className="nav-link">
                                <FormattedMessage
                                    id='navbar.account'
                                    defaultMessage='DEFAULT' />
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/shopping_cart'} className="nav-link"><i
                                className='fas fa-shopping-cart' />
                                <span className="shopping-card-red-icon">{{ products }.products.length}</span>
                            </Link>
                        </li>
                        <li className="nav-item flags">
                            <img src={uk_flag} className='flag-img' alt="lang_english" onClick={() => setLocale('en')} />
                            <img src={fr_flag} className='flag-img' alt="lang_french" onClick={() => setLocale('fr')} />
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.shoppingCart.items,
    }
}

const mapDispatchToProps = {
    setLocale
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
