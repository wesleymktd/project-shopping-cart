const saveCartItems = (storage) => localStorage.setItem('cartItems', JSON.stringify(storage)); 
  // estou definindo o que vou colocar no localstorage
  // eu tenho que subir a informação para o localstorage como string

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
