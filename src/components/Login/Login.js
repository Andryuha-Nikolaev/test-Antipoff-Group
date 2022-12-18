import React, { useState } from 'react';
import '../Form/Form.css';
import Form from '../Form/Form';
import useForm from '../../hooks/useForm';
import { EMAIL_REGEX } from '../../utils/constants';
import passwordImg from '../../assets/img/input-password.svg';

function Login({ onAuthorize, isLoading }) {
  const { enteredValues, errors, handleChange, isFormValid } = useForm();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function handlePassword() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAuthorize({
      email: enteredValues.email,
      password: enteredValues.password,
    });
  }

  return (
    <Form
      title="Вход"
      buttonText="Войти"
      question="Еще не зарегистрированы?"
      linkText=" Регистрация"
      link="/signup"
      onSubmit={handleSubmit}
      isDisabled={!isFormValid}
      isLoading={isLoading}>
      <label className="form__field">
        Электронная почта
        <input
          placeholder="example@mail.ru"
          name="email"
          className={errors.email ? 'form__input_error form__input' : 'form__input'}
          id="email-input"
          type="email"
          required
          onChange={handleChange}
          pattern={EMAIL_REGEX}
          value={enteredValues.email || ''}
        />
        <span className="form__input-error">{errors.email}</span>
      </label>
      <label className="form__field">
        Пароль
        <input
          placeholder="******"
          name="password"
          className={errors.password ? 'form__input_error form__input' : 'form__input'}
          id="password-input"
          type={isPasswordVisible ? 'text' : 'password'}
          required
          onChange={handleChange}
          value={enteredValues.password || ''}
        />
        <img
          className="form__input-img"
          src={passwordImg}
          alt="показать пароль"
          onClick={() => {
            handlePassword();
          }}
        />
        <span className="form__input-error">{errors.password}</span>
      </label>
    </Form>
  );
}

export default Login;
