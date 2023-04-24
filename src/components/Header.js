import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;

    const totalExpenses = expenses.reduce((acc, curr) => {
      const totalInBrl = curr.value * curr.exchangeRates[curr.currency].ask;
      return acc + totalInBrl;
    }, 0);
    const parsedTotalExpenses = totalExpenses.toFixed(2);

    return (
      <header>
        <span data-testid="email-field">{email}</span>
        <span data-testid="total-field">{ parsedTotalExpenses }</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.string,
      description: PropTypes.string,
      currency: PropTypes.string,
      method: PropTypes.string,
      tag: PropTypes.string,
      exchangeRate: PropTypes.objectOf(
        PropTypes.shape({
          code: PropTypes.string,
          name: PropTypes.string,
          ask: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
};

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
