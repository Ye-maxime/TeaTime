import React, {Component} from 'react';
import DrinkList from '../components/DrinkList'
import Navbar from '../components/Navbar'

class Home extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <DrinkList/>
            </div>
        );
    }
}

export default Home;