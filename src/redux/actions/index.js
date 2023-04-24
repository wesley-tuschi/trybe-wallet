export const SAVE_EMAIL = 'SAVE_EMAIL';
export const FETCH_API_SUCCESS = 'FETCH_API_SUCCESS';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';

// Salva o email
export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});

// ??????
export const fetchApiSuccess = (newCurrencies) => ({
  type: FETCH_API_SUCCESS,
  payload: { currencies: newCurrencies },
});

// pega a api
export const fetchApi = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const currencies = Object.keys(data);
    const newCurrencies = currencies.filter((currency) => currency !== 'USDT');
    dispatch(fetchApiSuccess(newCurrencies));
  } catch (error) {
    console.log(error);
  }
};

export const actionAddExpenses = (data) => async (dispatch, getState) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencies = await response.json();

  const globalState = getState();
  const expenseId = globalState.wallet.expenses.length;

  const expense = {
    id: expenseId,
    exchangeRates: currencies,
    ...data,
  };

  const expenses = [...globalState.wallet.expenses, expense];

  dispatch({
    type: SAVE_EXPENSES,
    payload: {
      expenses,
    },
  });
};
