import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { saveEmail as saveUserEmail } from '../redux/actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  handleEmailChange = (e) => {
    const PSD_M_LENGTH = 6;
    const email = e.target.value;
    this.setState((prevState) => ({
      email,
      isDisabled: !this.validateEmail(email) || prevState.password.length < PSD_M_LENGTH,
    }));
  };

  handlePasswordChange = (e) => {
    const password = e.target.value;
    const PSD_M_LENGTH = 6;
    this.setState((prevState) => ({
      password,
      isDisabled: !this.validateEmail(prevState.email) || password.length < PSD_M_LENGTH,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { saveEmail, history } = this.props;
    const { email } = this.state;
    saveEmail(email);
    history.push('/carteira');
  };

  validateEmail(email) {
    const validate = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return validate.test(email);
  }

  render() {
    const { email, password, isDisabled } = this.state;

    return (
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={ this.handleSubmit }>
          <input
            type="email"
            placeholder="Email"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleEmailChange }
          />
          <input
            type="password"
            placeholder="Senha"
            data-testid="password-input"
            value={ password }
            onChange={ this.handlePasswordChange }
          />
          <button type="submit" disabled={ isDisabled }>
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = {
  saveEmail: saveUserEmail,
};

export default withRouter(connect(null, mapDispatchToProps)(Login));
