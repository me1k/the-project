export const searchStock = (value: string) => {
  return fetch(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=8OTC1CDBBWB33FUB`,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
};

export const fetchStock = (value: string) => {
  return fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${value}&apikey=8OTC1CDBBWB33FUB`,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
};
