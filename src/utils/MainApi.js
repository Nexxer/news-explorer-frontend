const baseUrl = 'https://api.neknews.students.nomoreparties.xyz';

export const registration = (email, password, name) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status)
    })
};

export const onLogin = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (res) {
        return res.json();
      }
      return Promise.reject(res.status)
    })
};

export const getUserDataFromDataBase = () => {
  const jwt = localStorage.getItem('jwt');
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'applicaton/json',
      authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}: ${res.statusText}`);
  });
};

export const getSavedNewsFromDataBase = () => {
  const jwt = localStorage.getItem('jwt');
  return fetch(`${baseUrl}/articles`, {
    method: 'GET',
    headers: {
      'Content-Type': 'applicaton/json',
      authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else if (res.status === 404) {
      return [];
    }
    return Promise.reject(`Ошибка ${res.status}: ${res.statusText}`);
  });
};

export const addArticleToSavedNews = (article) => {
  const jwt = localStorage.getItem('jwt');
  return fetch(`${baseUrl}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(article),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}: ${res.statusText}`);
  });
}

export const deleteArticleToSavedNews = (id) => {
  const jwt = localStorage.getItem('jwt');
  return fetch(`${baseUrl}/articles/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${jwt}`,
    }
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}: ${res.statusText}`);
  });
}