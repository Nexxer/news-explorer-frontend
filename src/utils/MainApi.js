class MainApi {
  constructor({ baseUrl, headers }) {
    this.url = baseUrl;
    this.headers = headers;
  };

  getSavedCards = () => {
    return fetch(`${this.url}/articles`, {
      method: 'GET',
      headers: this.headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}: ${res.statusText}`)
      })
  }
}


export const mainApi = new MainApi({
  baseUrl: 'https://api.neknews.students.nomoreparties.xyz',
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json',
  }
});