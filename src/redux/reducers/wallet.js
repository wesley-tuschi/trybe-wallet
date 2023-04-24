// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { FETCH_API_SUCCESS, SAVE_EXPENSES, DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  expenseToEdit: {},
};

const wallet = (state = INITIAL_STATE, action) => {
  const newState = {
    ...state,
    ...action.payload,
  };

  switch (action.type) {
  case FETCH_API_SUCCESS:
    return newState;
  case SAVE_EXPENSES:
    console.log('Save expense action:', action);
    return newState;
  case DELETE_EXPENSE:
    return newState;
  default:
    return state;
  }
};

export default wallet;
