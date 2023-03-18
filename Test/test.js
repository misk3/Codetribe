let itemInput = document.getElementById("itemInput");
let quantityInput = document.getElementById("quantityInput");
let priceInput = document.getElementById("priceInput");
let submitButton = document.getElementById("submitButton");
let itemList = document.getElementById("itemList");
let clearAllButton = document.getElementById("clearAllButton");
let budgetInput = document.getElementById("budgetInput");
let calculateButton = document.getElementById("calculateButton");

// Load items from local storage
let items = JSON.parse(localStorage.getItem("items")) || [];

// Display items on page load
displayItems();

// Add event listeners
submitButton.addEventListener("click", addItem);
clearAllButton.addEventListener("click", clearAllItems);
calculateButton.addEventListener("click", calculateBudget);

function addItem() {
  // Check for valid input
  if (!itemInput.value) {
    showAlert("Please enter a valid item", "error");
    return;
  }

  const quantity = parseInt(quantityInput.value);
  if (isNaN(quantity) || quantity < 0) {
    showAlert("Please enter a valid quantity", "error");
    return;
  }

  const price = parseFloat(priceInput.value);
  if (isNaN(price) || price <= 0) {
    showAlert("Please enter a valid price", "error");
    return;
  }

  // Add item to array and local storage
  const newItem = {
    name: itemInput.value,
    quantity,
    price,
  };
  items.push(newItem);
  localStorage.setItem("items", JSON.stringify(items));
  console.log(newItem);
  // Clear input fields
  itemInput.value = "";
  quantityInput.value = 1;
  priceInput.value = "";

  // Display success message and update list
  showAlert("Item added successfully", "success");
  displayItems();
}

function calculateBudget() {
  const budget = parseFloat(budgetInput.value);
  if (isNaN(budget) || budget <= 0) {
    showAlert("Please enter a valid budget", "error");
    return;
  }
  const cancelButton = document.createElement("button");
  cancelButton.innerText = "Cancel";
  cancelButton.addEventListener("click", () => {
    nameSpan.innerHTML = item.name;
    quantitySpan.innerText = item.quantity;
    priceSpan.innerHTML = "$" + item.price.toFixed(2);
    editButton.style.display = "inline-block";
    saveButton.remove();
    cancelButton.remove();
  });

  li.appendChild(nameSpan);
  li.appendChild(quantitySpan);
  li.appendChild(priceSpan);
  li.appendChild(editButton);
  li.appendChild(deleteButton);
  itemList.appendChild(li);
}

function clearAllItems() {
  // Clear items array and local storage
  items = [];
  localStorage.setItem("items", JSON.stringify(items));

  // Display success message and update list
  showAlert("All items cleared", "success");
  displayItems();
}

function showAlert(message, type) {
  var alertContainer = document.getElementById("alertContainer");

  // Clear existing alert if there is one
  alertContainer.innerHTML = "";

  var alertDiv = document.createElement("div");
  alertDiv.classList.add(type);
  alertDiv.innerText = message;

  alertContainer.appendChild(alertDiv);

  // Remove alert after 3 seconds
  setTimeout(() => {
    alertContainer.innerHTML = "";
  }, 3000);
}
function displayItems() {
  // Clear list first
  itemList.innerHTML = "";

  // Display each item
  items.forEach((item, index) => {
    const li = document.createElement("li");
    const nameSpan = document.createElement("span");
    const quantitySpan = document.createElement("span");
    const priceSpan = document.createElement("span");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    nameSpan.innerText = item.name;
    quantitySpan.innerText = item.quantity;
    priceSpan.innerText = "$" + item.price.toFixed(2);
    editButton.innerText = "Edit";
    deleteButton.innerText = "Delete";

    editButton.addEventListener("click", () => {
      // Replace labels with inputs
      nameSpan.innerHTML = `<input type="text" value="${item.name}">`;
      quantitySpan.innerHTML = `<input type="number" value="${item.quantity}">`;
      priceSpan.innerHTML = `<input type="number" step="0.01" value="${item.price}">`;
      editButton.style.display = "none";

      // Add save button and cancel button
      const saveButton = document.createElement("button");
      saveButton.innerText = "Save";
      saveButton.addEventListener("click", () => {
        const newValues = {
          name: nameSpan.querySelector("input").value,
          quantity: parseInt(quantitySpan.querySelector("input").value),
          price: parseFloat(priceSpan.querySelector("input").value),
        };
        if (!newValues.name) {
          showAlert("Please enter a valid item", "error");
          return;
        }

        if (isNaN(newValues.quantity) || newValues.quantity < 0) {
          showAlert("Please enter a valid quantity", "error");
          return;
        }

        if (isNaN(newValues.price) || newValues.price <= 0) {
          showAlert("Please enter a valid price", "error");
          return;
        }

        items[index] = newValues;
        localStorage.setItem("items", JSON.stringify(items));
        showAlert("Item updated successfully", "success");
        displayItems();
      });

      const totalCost = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      const remainingBudget = budget - totalCost;

      if (remainingBudget >= 0) {
        showAlert(
          `Remaining budget: $ ${remainingBudget.toFixed(2)}`,
          "success"
        );
      } else {
        showAlert(
          `You need to add $ ${Math.abs(remainingBudget).toFixed(
            2
          )} to your budget`,
          "error"
        );
      }
    });
  });
}
console.log(itemInput);
