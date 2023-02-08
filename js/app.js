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

let distinctProducts = [];

//DOM windows --------------------------------------------
const CTX = document.getElementById('myChart');
const IMAGE_CONTAINER = document.querySelector('#productImages');
const RESULT_CONTAINER = document.querySelector('#results ul');

//Object -------------------------------------------------
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

function pickRandomProducts(products, count) {
  let result = [];

  while (distinctProducts.length < count * 2) {
    let num = generateRandNum(products);

    if (!distinctProducts.includes(num)) {
      distinctProducts.push(num);
    }
  }

  for (let i = 0; i < count; i++) {
    result.push(distinctProducts.shift());
  }

  return result;
}

//Rendering functions -------------------------------------
function renderProducts() {
  let getData = localStorage.getItem('productData');

  if (getData) {
    products = JSON.parse(getData);
  }

  let randomProducts = pickRandomProducts(products, 3);

  randomProducts.forEach(prod => {
    products[prod].view++;
    renderImages(IMAGE_CONTAINER, products[prod].src, products[prod].name);
  });
}

function renderResultButton() {
  let button = document.createElement('button');
  button.innerText = 'View Results';
  RESULT_CONTAINER.insertAdjacentElement('beforebegin', button);

  button.addEventListener('click', renderResults);
}

function renderImages(parent, src, name) {
  let img = document.createElement('img');
  img.src = src;
  img.alt = name;
  parent.appendChild(img);
}

function renderChart() {
  let labelProducts = [];
  let views = [];
  let likes = [];

  products.forEach(prod => {
    labelProducts.push(prod.name);
    views.push(prod.view);
    likes.push(prod.likes);
  });

  let config = {
    type: 'bar',
    data: {
      labels: labelProducts,
      datasets: [{
        label: '# of Views',
        data: views,
        borderWidth: 1
      },
      {
        label: '# of Votes',
        data: likes,
        borderWidth: 1
      }
      ],
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    }
  };

  new Chart(CTX, config);
}

//Save functions ------------------------------------------
function saveProductData() {
  let stringify = JSON.stringify(products);

  localStorage.setItem('productData', stringify);
}


//Event functions -----------------------------------------
function productClick(event) {
  let productClicked = event.target.alt;

  products.forEach(prod => {
    if (prod.name === productClicked) {
      prod.likes++;
    }
  });

  rounds++;

  saveProductData();

  if (rounds < MAX_ROUNDS) {
    while (IMAGE_CONTAINER.lastElementChild) {
      IMAGE_CONTAINER.removeChild(IMAGE_CONTAINER.lastElementChild)
    }
    renderProducts(products);
  } else {
    IMAGE_CONTAINER.removeEventListener('click', productClick);
    renderResultButton();
  }
}

function renderResults() {
  products.forEach(prod => {
    let li = document.createElement("li");
    li.innerText = `${prod.name} has ${prod.likes} vote(s), and was seen ${prod.view} time(s).`
    RESULT_CONTAINER.appendChild(li);
  });

  document.querySelector('button').remove();
  renderChart();
}

//Executable ----------------------------------------------
renderProducts(products);
IMAGE_CONTAINER.addEventListener('click', productClick);
