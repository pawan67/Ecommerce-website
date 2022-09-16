if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready();
}

function ready() {
  var removeItem = document.getElementsByClassName("fa-times-circle");
  for (var i = 0; i < removeItem.length; i++) {
    var button = removeItem[i];
    button.addEventListener('click', removeCartItem)
  }

  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
  }

  var addItem = document.getElementsByClassName("cart");
  for (var i = 0; i < addItem.length; i++) {
    var button = addItem[i];
    button.addEventListener('click', addItemClicked);
  }

}

const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');

if(bar) {
  bar.addEventListener('click', ()=> {
    nav.classList.add('active');
  })
}

if(close) {
  close.addEventListener('click', ()=> {
    nav.classList.remove('active');
  })
}

// CART 

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addItemClicked(event) {
  var button = event.target;
  var product = button.parentElement.parentElement;
  var title = product.getElementsByTagName("h5")[0].innerText;
  var price = product.getElementsByTagName("h4")[0].innerText;
  var imageSrc = product.firstElementChild.src;
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {

  var cartRow = document.createElement('tr');
  cartRow.classList.add('cart-row');
  var cartItems = document.getElementsByTagName('tbody')[0];

  var cartRowContent = `
          <td><i class="fa fa-times-circle"></i></td>
          <td><img src="${imageSrc}" alt=""></td>
          <td>${title}</td>
          <td class="cart-price">${price}</td>
          <td><input type="number" value="1" class="cart-quantity"></td>
          <td>$118.9</td>`

  var cartRowContent = "NO item in cart0"
  cartRow.innerHTML = cartRowContent;
  cartItems.append(cartRow);
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function updateCartTotal() {
  var total = 0;
  var cartItemContainer = document.getElementsByTagName("tbody")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");

  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName("cart-quantity")[0];
    
    var price = parseFloat(priceElement.innerText.replace('$',''));
    var quantity = quantityElement.value;
    total = total + (price * quantity);
  }

  total = Math.round(total * 100) / 100;

  document.getElementsByClassName('cart-total')[0].innerText = '$'+ total;
  document.getElementsByClassName('cart-total')[1].innerText = '$'+ total;
  
}