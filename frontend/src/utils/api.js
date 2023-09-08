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

  _request(url, config) {
    return fetch(`${this._baseUrl}${url}`, config)
    .then(this._checkResponse)
  }

  //Загрузка информации о пользователе с сервера
  getUserDetailsFromDataBase(token) {
    // console.log('user')
    // console.log(token)
    return this._request("/users/me", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
  }

  //Загрузка карточек с сервера
  getInitialCards(token) {
    // console.log('cards')
    // console.log(token)
    return this._request( "/cards", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
  }

  getDataForInitialPageRendering = (token) => {
    return Promise.all([this.getUserDetailsFromDataBase(token), this.getInitialCards(token)])
  }

  //редактировать информацию в профиле пользователя
  editUserInfoInDb(nameFromForm, aboutFromForm, token) {
    return this._request("/users/me", {
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
  }

  // добавить карточку
  addNewCardToServer(nameNewCard, linkNewCard, token) {
    return this._request("/cards", {
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
  }

  // удалить карточку
  deleteCardFromDB(id, token) {
    return this._request(`/cards/${id}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`
      },
    })
  }

  // редактировать фото аватара
  editAvaratInDB = (linkToAvatar, token) => {
    return this._request( "/users/me/avatar", {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: linkToAvatar
      })
    })
  }

  // поставить лайк
  putLike = (id, token) => {
    return this._request(`/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
  }

  // поставить дизлайк
  putDislike = (id, token) => {
    return this._request(`/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
  }
}


//создам экземпляр класса апи
const api = new Api({
  baseUrl: 'https://back.mesto.katkova.nomoredomainsicu.ru',
});
export default api;
