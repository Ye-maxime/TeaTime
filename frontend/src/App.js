import React, { Component } from 'react'
import './App.css'
import DrinkList from './components/DrinkList'
import Navbar from './components/Navbar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <DrinkList/>
      </div>
    )
  }
}

export default App
