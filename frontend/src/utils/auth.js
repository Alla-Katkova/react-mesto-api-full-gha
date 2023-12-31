export const BACKEND_BASE_URL = 'https://back.mesto.katkova.nomoredomainsicu.ru';

const responseCheck = (response) => response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`);

export const register = ({ registerInputPassword, registerInputEmail }) => {

  return fetch(`${BACKEND_BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "password": registerInputPassword,
      "email": registerInputEmail
    })
  })
    .then(responseCheck)
};

export const authorize = ({ loginInputPassword, loginInputEmail }) => {
  return fetch(`${BACKEND_BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "password": loginInputPassword,
      "email": loginInputEmail
    })
  })
    .then(responseCheck)
};

export const getContent = (token) => {
  return fetch(`${BACKEND_BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then(responseCheck)
}