import React, { Component } from 'react';
import { connect } from "react-redux";
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { IntlProvider } from 'react-intl';
import Navbar from './components/Navbar';
import Chatbox from './components/ChatBox';
import { Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from "./components/Protected.route";
import { Home, Menu, Store, Account, ShoppingCart, Login, OnePageCheckout, ConfirmationOrder, PageNotFound } from "./pages/bundle";
import messages from './locale/messages';

class App extends Component {
    render() {
        const { lang } = this.props
        return (
            <IntlProvider locale={lang} messages={messages[lang]}>
                <div className="App">
                    <Navbar />
                    <Chatbox />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/login' component={Login} />
                        <Route path='/menu' component={Menu} />
                        <Route path='/store' component={Store} />
                        <Route path='/shopping_cart' component={ShoppingCart} />
                        <ProtectedRoute path='/account' component={Account} />
                        <ProtectedRoute path='/onepagecheckout' component={OnePageCheckout} />
                        <ProtectedRoute path='/confirmation_order' component={ConfirmationOrder} />
                        <Route path='*' component={PageNotFound} />
                    </Switch>
                </div>
            </IntlProvider>
        )
    }
}

const mapStateToProps = (state) => { //state is from store (type: LOCALE_DEFAULT_STATE)
    return {
        lang: state.locale.lang
    }
}

export default connect(mapStateToProps, {})(App)
