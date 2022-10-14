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

const cartItemClickListener = (event) => {
   event.target.remove();
   
  // const cliPai = event.target.parentElement;
  // const remov = cliPai.removeChild(cli);
  // return remov;
};
const recoverData = () => {
  const recoverCart = getSavedCartItems();
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
  saveCartItems(li.innerText);
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
    //  console.log(fet);
    el.appendChild(createCartItemElement(fet));
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
 addChildElementItems('computador');
 recoverData();
};
