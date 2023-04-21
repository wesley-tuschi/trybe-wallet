import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';

describe('Login', () => {
  test('renders login page', () => {
    renderWithRouterAndRedux(<App />, '/');
    const loginTitle = screen.getByRole('heading', { level: 1, name: /Login/i });
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const submitButton = screen.getByRole('button', { name: /Entrar/i });

    expect(loginTitle).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  test('inputs and submit button should be working', async () => {
    renderWithRouterAndRedux(<App />, '/');
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const submitButton = screen.getByRole('button', { name: /Entrar/i });

    await act(async () => {
      await userEvent.type(emailInput, 'user@test.com');
      await userEvent.type(passwordInput, '123456');
    });

    expect(submitButton).not.toBeDisabled();

    await act(async () => {
      await userEvent.click(submitButton);
    });

    expect(window.location.pathname).toEqual('/carteira');
  });

  test('should not enable submit button with invalid email', async () => {
    renderWithRouterAndRedux(<App />, '/');
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const submitButton = screen.getByRole('button', { name: /Entrar/i });

    await act(async () => {
      await userEvent.type(emailInput, 'user@invalid');
      await userEvent.type(passwordInput, '123456');
    });

    expect(submitButton).toBeDisabled();
  });

  test('should not enable submit button with password length < 6', async () => {
    renderWithRouterAndRedux(<App />, '/');
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const submitButton = screen.getByRole('button', { name: /Entrar/i });

    await act(async () => {
      await userEvent.type(emailInput, 'user@test.com');
      await userEvent.type(passwordInput, '123');
    });

    expect(submitButton).toBeDisabled();
  });
});
