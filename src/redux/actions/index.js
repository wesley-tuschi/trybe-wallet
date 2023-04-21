export const SAVE_EMAIL = 'SAVE_EMAIL';
export const FETCH_API_SUCCESS = 'FETCH_API_SUCCESS';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});

export const fetchApiSuccess = (newCurrencies) => ({
  type: FETCH_API_SUCCESS,
  payload: { currencies: newCurrencies },
});

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

export const fetchExchangeRate = async (currency) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();

  if (data && data[currency] && data[currency].ask) {
    return parseFloat(data[currency].ask);
  }
  throw new Error(`Taxa de câmbio ${currency} não encontrada.`);
};

export const getTotalExpenses = (state) => {
  const { expenses } = state.wallet;
  const total = expenses.reduce((sum, expense) => {
    const value = parseFloat(expense.value);
    const exchangeRate = parseFloat(expense.exchangeRate);
    return sum + value * exchangeRate;
  }, 0);
  return total.toFixed(2);
};
