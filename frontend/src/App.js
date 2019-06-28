import React, {Component} from 'react'
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Navbar from './components/Navbar'
import {Switch, Route} from 'react-router-dom';
import {Home, Menu, Store, Order, ShoppingCart} from "./pages/bundle";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navbar/>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/menu' component={Menu}/>
                    <Route path='/store' component={Store}/>
                    <Route path='/shopping_cart' component={ShoppingCart}/>
                    <Route path='/order' component={Order}/>
                </Switch>
            </div>
        )
    }
}

export default App
