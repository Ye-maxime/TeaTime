import React, {Component} from 'react'
import 'bulma/css/bulma.css'
import connect from "react-redux/es/connect/connect";
import { fetchDrinks } from '../actions/drinks';

const Drink = ({drink, id}) => (
    <div className="box todo-item level is-mobile">
        <span>{drink.name} {drink.price}</span>
    </div>
)

class DrinkList extends Component {
    componentDidMount() {
        this.props.fetchDrinks()
    }

    render() {
        const {drinks, error, isLoading} = this.props
        return (
            <section className="section full-column">
                <h1 className="title white">Drinks</h1>
                <div className="error">{error}</div>
                <div className="container drink-list">
                    {drinks.map((drink) =>
                        <Drink
                            key={drink.id}
                            id={drink.id}
                            drink={drink}
                        />)}
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => { //state is from store (type: DRINKS_DEFAULT_STATE)
    return {
        drinks: state.drinks.items,
        error: state.drinks.error,
        isLoading: state.drinks.loading,
    }
}

const mapDispatchToProps = {
    fetchDrinks
}

export default connect(mapStateToProps, mapDispatchToProps)(DrinkList)