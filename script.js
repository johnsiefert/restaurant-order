import { menuArray } from '/data.js';

function menu(){
const foodChoices = menuArray
  .map(function (food) {
    return `
    <section class="card">
        <div class="card-start">
            <p class="card-emoji">${food.emoji}</p>
        </div>
            <div class="card-mid">
                <h4 class="card-title">${food.name}</h4>
                <p class="card-ingredients">${food.ingredients}</p>
            </div>
        <div class="card-end">
            <button class="card-menu">+</button>
        </div>
    </section>
    `;
  })
  .join('');

  document.getElementById('container').innerHTML = foodChoices;
}

menu()
