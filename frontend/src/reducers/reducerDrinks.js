import {
    LOADED_DRINKS,
    FETCH_DRINKS,
    ADD_DRINK,
    ADD_DRINK_SUCCESS,
    DRINKS_FAILURE,
    DELETE_DRINK
} from "../actions/drinks";

export const DRINKS_DEFAULT_STATE = {
    loading: false,
    saving: false,
    error: '',
    items: []
}

export default function reducerDrinks(state = DRINKS_DEFAULT_STATE, action) {
    switch (action.type) {
        case LOADED_DRINKS:
            console.log("reducerDrinks action = ")
            console.log(action)
            return {...state, items: action.drinks, loading: false}

        case FETCH_DRINKS: {
            return {...state, loading: true}
        }

        case ADD_DRINK:
            console.log("reducers addDrink !!!!")
            return {...state, saving: true}

        case ADD_DRINK_SUCCESS:
            console.log("reducers addDrink success !!!!")
            return {
                ...state,
                items: state.items.concat(action.drink),
                saving: false
            }

        case DRINKS_FAILURE:
            console.log("reducers DRINKS_FAILURE !!!!")
            return {...state, loading: false, saving: false, error: action.error}

        case DELETE_DRINK:
            return {
                ...state,
                items: state.items.reduce((items, drink) =>
                    drink._id !== action.id ? items.concat(drink) : items, []
                )
            }

        // case TOGGLE_DRINK:
        //     return {
        //         ...state,
        //         items: state.items.map((drink) =>
        //             drink._id === action.id ? {...drink, done: !drink.done} : drink
        //         )
        //     }

        default:
            return state
    }
}