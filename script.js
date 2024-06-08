import { menuArray } from './data.js';


let currentOrder = {};

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
     <div id = "order">
        <h3 class="order-title">Your Order</h3>
        <ul id="order-list"></ul>
        <p id="order-sum">Total: $0</p>
        <button id="complete-order">Complete Order</button>
      </div>
    `;
    // orderDetails.style.display = 'none';
    document.querySelector('#order-total').appendChild(orderDetails);
  }


  menuArray.forEach((food) => {
    const button = document.querySelector(`.food-item-${food.id}`);
    button.addEventListener('click', function () {
      if (orderDetails.style.display === 'none') {
        orderDetails.style.display = 'block';
      }

      // Update current order
      if (currentOrder[food.name]) {
        currentOrder[food.name].count += 1;
        currentOrder[food.name].total += food.price;
      } else {
        currentOrder[food.name] = { count: 1, total: food.price };
      }

      totalOrder();
    });
  });
}


function totalOrder() {
     const orderList = document.getElementById('order-list');
  orderList.innerHTML = '';
 let totalSum = 0
  Object.keys(currentOrder).forEach((item) => {
    const listItem = document.createElement('li');
    const orderItem = currentOrder[item];
    listItem.textContent = `${item} - $${orderItem.total} (${
      orderItem.count
    }x $${orderItem.total / orderItem.count})`;
    totalSum += orderItem.total
    orderList.appendChild(listItem);
  });

  const orderSum = document.querySelector("#order-sum")
  orderSum.textContent = `Total: $${totalSum}`
}


function renderFood(foodItems) {
  document.querySelector('#container').innerHTML = getFoodHtml(foodItems);
}
renderFood(menuArray);
handleOrderClick(menuArray);
