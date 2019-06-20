import React, { Component } from 'react'
import './App.css'
import Todos from './Todos'
import DrinkList from './components/DrinkList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Todos />
        {/*<DrinkList/>*/}
      </div>
    )
  }
}

export default App
