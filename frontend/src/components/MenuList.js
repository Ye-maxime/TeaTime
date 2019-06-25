import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";
import {Container,Row,Col,Table,Button} from 'react-bootstrap';
import {fetchBrowMenu} from "../actions/menus";
import {addDrink, fetchDrinks} from "../actions/drinks";
import {addToShoppingCart} from "../actions/shoppingCart";

const Menuitem = ({drink, id, onAddToShoppingCart}) => (
    <div className="box drink-item level is-mobile">
        <span>{drink.name} {drink.price}</span>
        <span className="icon" onClick={onAddToShoppingCart}>
          <i className="fas fa-plus-circle has-text-success"/>
        </span>
    </div>
)
class MenuList extends Component {
    //state = {drinksOrder: [], price:0}

    componentDidMount() {
        console.log("menu did mount")
        this.props.fetchBrowMenu()
    }

    render() {
        const {browmenu, lulumenu, addToShoppingCart} = this.props
        return (
            <div></div>
        )
    }
}

const mapStateToProps = (state) => { //state is from store (type: DRINKS_DEFAULT_STATE)
    console.log("mapstateMenu")
    console.log(this.state);
    return {
        browMenus: state.browMenus.items,
        /*error: state.browMenus.error,
        isLoading: state.browMenus.loading,*/
        //isSaving: state.drinks.saving,
    }
}

const mapDispatchToProps = {
    fetchBrowMenu,
    addToShoppingCart
    /*addDrink,
    */
}
export default connect(null, mapDispatchToProps)(MenuList);