class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
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
  getUserDetailsFromDataBase = (token) => {
    console.log(token)
    return fetch(this._baseUrl + "/users/me", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(this._checkResponse)
  }

  //Загрузка карточек с сервера
  getInitialCards = (token) => {
    return fetch(this._baseUrl + "/cards", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(this._checkResponse)
  }

  getDataForInitialPageRendering = (token) => {
    return Promise.all([this.getUserDetailsFromDataBase(token), this.getInitialCards(token)])
  }

  //редактировать информацию в профиле пользователя
  editUserInfoInDb = (nameFromForm, aboutFromForm, token) => {
    return fetch(this._baseUrl + "/users/me", {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: nameFromForm,
        about: aboutFromForm
      })
    })
      .then(this._checkResponse)

  }
  // добавить карточку
  addNewCardToServer = (nameNewCard, linkNewCard, token) => {
    return fetch(this._baseUrl + "/cards", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: nameNewCard,
        link: linkNewCard
      })
    })
      .then(this._checkResponse)
  }

  // удалить карточку
  deleteCardFromDB = (id, token) => {
    return fetch(this._baseUrl + `/cards/${id}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`
      },
    })
      .then(this._checkResponse)
  }

  // редактировать фото аватара
  editAvaratInDB = (linkToAvatar, token) => {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: linkToAvatar
      })
    })
      .then(this._checkResponse)
  }

  // поставить лайк
  putLike = (id, token) => {
    return fetch(this._baseUrl + `/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(this._checkResponse)
  }

  // поставить дизлайк
  putDislike = (id, token) => {
    return fetch(this._baseUrl + `/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(this._checkResponse)
  }
}


//создам экземпляр класса апи
const api = new Api({
  baseUrl: 'https://back.mesto.katkova.nomoredomainsicu.ru',
});
export default api;
