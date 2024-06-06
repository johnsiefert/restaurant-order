import { menuArray } from '/data.js';

document.addEventListener('click', function () {});

function getFoodHtml(menuArray) {
  let foodHtml = ``;
  menuArray.forEach(function (food) {
    foodHtml += `
    <section class="card">
        <div class="card-start">
    <h2>${food.emoji}</h2>
</div>
            <div class="card-mid">
                <h4 class="card-title">${food.name}</h4>
                <p class="card-ingredients">${food.ingredients}</p>
                <p class="card-price">$${food.price}</p>

            </div>
        <div class="card-end">
            <button class="card-menu food-item-${food.id}">+</button>
        </div>
    </section>
    `;
  });

  return foodHtml;
}

function handleOrderClick(menuArray) {
  let orderDetails = document.querySelector('#order-details');

  if (!orderDetails) {
    orderDetails = document.createElement('div');
    orderDetails.id = 'order-details';
    orderDetails.innerHTML = `
      <div>
        <h3>Your Order</h3>
        <ul id="order-list"></ul>
        <button id="complete-order">Complete Order</button>
      </div>
    `;
     orderDetails.style.display = 'none';
    document.querySelector('#order-total').appendChild(orderDetails);
  }

  const orderList = orderDetails.querySelector('#order-list');

  menuArray.forEach((food,index) => {
    const button = document.querySelector(`.food-item-${food.id}`);
    button.addEventListener('click', function () {
        if(index === 0){
            orderDetails.style.display = 'block'
        }
      const listItem = document.createElement('li');
      listItem.textContent = `${food.name} - $${food.price}`;
      orderList.appendChild(listItem);
    });
  });
}

function renderFood(foodItems) {
  document.querySelector('#container').innerHTML = getFoodHtml(foodItems);
}
renderFood(menuArray);
handleOrderClick(menuArray);
