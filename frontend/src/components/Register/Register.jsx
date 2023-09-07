import React from 'react';
import { Link } from 'react-router-dom';
import useValidationForForm from "../../utils/useValidationForForm";

export default function Register({ onRegister }) {
  const { values, errors, isValid, handleChange, resetForm } = useValidationForForm()

  function handleSubmit(event) {
    event.preventDefault();
    //console.log(values)
    onRegister(values)
      .then(resetForm())
      .catch(error => {
        console.log(error.message || 'Ошибка при регистрации')
      })
  }

  return (
    <main className="register register-content">
      <div className="register__container">
        <h2 className="register__title">Регистрация</h2>
        <form
          className="register__form"
          name="registerForm"
          id="registerForm"
          onSubmit={handleSubmit}

        >
          <input
            className="register__input register__input_type_email register__input_state_valid"
            id="registerInputEmail"
            name="registerInputEmail"
            type="email"
            minLength={3}
            maxLength={40}
            required={true}
            placeholder="Email"
            value={values.registerInputEmail ? values.registerInputEmail : ''}
            onChange={handleChange}
          />
          <span className="register__error" id="registerInputEmail-error">{errors.registerInputEmail}</span>
          <input
            className="register__input register__input_type_password register__input_state_valid"
            type="password"
            placeholder="Пароль"
            name="registerInputPassword"
            id="registerInputPassword"
            minLength={6}
            maxLength={20}
            required={true}
            value={values.registerInputPassword ? values.registerInputPassword : ""}
            onChange={handleChange}
          />
          <span className="register__error" id="registerInputPassword-error">{errors.registerInputPassword}</span>

          <button
            className={`register__save-button ${!isValid ? 'register__save-button_invalid' : ''}`}
            type="submit"
          > Зарегистрироваться
          </button>
        </form>
        <div className="register__login">
          <p>Уже зарегистрированы? <Link to="/sign-in" className="register__login-link">Войти</Link></p>
        </div>
      </div>
    </main>


  )
}