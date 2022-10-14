const arr = [];
const saveCartItems = (item) => {
  arr.push(item);
  localStorage.cartItems = JSON.stringify(arr);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
