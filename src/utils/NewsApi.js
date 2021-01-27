export const getArticlesFromNewsApi = (valueToSearch) => {
  const dateFrom = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const dateTo = new Date(Date.now()).toISOString();
  const apiKey = 'cf8f4dfa14654e469bf7dfbbe087ab76';
  // const apiKey = '1a6b6b1b0d184383811540dafeadc7ac';
  // const apiKey = 'aeb6d1408e304fc385558c5bbe2b0e45';

  return fetch(
    `https://newsapi.org/v2/everything?q=${valueToSearch}&from=${dateFrom}&to=${dateTo}&pageSize=${'7'}&apiKey=${apiKey}`,
    {
      method: 'GET',
    },
  ).then((res) => {
    if (res.status) {
      return res.json();
    }
    return Promise.reject(`Статус ответа: ${res.status}`);
  });
};


