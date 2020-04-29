import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { fetchDrinks, addDrink } from '../actions/drinks';
import { FormattedMessage } from 'react-intl';

const Drink = ({ drink }) => (
    <li className="list-group-item justify-content-between">
        <span>{drink.name} {drink.price}</span>
    </li>
)

const DrinkList = props => {
    const [newDrink, setNewDrink] = useState('');

    useEffect(() => {
        props.fetchDrinks();
    }, []);

    const addNewDrink = event => {
        event.preventDefault(); // Prevent form from reloading page
        if (newDrink) {
            const drink = { name: newDrink };
            props.addDrink(drink);
            setNewDrink('');
        }
    };

    return (
        <div className="container">
            <h1>
                <FormattedMessage
                    id='drinkList.title'
                    defaultMessage='DEFAULT' />
            </h1>
            <div className="error">{props.error}</div>
            <form className="form-inline form-add-drink" onSubmit={addNewDrink}>
                <input className="form-control"
                    value={newDrink}
                    placeholder="New drink name"
                    onChange={(e) => setNewDrink(e.target.value)} />

                {(props.isLoading || props.isSaving) ? <div className="spinner-border text-primary" role="status" /> :
                    <button className='btn btn-success'
                        disabled={props.isLoading || props.isSaving}>Add
                        </button>}
            </form>
            <ul className="list-group">
                {props.drinks.map((drink) =>
                    <Drink
                        key={drink.id}
                        id={drink.id}
                        drink={drink}
                    />)}
            </ul>
        </div>
    )
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