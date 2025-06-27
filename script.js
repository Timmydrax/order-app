import { menuArray } from "./data.js";

const container = document.getElementById("container");
const menuSection = document.getElementById("menu-section");
const orderSection = document.getElementById("order-section");

const footerEl = document.getElementById("footer");
const year = new Date().getFullYear();
const pEl = document.createElement("p");

// Footer Element
pEl.classList.add("footer-content");
pEl.textContent = `© ${year} Timmy_Drax. All rights reserved.`;
footerEl.appendChild(pEl);

function getMenuArray(menuArray) {
  const displayArray = menuArray.map((menu, index) => {
    // Object Destructuring
    const { emoji, name, ingredients, price, id } = menu;

    return `
    <section class="item-box">
    <div class="items">
      <span class="icon">${emoji}</span>
      <div class="item-details">
        <h2 class="item-heading">${name}</h2>
        <p class="item-ingredients">${ingredients.join(", ")}</p>
        <p class="item-price">$${price}</p>
      </div>
      <button class="add-item" data-id=${id}><i class="fa-solid fa-plus"></i></button>
    </div>
  </section>
    `;
  });

  return displayArray.join(" ");
}

menuSection.innerHTML = getMenuArray(menuArray);

// Dynamic Event Listeners for the Buttons.
container.addEventListener("click", function (e) {
  if (e.target.closest(".add-item")) {
    const itemId = e.target.closest(".add-item").dataset.id;
    handleAddItem(Number(itemId));
  }
});

// Function to add Items
function handleAddItem(id) {
  const selectedItem = menuArray.find((item) => item.id === id);
  orderedItems.push(selectedItem);
  renderOrder();
}

// Ordered Items Array
let orderedItems = [];

function renderOrder() {
  // Reduce method for calc. Total Price
  const totalPrice = orderedItems.reduce(
    (total, item) => total + item.price,
    0
  );

  // Order Rows Template
  const orderRows = orderedItems
    .map((item) => {
      const { name, price } = item;
      return `
  <div class='order-row'>
        <p class='item-name'>${name}</p>
        <p>$${price}</p>
      </div>`;
    })
    .join("");

  // Order Container Template
  const orderContainer = `
   <div class='order-container'>
       <h2>Your Order</h2>
    <div class='row-container'> 
      <div class='order-row-box'> 
       ${orderRows}
      </div>
      <div class='price-row'>
      <span>Total: </span> 
      <span>$${totalPrice} </span> 
      </div>
    </div>
      <button class="complete-order" id='complete-order'>Complete Order</button>
    </div>
  `;

  orderSection.innerHTML = orderContainer;
}
