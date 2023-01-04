// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 
// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento..
 * @returns {Element} Elemento criado.
 */

const sumCart = () => {
  const total = document.querySelector('.total-price');
  if (!localStorage.getItem('cartItems')) {
    localStorage.setItem('cartItems', JSON.stringify([]));
  }
  const storage = JSON.parse(localStorage.getItem('cartItems'));
  const sumTotalCart = storage
    .reduce((acum, stringItemInf) => Number(stringItemInf.split('$')[1]) + acum, 0);
  total.innerHTML = sumTotalCart;
};

let storage = []; // quando vai trabalhar com localstorage eu devo declarar a variavel para inicializar vazia e eu pego tudo que preciso e salvo no localstorage e depois reinicializo essa variavel para repetir o processo

 const saveCartItems2 = () => {
  const cartItens = document.querySelectorAll('.cart__item');
  cartItens.forEach((item) => {
    storage.push(item.innerText);
  });
  // let storage = JSON.parse(localStorage.getItem('cartItems')); // trazendo pegando a informação do localstorage
  // quando eu trago a informação do local storage tem que vir convertido para objeto através do parse
   // como eu garanti que meu localstorage é um array aí tem como eu dar um push com item passado por parametro
  saveCartItems(storage); // estou definindo o que vou colocar no localstorage
  // eu tenho que subir a informação para o localstorage como string
  storage = [];
};

// const removeItemLocalStorage = (remov) => {
//   const storage = JSON.parse(localStorage.getItem('cartItems')); // trazendo pegando a informação do localstorage
//   const newBox = storage.filter((string) => remov.target.innerText !== string);
//   // vou definir uma nova caixa para o meu localstorage e filtrei o elemento diferente 
//   // da string clicada e retornei essa nova caixa para o localstorage
//   saveCartItems(newBox);
// }; 

const cartItemClickListener = (event) => {
   event.target.remove();
  saveCartItems2();
  //  removeItemLocalStorage(event);
   sumCart(); // aqui a ordem importa porque eu ela depende do localstorage
  // const cliPai = event.target.parentElement;
  // const remov = cliPai.removeChild(cli);
  // return remov;
};

const emptyCart = () => {
  const buttonEmpty = document.querySelector('.empty-cart');
  const listItems = document.getElementsByClassName('cart__items')[0];
  buttonEmpty.addEventListener('click', () => {
    localStorage.setItem('cartItems', JSON.stringify([]));
    listItems.innerText = '';
    const total = document.querySelector('.total-price');
    total.innerText = 0;
  }); 
  saveCartItems2();
  sumCart();
};

const recoverData = () => {
  const recoverCart = JSON.parse(getSavedCartItems());
  const elem = document.querySelector('.cart__items');
  if (recoverCart) {
    recoverCart.forEach((element) => {
      const linha = document.createElement('li');
      linha.className = 'cart__item';
      linha.innerText = element;
      elem.appendChild(linha);
      linha.addEventListener('click', cartItemClickListener);
    });
  }
};

const createCartItemElement = ({ id, title, price }) => { // parametro object
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  const el = document.querySelector('.cart__items');
  if (element === 'button') {
    e.addEventListener('click', async () => {
      const nodFather = e.parentNode;
      const child = nodFather.firstChild;
      const fet = await fetchItem(child.innerText);
      el.appendChild(createCartItemElement(fet));
      saveCartItems2();
      sumCart();
    });
  }
  e.className = className;
  e.innerText = innerText;
  
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
// const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */

const renderCharg = () => {
  const div = document.createElement('p');
  const cart = document.querySelector('.items');
  div.className = 'loading';
  div.innerText = 'carregando...';
  cart.appendChild(div);
};

const removeCharg = () => {
const remove = document.querySelector('.loading');
remove.remove();
};

const addChildElementItems = async (pc) => {
  const el = document.querySelector('.items');
  const produtResult = await fetchProducts(pc);
  const { results } = produtResult;
  results.forEach((produtId) => {
    const finalResult = createProductItemElement(produtId);
    el.appendChild(finalResult);
  });
};

window.onload = async () => {  
 renderCharg();
 await addChildElementItems('computador');
 removeCharg();
 recoverData();
 emptyCart();
 sumCart();
};
