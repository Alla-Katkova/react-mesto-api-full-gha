import React from "react";
import useValidationForForm from "../../utils/useValidationForForm";

export default function Login({ onLogin }) {

  const { values, errors, isValid, handleChange, resetForm } = useValidationForForm()

  function handleSubmit(event) {
    event.preventDefault();

    onLogin(values)
      .then(resetForm())
      .catch((error) => {
        console.log(error.message || 'Ошибка при авторизации')
      })
  }

  return (
    <main className="login login-content">
      <section className="login__container">
        <h2 className="login__title">Вход</h2>
        <form
          className="login__form"
          name="loginForm"
          id="loginForm"
          onSubmit={handleSubmit}
        >
          <input
            className="login__input login__input_type_email"
            id="loginInputEmail"
            name="loginInputEmail"
            type="email"
            minLength={3}
            maxLength={40}
            required={true}
            placeholder="Email"
            value={values.loginInputEmail ? values.loginInputEmail : ''}
            onChange={handleChange}

          />
          <span className="login__error" id="loginInputEmail-error">{errors.loginInputEmail}</span>
          <input
            className="login__input login__input_type_password"
            type="password"
            placeholder="Пароль"
            name="loginInputPassword"
            id="loginInputPassword"
            minLength={6}
            maxLength={20}
            required={true}
            value={values.loginInputPassword ? values.loginInputPassword : ''}
            onChange={handleChange}
          />
          <span className="login__error" id="loginInputPassword-error">{errors.loginInputPassword}</span>

          <button
            className={`login__save-button ${!isValid ? 'login__save-button_invalid' : ''}`}
            type="submit"
          >
            Войти
          </button>
        </form>
      </section>
    </main>
  );


}





