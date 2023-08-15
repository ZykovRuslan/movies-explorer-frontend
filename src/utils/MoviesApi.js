class MoviesApi {
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
        'Content-Type': 'application/json',
      },
      body,
    }).then(this._checkResponse);
  }

  getMovies() {
    return this._fetch('/beatfilm-movies', 'GET');
  }
}

export const moviesApi = new MoviesApi({
  url: 'https://api.nomoreparties.co',
});
