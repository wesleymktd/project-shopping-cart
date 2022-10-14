const fetchItem = async (endPoint) => {
  try {
  const url = `https://api.mercadolibre.com/items/${endPoint}`;
  const promise = await fetch(url);
  const response = await promise.json();
  // console.log(response)
  return response;
  } catch (err) {
    throw new Error('You must provide a url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
