import { menuArray } from "./data.js";

const container = document.getElementById("container");
const footerEl = document.getElementById("footer");
const year = new Date().getFullYear();
const pEl = document.createElement("p");

pEl.classList.add("footer-content");
pEl.textContent = `© ${year} Timmy_Drax. All rights reserved.`;
footerEl.appendChild(pEl);

function getMenuArray(menuArray) {
  const displayArray = menuArray.map((menu, index) => {
    // Object Destructuring
    const { emoji, name, ingredients, price } = menu;

    return `
    <section class="item-box">
    <div class="items">
      <span class="icon">${emoji}</span>
      <div class="item-details">
        <h2 class="item-heading">${name}</h2>
        <p class="item-ingredients">${ingredients.join(", ")}</p>
        <p class="item-price">$${price}</p>
      </div>
      <button class="add-item"><i class="fa-solid fa-plus"></i></button>
    </div>
  </section>
    `;
  });

  return displayArray.join(" ");
}

container.innerHTML = getMenuArray(menuArray);

function renderOrder() {}


function handleAddItem() {
  console.log("item-added");
}

container.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-item")) {
    handleAddItem(e);
  }
});
