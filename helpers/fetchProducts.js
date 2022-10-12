const fetchProducts = async (itens) => {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${itens}`;
  const response = await fetch(url);
  const jsonConv = await response.json();
  return jsonConv;
  // console.log(jsonConv)
  } catch (err) {
    throw new Error('You must provide an url');
  } 
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
