import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { fetchDrinks, addDrink } from '../actions/drinks';

const Drink = React.memo(({ drink }) => (
    <li className="list-group-item justify-content-between">
        <span>{drink.name} {drink.price}</span>
    </li>
));

// eslint-disable-next-line react/no-multi-comp
const DrinkList = ({
    fetchDrinks, addDrink, drinks, error, isLoading, isSaving,
}) => {
    const [newDrink, setNewDrink] = useState('');

    useEffect(() => {
        fetchDrinks();
    }, []);

    const addNewDrink = (event) => {
        event.preventDefault(); // Prevent form from reloading page
        if (newDrink) {
            const drink = { name: newDrink };
            addDrink(drink);
            setNewDrink('');
        }
    };

    return (
        <div className="container">
            <h1>
                <FormattedMessage
                    id="drinkList.title"
                    defaultMessage="DEFAULT"
                />
            </h1>
            <div className="error">{error}</div>
            <form className="form-inline form-add-drink" onSubmit={addNewDrink}>
                <input
                    className="form-control"
                    value={newDrink}
                    placeholder="New drink name"
                    onChange={(e) => setNewDrink(e.target.value)}
                />

                {(isLoading || isSaving) ? <div className="spinner-border text-primary" role="status" />
                    : (
                        <button
                            type="submit"
                            className="btn btn-success"
                            disabled={isLoading || isSaving}
                        >Add
                        </button>
                    )}
            </form>
            <ul className="list-group">
                {drinks.map((drink) => (
                    <Drink
                        key={drink.id}
                        id={drink.id}
                        drink={drink}
                    />
                ))}
            </ul>
        </div>
    )
}

// state is from store (type: DRINKS_DEFAULT_STATE)
const mapStateToProps = (state) => ({
    drinks: state.drinks.items,
    error: state.drinks.error,
    isLoading: state.drinks.loading,
    isSaving: state.drinks.saving,
})

const mapDispatchToProps = {
    fetchDrinks,
    addDrink,
}

export default connect(mapStateToProps, mapDispatchToProps)(DrinkList)
