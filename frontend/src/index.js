import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { DEFAULT_STATE } from './reducers';
import rootSaga from './sagas';
import { Router } from 'react-router-dom';
import { setLocale } from './actions/locale';
import history from './history';
import { CookiesProvider } from 'react-cookie';
// implement the multi-language context : https://github.com/formatjs/react-intl/blob/master/docs/Upgrade-Guide.md
require('@formatjs/intl-pluralrules/polyfill');
require('@formatjs/intl-pluralrules/dist/locale-data/en'); // Add locale data for en
require('@formatjs/intl-pluralrules/dist/locale-data/fr'); // Add locale data for fr

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    DEFAULT_STATE,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

// initial language of the site when having the record in localStorage
if (localStorage.lang) {
    store.dispatch(setLocale(localStorage.lang));
}

sagaMiddleware.run(rootSaga);

ReactDOM.render((
    <CookiesProvider>
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    </CookiesProvider>
), document.getElementById('root'))

registerServiceWorker();
