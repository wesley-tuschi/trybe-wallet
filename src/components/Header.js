import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTotalExpenses } from '../redux/actions';

class Header extends Component {
  render() {
    const { email, totalExpenses } = this.props;
    return (
      <header>
        <span data-testid="email-field">{email}</span>
        <span data-testid="total-field">{totalExpenses}</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpenses: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpenses: getTotalExpenses(state),
});

export default connect(mapStateToProps)(Header);
