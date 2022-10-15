const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('Teste se, ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado', () => {
    saveCartItems('<ol><li>algo</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  })

  it('Teste se, ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro a chave "cartItems" e o segundo sendo o valor passado como argumento para saveCartItems', () => {
    const test = JSON.stringify(['algo'])
    saveCartItems(['algo']);
    expect(localStorage.setItem).toBeCalledWith("cartItems", test);
  })
});
