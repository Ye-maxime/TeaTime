import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './serviceworker/registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { DEFAULT_STATE } from './reducers';
import rootSaga from './sagas';
import { Router } from 'react-router-dom';
import { setLocale } from './actions/locale';
import history from './history';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {PersistGate} from 'redux-persist/lib/integration/react';
import { CookiesProvider } from 'react-cookie';

// implement the multi-language context : https://github.com/formatjs/react-intl/blob/master/docs/Upgrade-Guide.md
require('@formatjs/intl-pluralrules/polyfill');
require('@formatjs/intl-pluralrules/dist/locale-data/en'); // Add locale data for en
require('@formatjs/intl-pluralrules/dist/locale-data/fr'); // Add locale data for fr


const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 持久化redux store内容到localStorage
const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2
};

const myPersistReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
    myPersistReducer,
    // DEFAULT_STATE,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

// initial language of the site when having the record in localStorage
if (localStorage.lang) {
    store.dispatch(setLocale(localStorage.lang));
}

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

ReactDOM.render((
    <CookiesProvider>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router history={history}>
                    <App />
                </Router>
            </PersistGate>
        </Provider>
    </CookiesProvider>
), document.getElementById('root'))

registerServiceWorker();
