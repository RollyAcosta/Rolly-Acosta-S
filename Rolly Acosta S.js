// Initialize data
const users = [{ username: "admin", password: "admin123" }];
const categories = {
  Pasta: [
    { name: "Spaghetti", price: 125 },
    { name: "Pancit", price: 120 },
    { name: "Macaroni", price: 110 }
  ],
  Desserts: [
    { name: "Chocolate Cake", price: 50 },
    { name: "Halo-halo", price: 40 },
    { name: "Ice Cream", price: 30 }
  ],
  Drinks: [
    { name: "Coke", price: 30 },
    { name: "Lemonade", price: 30 },
    { name: "Water", price: 20 }
  ]
};
let cart = [];

// Function to authenticate a seller
function authenticateSeller(username, password) {
  return users.some(user => user.username === username && user.password === password);
}

// Function to sort items (Bubble Sort)
function sortItems(items) {
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items.length - i - 1; j++) {
      if (items[j].name > items[j + 1].name) {
        [items[j], items[j + 1]] = [items[j + 1], items[j]];
      }
    }
  }
  return items;
}

// Seller actions
function sellerActions() {
  while (true) {
    const action = prompt("\nOptions: LOGOUT, ADD, REMOVE\nChoose an action:").toUpperCase();
    if (action === "LOGOUT") return;

    if (action === "ADD" || action === "REMOVE") {
      const category = prompt("\nCategories: Pasta, Desserts, Drinks\nEnter a category to update:").trim();
      if (!categories[category]) {
        alert("Invalid category.");
        continue;
      }

      if (action === "ADD") {
        while (true) {
          const name = prompt("Enter item name:").trim();
          const price = parseFloat(prompt("Enter price per item:"));
          categories[category].push({ name, price });
          alert("Item added.");

          const cont = prompt("Add another item? (yes/no):").toLowerCase();
          if (cont !== "yes") break;
        }
      } else if (action === "REMOVE") {
        while (true) {
          const name = prompt("Enter item name to remove:").trim();
          const items = categories[category].filter(item => item.name !== name);

          if (items.length === categories[category].length) {
            alert("Item not found.");
          } else {
            categories[category] = items;
            alert("Item removed.");
          }

          const cont = prompt("Remove another item? (yes/no):").toLowerCase();
          if (cont !== "yes") break;
        }
      }
    }
  }
}

// Customer actions
function customerActions() {
  while (true) {
    const action = prompt("\nOptions: ORDER, CART, CANCEL\nChoose an action:").toUpperCase();

    if (action === "CANCEL") return;

    if (action === "ORDER") {
      const category = prompt("\nCategories: Pasta, Desserts, Drinks\nChoose a category:").trim();
      if (!categories[category] || categories[category].length === 0) {
        alert("Invalid category or no items available.");
        continue;
      }

      const sortedItems = sortItems(categories[category]);
      let menu = `Items in ${category}:\n`;
      sortedItems.forEach((item, index) => {
        menu += `${index + 1}. ${item.name} - $${item.price.toFixed(2)}\n`;
      });
      const choice = parseInt(prompt(menu + "Choose an item (number):")) - 1;
      if (choice < 0 || choice >= sortedItems.length) {
        alert("Invalid choice.");
        continue;
      }

      const quantity = parseInt(prompt("Enter quantity:"));
      const item = sortedItems[choice];
      cart.push({ name: item.name, price: item.price, quantity });
      alert("Item added to cart.");
    } else if (action === "CART") {
      while (true) {
        let cartSummary = "\nCart:\n";
        let totalPrice = 0;
        cart.forEach(item => {
          const itemTotal = item.price * item.quantity;
          totalPrice += itemTotal;
          cartSummary += `${item.name} - $${item.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}\n`;
        });
        cartSummary += `Total Price: $${totalPrice.toFixed(2)}`;

        const cartAction = prompt(cartSummary + "\nOptions: PRINT, ADD, REMOVE, CANCEL\nChoose an action:").toUpperCase();

        if (cartAction === "CANCEL") break;

        if (cartAction === "PRINT") {
          let receipt = "\nReceipt:\n";
          cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            receipt += `${item.name} - $${item.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}\n`;
          });
          receipt += `Total Price: $${totalPrice.toFixed(2)}`;
          alert(receipt);
          cart = [];
          break;
        }

        if (cartAction === "ADD") break;

        if (cartAction === "REMOVE") {
          const name = prompt("Enter the item name to remove:").trim();
          cart = cart.filter(item => item.name !== name);
          alert("Item removed.");
        } else {
          alert("Invalid option.");
        }
      }
    }
  }
}

// Main program
function main() {
  while (true) {
    const userType = prompt("\nWelcome to the Kiosk!\nAre you a 1.SELLER or 2.CUSTOMER?").toUpperCase();

    if (userType === "1.SELLER") {
      const username = prompt("Enter username:").trim();
      const password = prompt("Enter password:").trim();
      if (authenticateSeller(username, password)) {
        alert("Welcome, Seller!");
        sellerActions();
      } else {
        alert("Invalid credentials.");
      }
    } else if (userType === "2.CUSTOMER") {
      alert("\nWelcome, Customer!\nCategories: Pasta, Desserts, Drinks");
      customerActions();
    } else {
      alert("Invalid input. Please choose 1.SELLER or 2.CUSTOMER.");
    }
  }
}

// Run the program
main();
