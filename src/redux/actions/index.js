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
    // console.log('Moedas buscadas:', newCurrencies);
    dispatch(fetchApiSuccess(newCurrencies));
  } catch (error) {
    console.log(error);
  }
};
