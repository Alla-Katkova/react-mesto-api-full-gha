class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  //общая функция проверки ответа от БД
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  //Загрузка информации о пользователе с сервера
  getUserDetailsFromDataBase = () => {
    return fetch(this._baseUrl + "/users/me", { headers: this._headers }) //headers: {authorization: this._authorization}
      .then(this._checkResponse)
  }

  //Загрузка карточек с сервера
  getInitialCards = () => {
    return fetch(this._baseUrl + "/cards", { headers: this._headers })
      .then(this._checkResponse)
  }

  getDataForInitialPageRendering = () => {
    return Promise.all([this.getUserDetailsFromDataBase(), this.getInitialCards()])
  }

  //редактировать информацию в профиле пользователя
  editUserInfoInDb = (nameFromForm, aboutFromForm) => {
    return fetch(this._baseUrl + "/users/me", {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: nameFromForm,
        about: aboutFromForm
      })
    })
      .then(this._checkResponse)

  }
  // добавить карточку
  addNewCardToServer = (nameNewCard, linkNewCard) => {
    return fetch(this._baseUrl + "/cards", {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: nameNewCard,
        link: linkNewCard
      })
    })
      .then(this._checkResponse)
  }

  // удалить карточку
  deleteCardFromDB = (id) => {
    return fetch(this._baseUrl + `/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  // редактировать фото аватара
  editAvaratInDB = (linkToAvatar) => {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: linkToAvatar
      })
    })
      .then(this._checkResponse)
  }

  // поставить лайк
  putLike = (id) => {
    return fetch(this._baseUrl + `/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  // поставить дизлайк
  putDislike = (id) => {
    return fetch(this._baseUrl + `/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse)
  }
}


//создам экземпляр класса апи
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '1aec61fe-1188-4176-bdbc-e029c1f00874',
    'Content-Type': 'application/json'
  }
});
export default api;
