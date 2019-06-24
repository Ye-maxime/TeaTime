import React, { Component } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
//import '../node_modules/bootstrap/dist/css/bootstrap-theme.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
      </div>
    )
  }
}

export default App
