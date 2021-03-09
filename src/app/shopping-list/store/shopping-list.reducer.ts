import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';
import { UpdateIngredient } from './shopping-list.actions';

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

export interface AppState {
    shoppingList: State;
}

const initialState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ],
    editedIngredient: null,
    editedIngredientIndex: -1,
};

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
           return {
               ...state,
               ingredients: [...state.ingredients, ...(action.payload as Ingredient[])]
           };
           case ShoppingListActions.UPDATE_INGREDIENT:
               const payload = action.payload as ShoppingListActions.IUpdateIngredient;
               const ingredient = state.ingredients[payload.index];
               const updateIngredient = {
                   ...ingredient,
                   ...payload.ingredient
               };
               const updateIngredients = [...state.ingredients];
               updateIngredients[payload.index] = updateIngredient;

               return {
                ...state,
                ingredients: updateIngredients
            };
            case ShoppingListActions.DELETE_INGREDIENT:
                const index = action.payload as number;

                return {
                    ...state,
                     ingredients: state.ingredients.filter((ig, i) => {
                        return i !== index;
                     })
                };
        default:
            return state;
    }
}
