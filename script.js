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

// Render Order Function
function renderOrder() {
  //  Logic to clear Order Items
  if (orderedItems.length === 0) {
    orderSection.innerHTML = "";
    return;
  }

  // Reduce method for calc. Total Price
  const totalPrice = orderedItems.reduce(
    (total, item) => total + item.price,
    0
  );

  // Order Rows Template
  const orderRows = orderedItems
    .map((item, index) => {
      const { name, price } = item;
      return `
  <div class='order-row'>
        <div class='item-name-box'>
          <span class='item-name'>${name}</span>
          <button class='remove-item' data-index='${index}'>remove</button>
        </div>
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

  // Remove Button
  const removeItem = document.querySelectorAll(".remove-item");

  removeItem.forEach((button) => {
    button.addEventListener("click", function (e) {
      const index = button.dataset.index;
      handleRemoveItem(Number(index));
    });
  });
}

// Listener to Remove Items
function handleRemoveItem(index) {
  orderedItems.splice(index, 1);
  renderOrder();
}

// Event Listener for Payment Button
document.addEventListener("click", function (e) {
  if (e.target.id === "complete-order") {
    document.getElementById("modal").style.display = "flex";
  }
});

// Display Return Message
const paymentModal = document.getElementById("payment-modal");

paymentModal.addEventListener("submit", function (e) {
  e.preventDefault();

  const fullName = document.getElementById("fullName");
  const fullNameInput = fullName.value;

  document.getElementById("modal").style.display = "none";

  orderSection.innerHTML = `
  <div class="message-container">
     <p class="message">Thanks, ${fullNameInput}! Your order is on it's way!</p>
  </div>
  `;
});
