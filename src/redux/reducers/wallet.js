// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { FETCH_API_SUCCESS } from '../actions';

export const SAVE_EXPENSE = 'SAVE_EXPENSE';

export const saveExpense = (expense) => ({
  type: SAVE_EXPENSE,
  payload: expense,
});

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_API_SUCCESS:
    return {
      ...state,
      currencies: action.payload.currencies,
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  default:
    return state;
  }
};

export default wallet;
