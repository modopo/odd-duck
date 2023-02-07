'use strict';

const MAX_ROUNDS = 25;

let rounds = 0;

let bag = new Products('bag');
let banana = new Products('banana');
let bathroom = new Products('bathroom');
let boots = new Products('boots');
let breakfast = new Products('breakfast');
let bubblegum = new Products('bubblegum');
let chair = new Products('chair');
let cthulhu = new Products('cthulhu');
let dogduck = new Products('dog-duck');
let dragon = new Products('dragon');
let pen = new Products('pen');
let petsweep = new Products('pet-sweep');
let scissors = new Products('scissors');
let shark = new Products('shark');
let sweep = new Products('sweep', 'png');
let tauntaun = new Products('tauntaun');
let unicorn = new Products('unicorn');
let watercan = new Products('water-can');
let wineglass = new Products('wine-glass');

let products = [bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogduck, dragon, pen, petsweep, scissors, shark, sweep, tauntaun, unicorn, watercan, wineglass];

//DOM windows ---------------------------------------
let imageContainer = document.querySelector('#productImages');
let resultsContainer = document.querySelector('#results ul');

//Object ---------------------------------------
function Products(name, fileExt = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExt}`;
  this.view = 0;
  this.likes = 0;
}

//Number generators ---------------------------------------
function generateRandNum(products) {
  return Math.floor(Math.random() * products.length);
}

function randomThreeProd(products) {
  let result = [];

  for (let i = 0; i < 3; i++) {
    let num = generateRandNum(products);

    while (result.includes(num)) {
      num = generateRandNum(products)
    }
    result.push(num);
  }
  return result;
}

//Rendering functions ---------------------------------------
function renderProducts(products) {
  let randomProducts = randomThreeProd(products);

  randomProducts.forEach(prod => {
    products[prod].view++;
    renderImages(imageContainer, products[prod].src, products[prod].name);
  })
}

function renderResultButton() {
  let button = document.createElement('button');
  button.innerText = 'View Results';
  imageContainer.insertAdjacentElement('afterend', button);

  button.addEventListener('click', renderResults);
}

function renderImages(parent, src, name) {
  let img = document.createElement('img');
  img.src = src;
  img.alt = name;
  parent.appendChild(img);
}

//Event functions ---------------------------------------
function productClick(event) {
  let productClicked = event.target.alt;

  products.forEach(prod => {
    if (prod.name === productClicked) {
      prod.likes++;
    }
  })

  rounds++;

  if (rounds < MAX_ROUNDS) {
    while (imageContainer.lastElementChild) {
      imageContainer.removeChild(imageContainer.lastElementChild)
    }
    renderProducts(products);
  } else {
    imageContainer.removeEventListener('click', productClick);
    renderResultButton();
  }
}

function renderResults() {
  products.forEach(prod => {
    let li = document.createElement("li");
    li.innerText = `${prod.name} has ${prod.likes} vote(s), and was seen ${prod.view} time(s).`
    resultsContainer.appendChild(li);
  });

  document.querySelector('button').remove();
}

//Executable ---------------------------------------
renderProducts(products);
imageContainer.addEventListener('click', productClick);




