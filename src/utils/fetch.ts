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
    `https://finnhub.io/api/v1/quote?symbol=${value}&token=breeeofrh5rckh45b320`,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
};
