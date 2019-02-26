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
        <button class="shopping-item-edit js-item-edit">
            <span class="button-label">edit</span>
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

function changeNameForListItem(itemId, result) {
  console.log("Toggling checked property for item with id " + itemId);
  const item = STORE.items.find(item => item.id === itemId);
  result.length ? (item.name = result) : (item.name = item.name);
}

function deleteListItem(itemId) {
  console.log(`Deleting item with id  ${itemId} from shopping list`);
  const itemIndex = STORE.items.findIndex(item => item.id === itemId);
  STORE.items.splice(itemIndex, 1);
}

function handleDeleteItemClicked() {
  $(".js-shopping-list").on("click", ".js-item-delete", event => {
    // get the index of the item in STORE
    const itemIndex = getItemIdFromElement(event.currentTarget);
    // delete the item
    deleteListItem(itemIndex);
    // render the updated shopping list
    renderShoppingList();
  });
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

// function handleDeleteItemClicked() {
//   $(".js-shopping-list").on("click", `.js-item-delete`, event => {
//     console.log("`handleDeleteItemClicked` ran");
//     const id = getItemIdFromElement(event.currentTarget);
//     removeItemFromList(id);
//     renderShoppingList();
//   });
// }

function toggleHideFilter() {
  STORE.hideCompleted = !STORE.hideCompleted;
}

function handleToggleHideFilter() {
  $(".js-hide-completed-toggle").on("click", () => {
    toggleHideFilter();
    renderShoppingList();
  });
}

function handleEditItemClicked() {
  $(".js-shopping-list").on("click", `.js-item-edit`, event => {
    let result = prompt("Edit the list item name");
    console.log("`handleEditItemClicked` ran");
    const id = getItemIdFromElement(event.currentTarget);
    changeNameForListItem(id, result);
    renderShoppingList();
  });
}
//handles searchbox input
function handleSearchInput() {
  $("#searchbox").keyup(() => {
    renderShoppingList();
  });
}

//returns a list of items filtered with user input into searchbox
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
  handleEditItemClicked();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);
