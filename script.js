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
      <span class="icon">${menu.emoji}</span>
      <div class="item-details">
        <h2 class="item-heading">${menu.name}</h2>
        <p class="item-ingredients">${menu.ingredients}</p>
        <p class="item-price">$${menu.price}</p>
      </div>
      <button class="add-item"><i class="fa-solid fa-plus"></i></button>
    </div>
  </section>
    `;
  });

  return displayArray.join(" ");
}

container.innerHTML = getMenuArray(menuArray);
