class MainApi {
  constructor(options) {
    this._url = options.url;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _fetch(path, method, data) {
    let body = data;
    if ((method === 'PATCH' || method === 'POST') && data) {
      body = JSON.stringify(data);
    }

    return fetch(this._url + path, {
      method,
      headers: {
        authorization: `Bearer ${localStorage.getItem('JWT')}`,
        'Content-Type': 'application/json',
      },
      body,
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return this._fetch('/users/me', 'GET');
  }

  setUserInfo(data) {
    return this._fetch('/users/me', 'PATCH', data);
  }

  addNewCard(data) {
    return this._fetch('/movies', 'POST', data);
  }

  getInitialCards() {
    return this._fetch('/movies', 'GET');
  }

  deleteCard(id) {
    return this._fetch(`/movies/${id}`, 'DELETE');
  }
}

export const mainApi = new MainApi({
  url: `https://movies-explorer-api.nomoredomains.xyz`,
});
