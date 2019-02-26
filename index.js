"use strict";

const STORE = {
  items: [
    { id: cuid(), name: "apples", checked: false },
    { id: cuid(), name: "oranges", checked: false },
    { id: cuid(), name: "milk", checked: true },
    { id: cuid(), name: "bread", checked: false }
  ],
  hideCompleted: false
};

function generateItemElement(item) {
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
  console.log("Generating shopping list element");

  const items = shoppingList.map(item => generateItemElement(item));

  return items.join("");
}

function renderShoppingList() {
  // render the shopping list in the DOM
  console.log("`renderShoppingList` ran");
  let userInput = $("#searchbox").val();
  let filteredItems = STORE.items;
  //if filter is clicked
  if (STORE.hideCompleted) {
    filteredItems = filteredItems.filter(item => !item.checked);
  } else if ($("#searchbox").val().length > 0) {
    filteredItems = getSearchedItems();
  }

  const shoppingListItemsString = generateShoppingItemsString(filteredItems);

  // insert that HTML into the DOM
  $(".js-shopping-list").html(shoppingListItemsString);
}

function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({ id: cuid(), name: itemName, checked: false });
}

function handleNewItemSubmit() {
  $("#js-shopping-list-form").submit(function(event) {
    event.preventDefault();
    console.log("`handleNewItemSubmit` ran");
    const newItemName = $(".js-shopping-list-entry").val();
    $(".js-shopping-list-entry").val("");
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemId) {
  console.log("Toggling checked property for item with id " + itemId);
  const item = STORE.items.find(item => item.id === itemId);
  item.checked = !item.checked;
}

function removeItemFromList(itemId) {
  console.log("Deleted item with id " + itemId);
  const item = STORE.items.find(item => item.id === itemId);
  const index = STORE.items.indexOf(itemId);
  //   if (index > -1) {
  STORE.items.splice(STORE[itemId], 1);
  //   }
  renderShoppingList();
}

function getItemIdFromElement(item) {
  return $(item)
    .closest("li")
    .data("item-id");
}

function handleItemCheckClicked() {
  $(".js-shopping-list").on("click", `.js-item-toggle`, event => {
    console.log("`handleItemCheckClicked` ran");
    const id = getItemIdFromElement(event.currentTarget);
    toggleCheckedForListItem(id);
    renderShoppingList();
  });
}

function handleDeleteItemClicked() {
  $(".js-shopping-list").on("click", `.js-item-delete`, event => {
    console.log("`handleDeleteItemClicked` ran");
    const id = getItemIdFromElement(event.currentTarget);
    removeItemFromList(id);
    renderShoppingList();
  });
}

function toggleHideFilter() {
  STORE.hideCompleted = !STORE.hideCompleted;
}

function handleToggleHideFilter() {
  $(".js-hide-completed-toggle").on("click", () => {
    toggleHideFilter();
    renderShoppingList();
  });
}

function handleSearchInput() {
  $("#searchbox").keyup(() => {
    renderShoppingList();
  });
}

function getSearchedItems() {
  const userInput = $("#searchbox").val();
  const searchedArray = STORE.items.filter(element => {
    if (
      userInput.length > 0 &&
      element.name.toLowerCase().indexOf(userInput.toLowerCase()) !== -1
    ) {
      return element;
    }
  });

  return searchedArray;
}
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleToggleHideFilter();
  handleSearchInput();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);
