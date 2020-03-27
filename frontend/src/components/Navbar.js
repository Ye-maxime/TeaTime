import React, { Component } from 'react';
import { connect } from "react-redux";
import '../assets/css/component.css';
import { Link } from 'react-router-dom';
import {
    teatime_logo,
    uk_flag,
    fr_flag,
    avatar,
    avatar_default
} from '../assets/bundle';
import { FormattedMessage } from 'react-intl';
import { setLocale } from '../actions/locale';
import history from '../history';
import Utils from '../util/Utils';

class Navbar extends Component {
    renderLink() {
        const link = Utils.getAccountIdFromLocalStorage() ? '/account' : '/login';
        history.push(link);
    }

    render() {
        const { shoppingCart, account, setLocale } = this.props;
        const calculateCartItems = () => {
            let items = 0;
            if (shoppingCart.items.length > 0) {
                shoppingCart.items.forEach((product) => items += product.quantity)
            }
            return items;
        };

        const getUserAvatarImage = () => {
            if (account.account.id) {
                // when user just logged in, retrieve the account state in store 
                return avatar;
            } else {
                return Utils.getAccountIdFromLocalStorage() ? avatar : avatar_default;
            }
        };

        return (
            <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-light">
                <Link to={'/'} className="navbar-brand">
                    <img src={teatime_logo} className='rounded'
                        alt="teatime logo" width="150" height="60" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse bg-light" id="navbarCollapse">
                    <ul className="navbar-nav">
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
                            <Link to={'/shopping_cart'} className="nav-link">
                                <i className='fas fa-shopping-cart' />
                                <span className="shopping-card-red-icon">
                                    {calculateCartItems()}
                                </span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <img src={getUserAvatarImage()} alt="Avatar" className="avatar" onClick={this.renderLink.bind(this)}></img>
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
        shoppingCart: state.shoppingCart, // use the whole state in stead of the 'items' in shoppingCart, because modify the quantity does not force to rerender the page
        account: state.account
    }
}

const mapDispatchToProps = {
    setLocale
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);