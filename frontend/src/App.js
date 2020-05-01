import React from 'react';
import { connect } from "react-redux";
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { IntlProvider } from 'react-intl';
import Navbar from './components/Navbar';
import Chatbox from './components/ChatBox';
import { Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from "./components/Protected.route";
// import { Home, Menu, Store, Account, ShoppingCart, Login, OnePageCheckout, ConfirmationOrder, PageNotFound, Loading } from "./pages/bundle";
import messages from './locale/messages';
import Loadable from 'react-loadable';
import Loading from './pages/Loading';

// 就是在SPA，把JS代码分成N个页面份数的文件，不在用户刚进来就全部引入，而是等用户跳转路由的时候，再加载对应的JS文件。
// 这样做的好处就是加速首屏显示速度，同时也减少了资源的浪费。
// 按需懒加载组件
const AsyncHome = Loadable({
    loader: () => import('./pages/Home'),
    loading: Loading
});

const AsyncLogin = Loadable({
    loader: () => import('./pages/Login'),
    loading: Loading
});

const AsyncMenu = Loadable({
    loader: () => import('./pages/Menu'),
    loading: Loading
});

const AsyncStore = Loadable({
    loader: () => import('./pages/Store'),
    loading: Loading
});

const AsyncShoppingCart = Loadable({
    loader: () => import('./pages/ShoppingCart'),
    loading: Loading
});

const AsyncAccount = Loadable({
    loader: () => import('./pages/Account'),
    loading: Loading
});

const AsyncOnePageCheckout = Loadable({
    loader: () => import('./pages/OnePageCheckout'),
    loading: Loading
});

const AsyncConfirmationOrder = Loadable({
    loader: () => import('./pages/ConfirmationOrder'),
    loading: Loading
});

const AsyncPageNotFound = Loadable({
    loader: () => import('./pages/PageNotFound'),
    loading: Loading
});

const App = props => {
    return (
        <IntlProvider locale={props.lang} messages={messages[props.lang]}>
            <div className="App">
                <Navbar />
                <Chatbox />
                <Switch>
                    <Route exact path='/' component={AsyncHome} />
                    <Route exact path='/login' component={AsyncLogin} />
                    <Route path='/menu' component={AsyncMenu} />
                    <Route path='/store' component={AsyncStore} />
                    <Route path='/shopping_cart' component={AsyncShoppingCart} />
                    <ProtectedRoute path='/account' component={AsyncAccount} />
                    <ProtectedRoute path='/onepagecheckout' component={AsyncOnePageCheckout} />
                    <ProtectedRoute path='/confirmation_order' component={AsyncConfirmationOrder} />
                    <Route path='*' component={AsyncPageNotFound} />
                </Switch>
            </div>
        </IntlProvider>
    )
}

const mapStateToProps = (state) => { //state is from store (type: LOCALE_DEFAULT_STATE)
    return {
        lang: state.locale.lang
    }
}

export default connect(mapStateToProps, {})(App)
