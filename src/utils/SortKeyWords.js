
export const sortArrKeyWords = (articlesArray) => {
  if (articlesArray.length > 0) {
    const keywordsWithRangeNumber = articlesArray
      .map((article) => article.keyword)
      .reduce((acc, keyword) => {
        if (!acc[keyword]) {
          acc[keyword] = 1;
        } else {
          acc[keyword] += 1;
        }
        return acc;
      }, {});
    const filteredKeywordsArray = Object.keys(keywordsWithRangeNumber);
    const result = filteredKeywordsArray.sort((a, b) => {
      return keywordsWithRangeNumber[b] - keywordsWithRangeNumber[a];
    });
    return result;
  } else {
    return ['У Вас нет сохранненых статей', '', '']
  }
}