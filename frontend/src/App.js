import React, {Component} from 'react'
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Navbar from './components/Navbar'
import Chatbox from './components/ChatBox'
import {Switch, Route} from 'react-router-dom';
import {Home, Menu, Store, Account, ShoppingCart} from "./pages/bundle";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navbar/>
                <Chatbox/>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/menu' component={Menu}/>
                    <Route path='/store' component={Store}/>
                    <Route path='/shopping_cart' component={ShoppingCart}/>
                    <Route path='/account' component={Account}/>
                </Switch>
            </div>
        )
    }
}

export default App
