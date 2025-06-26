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
    return `
    <section class="item-box">
    <div class="items">
      <div class="icon">${menu.emoji}</div>
      <div class="item-details">
        <h2 class="item-heading">${menu.name}</h2>
        <p class="item-ingredients">${menu.ingredients}</p>
        <p class="item-price">${menu.price}</p>
      </div>
      <div class="add-item">+</div>
      <p>This is index ${menu.id}</p>
    </div>
  </section>
    `;
  });

  return displayArray.join(" ");
}

container.innerHTML = getMenuArray(menuArray);
