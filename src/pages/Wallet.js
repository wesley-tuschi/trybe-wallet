import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi } from '../redux/actions';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApi());
  }

  render() {
    // const { expenses } = this.props;

    return (
      <div>
        TrybeWallet
        <Header />
        <WalletForm />
        <Table />
      </div>
    );
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  // expenses: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.number,
  //     value: PropTypes.string,
  //     description: PropTypes.string,
  //     currency: PropTypes.string,
  //     method: PropTypes.string,
  //     tag: PropTypes.string,
  //     exchangeRate: PropTypes.objectOf(
  //       PropTypes.shape({
  //         code: PropTypes.string,
  //         name: PropTypes.string,
  //         ask: PropTypes.string,
  //       }),
  //     ),
  //   }),
  // ).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);
