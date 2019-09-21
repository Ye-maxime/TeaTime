import React, { Component } from 'react'
import { connect } from "react-redux";
import { fetchDrinks, addDrink } from '../actions/drinks';
import { FormattedMessage } from 'react-intl';

const Drink = ({ drink }) => (
    <li className="list-group-item justify-content-between">
        <span>{drink.name} {drink.price}</span>
    </li>
)

class DrinkList extends Component {
    state = { newDrink: '' }

    componentDidMount() {
        this.props.fetchDrinks()
    }

    addNewDrink(event) {
        event.preventDefault() // Prevent form from reloading page
        const { newDrink } = this.state

        if (newDrink) {
            const drink = { name: newDrink }
            this.props.addDrink(drink)
            this.setState({ newDrink: '' })
        }
    }

    render() {
        let { newDrink } = this.state
        const { drinks, error, isLoading, isSaving } = this.props
        return (
            <div className="container">
                <h1>
                    <FormattedMessage
                        id='drinkList.title'
                        defaultMessage='DEFAULT' />
                </h1>
                <div className="error">{error}</div>
                <form className="form-inline form-add-drink" onSubmit={this.addNewDrink.bind(this)}>
                    <input className="form-control"
                        value={newDrink}
                        placeholder="New drink name"
                        onChange={(e) => this.setState({ newDrink: e.target.value })} />

                    {(isLoading || isSaving) ? <div className="spinner-border text-primary" role="status" /> :
                        <button className='btn btn-success'
                            disabled={isLoading || isSaving}>Add
                        </button>}
                </form>
                <ul className="list-group">
                    {drinks.map((drink) =>
                        <Drink
                            key={drink.id}
                            id={drink.id}
                            drink={drink}
                        />)}
                </ul>
            </div>
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