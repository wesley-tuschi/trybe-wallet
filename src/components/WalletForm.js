import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet && state.wallet.currencies ? state.wallet.currencies : [],
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
