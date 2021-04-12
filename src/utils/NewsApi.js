export const getArticlesFromNewsApi = (valueToSearch) => {
  const dateFrom = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const dateTo = new Date(Date.now()).toISOString();
  const apiKey = 'cf8f4dfa14654e469bf7dfbbe087ab76';

  return fetch(
    `https://nomoreparties.co/news/v2/everything?q=${valueToSearch}&from=${dateFrom}&to=${dateTo}&pageSize=${"100"}&apiKey=${apiKey}`,
    {
      method: "GET",
    }
  ).then((res) => {
    if (res.status) {
      return res.json();
    }
    return Promise.reject(`Статус ответа: ${res.status}`);
  });
};


