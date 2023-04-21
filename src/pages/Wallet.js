import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi } from '../redux/actions';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApi());
  }

  renderExpensesTable = () => {
    const { expenses } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => {
            const exchangeRate = expense.exchangeRate?.[expense.currency]?.ask ?? 0;
            const convertedValue = (expense.value * exchangeRate).toFixed(2);

            return (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.value}</td>
                <td>{expense.currency}</td>
                <td>{exchangeRate}</td>
                <td>{convertedValue}</td>
                <td>Real</td>
                <td>Editar/Excluir</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  render() {
    return (
      <div>
        TrybeWallet
        <Header />
        <WalletForm />
        { this.renderExpensesTable() }
      </div>
    );
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
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

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);
