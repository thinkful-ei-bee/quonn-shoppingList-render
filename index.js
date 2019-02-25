"use strict";

//holds all of our shopping list data
const STORE = [
  { name: "apples", checked: false },
  { name: "oranges", checked: false },
  { name: "milk", checked: true },
  { name: "bread", checked: false }
];

function generateItemElement(item, itemIndex, template) {
  return `
    <li data-item-id="${item.id}">
      <span class="shopping-item js-shopping-item ${
        item.checked ? "shopping-item__checked" : ""
      }">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}

function generateShoppingItemsString(shoppingList) {
  console.log("generating Shopping List Item");
  const items = shoppingList.map((item, index) =>
    generateItemElement(item, index)
  );
  return items.join("");
}

function renderShoppingList() {
  // renders the store
  console.log("`renderShoppingList` ran");
  const shoppingListItemsString = generateShoppingItemsString(STORE);
  //insert into the DOM
  $(".js-shopping-list").html(shoppingListItemsString);
}

function handleNewItemSubmit() {
  // adds a new item to the store
  console.log("`handleNewItemSubmit` ran");
}

function handleItemCheckClicked() {
  // handles "check button" clicks by adding item_complete class to items span
  console.log("`handleItemCheckClicked` ran");
}

function handleDeleteItemClicked() {
  // handles "delete button" clicks by removing the itme from the store

  console.log("`handleDeleteItemClicked` ran");
}

// this function will be our callback and is responsible for calling all of our other functions
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  generateShoppingItemsString();
}

$(handleShoppingList);
