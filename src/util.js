import axios from 'axios'

export const convertPrice = async (originalCurrency, newCurrency, amount) => {
  if (originalCurrency === newCurrency)
    return amount
  // fetch from api
  const { data, error } = await axios.get(`https://api.exchangeratesapi.io/latest?symbols=${newCurrency}&base=${originalCurrency}`)

  if (error) {
    console.log(error);
    return;
  }

  // extract the conversion rate multipler
  const conversionMultiplier = Object.values(data.rates)[0]
  //
  return amount * conversionMultiplier
}
