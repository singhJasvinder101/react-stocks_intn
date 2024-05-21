const base_url = `https://www.alphavantage.co/`;
const search = `query?function=SYMBOL_SEARCH&keywords=?&apikey=${import.meta.env.VITE_ALPHA_VANTAGE_API_KEY}`;

export const searchURL = (security) => `${base_url}${search}`;
