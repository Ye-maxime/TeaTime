import React, {Component} from 'react'
import 'bulma/css/bulma.css'
import connect from "react-redux/es/connect/connect";
import {fetchDrinks, addDrink} from '../actions/drinks';

const Drink = ({drink}) => (
    <div className="box drink-item level is-mobile">
        <span>{drink.name} {drink.price}</span>
    </div>
)

class DrinkList extends Component {
    state = {newDrink: ''}

    componentDidMount() {
        this.props.fetchDrinks()
    }

    addNewDrink(event) {
        event.preventDefault() // Prevent form from reloading page
        const {newDrink} = this.state

        if (newDrink) {
            const drink = {name: newDrink}
            this.props.addDrink(drink)
            this.setState({newDrink: ''})
        }
    }

    render() {
        let {newDrink} = this.state
        const {drinks, error, isLoading, isSaving} = this.props
        return (
            <section className="section full-column">
                <h1 className="title white">Drinks</h1>
                <div className="error">{error}</div>
                <form className="form" onSubmit={this.addNewDrink.bind(this)}>
                    <div className="field has-addons" style={{justifyContent: 'center'}}>
                        <div className="control">
                            <input className="input"
                                   value={newDrink}
                                   placeholder="New drink name"
                                   onChange={(e) => this.setState({newDrink: e.target.value})}/>
                        </div>

                        <div className="control">
                            <button className={`button is-success ${(isLoading || isSaving) && "is-loading"}`}
                                    disabled={isLoading || isSaving}>Add
                            </button>
                        </div>
                    </div>
                </form>
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
        isSaving: state.drinks.saving,
    }
}

const mapDispatchToProps = {
    fetchDrinks,
    addDrink,
}

export default connect(mapStateToProps, mapDispatchToProps)(DrinkList)