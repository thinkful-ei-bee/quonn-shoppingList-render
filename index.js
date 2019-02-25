"use strict";

const STORE = [
  { name: "apples", checked: false },
  { name: "oranges", checked: false },
  { name: "milk", checked: true },
  { name: "bread", checked: false }
];

function renderShoppingList() {
  // renders the store
  console.log("`renderShoppingList` ran");
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
}

$(handleShoppingList);
