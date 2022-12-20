import React, { useState, useEffect } from 'react';
import '../Form/Form.css';
import Form from '../Form/Form';
import useForm from '../../hooks/useForm';
import { EMAIL_REGEX, USER_NAME_REGEX } from '../../utils/constants';
import passwordImg from '../../assets/img/input-password.svg';

function Register({ onRegister, isLoading }) {
  const { enteredValues, errors, handleChange, isFormValid } = useForm();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passSimilar, setPassSimilar] = useState(false);

  useEffect(() => {
    if (enteredValues.password !== enteredValues.confirm) {
      setPassSimilar(false);
    } else {
      setPassSimilar(true);
    }
  }, [enteredValues]);

  function handlePassword() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({
      name: enteredValues.name,
      email: enteredValues.email,
      password: enteredValues.password,
    });
  }

  return (
    <Form
      title="Регистрация"
      buttonText="Зарегистрироваться"
      question="Уже зарегистрированы?"
      linkText=" Войти"
      link="/signin"
      onSubmit={handleSubmit}
      isDisabled={!isFormValid}
      isLoading={isLoading}
      passSimilar={!passSimilar}>
      <label className="form__field">
        Имя
        <input
          placeholder="Артур"
          name="name"
          className={errors.name ? 'form__input_error form__input' : 'form__input'}
          id="name-input"
          type="text"
          minLength="2"
          maxLength="40"
          required
          onChange={handleChange}
          value={enteredValues.name || ''}
          pattern={USER_NAME_REGEX}
        />
        <span className="form__input-error">{errors.name}</span>
      </label>
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
      <label className="form__field">
        Подтвердите пароль
        <input
          placeholder="******"
          name="confirm"
          className={errors.confirm ? 'form__input_error form__input' : 'form__input'}
          id="confirm-input"
          type={isPasswordVisible ? 'text' : 'password'}
          required
          onChange={handleChange}
          value={enteredValues.confirm || ''}
        />
        <img
          className="form__input-img"
          src={passwordImg}
          alt="показать пароль"
          onClick={() => {
            handlePassword();
          }}
        />
        <span className="form__input-error">{errors.confirm}</span>
        <span className="form__input-error">{!passSimilar ? ' Пароли не совпадают' : null}</span>
      </label>
    </Form>
  );
}

export default Register;
