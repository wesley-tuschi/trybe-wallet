import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveExpense as saveExpenseAction } from '../redux/reducers/wallet';
import { fetchExchangeRate } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  handleAddExpense = async () => {
    const { value, description, currency, method, tag } = this.state;
    const { expenses, saveExpense } = this.props;

    try {
      const exchangeRate = await fetchExchangeRate(currency);

      const expense = {
        id: expenses.length,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRate,
      };

      saveExpense(expense);
    } catch (error) {
      console.error(error);
    }
    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;

    return (
      <form>
        <input
          type="number"
          data-testid="value-input"
          value={ value }
          onChange={ (e) => this.setState({ value: e.target.value }) }
        />
        <input
          type="text"
          data-testid="description-input"
          value={ description }
          onChange={ (e) => this.setState({ description: e.target.value }) }
        />
        <select
          data-testid="currency-input"
          value={ currency }
          onChange={ (e) => this.setState({ currency: e.target.value }) }
        >
          {currencies.map((curr) => (
            <option key={ curr } value={ curr }>
              {curr}
            </option>
          ))}
        </select>
        <select
          data-testid="method-input"
          value={ method }
          onChange={ (e) => this.setState({ method: e.target.value }) }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          value={ tag }
          onChange={ (e) => this.setState({ tag: e.target.value }) }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button
          type="button"
          onClick={ () => this.handleAddExpense() }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet && state.wallet.currencies ? state.wallet.currencies : [],
  expenses: state.wallet && state.wallet.expenses ? state.wallet.expenses : [],
});

const mapDispatchToProps = {
  saveExpense: saveExpenseAction,
};

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  saveExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.string,
      description: PropTypes.string,
      currency: PropTypes.string,
      method: PropTypes.string,
      tag: PropTypes.string,
    }),
  ).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
