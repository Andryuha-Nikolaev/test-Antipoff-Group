import React from 'react';
import { Link } from 'react-router-dom';
import './Form.css';

function Form({
  children,
  title,
  buttonText,
  question,
  linkText,
  link,
  onSubmit,
  isDisabled,
  isLoading,
  passSimilar,
}) {
  return (
    <div className="form__container">
      <h3 className="form__title">{title}</h3>
      <form className="form" id="form" onSubmit={onSubmit} noValidate>
        {children}
        <button
          type="submit"
          disabled={isDisabled ? true : false}
          className={
            isDisabled || isLoading || passSimilar
              ? 'form__button-save form__button-save_inactive'
              : 'form__button-save'
          }>
          {buttonText}
        </button>
      </form>
      <p className="form__text">
        {question}
        <Link to={link} className="form__link">
          {linkText}
        </Link>
      </p>
    </div>
  );
}

export default Form;
