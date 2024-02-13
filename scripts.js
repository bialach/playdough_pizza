// Toppings data
const toppings = {
    "cheese": [
        "American",
        "Swiss",
        "Cheddar",
        "Mozzarella",
        "Parmesan",
        "Feta",
        "Monterey Jack",
        "Provolone",
        "Cotija",
        "Non-Dairy",
        "No Cheese"
    ],
    "sauce": [
        "Tomato Sauce",
        "Hearty Marinara Sauce",
        "Honey BBQ Sauce",
        "Garlic Parmesan Sauce",
        "Alfredo Sauce",
        "Ranch Sauce",
        "No Sauce"
    ],
    "meat": [
        "Sausage",
        "Pepperoni",
        "Ham",
        "Beef",
        "Chicken",
        "Bacon",
        "Canadian Bacon",
        "Salami",
        "Steak",
        "Anchovies",
        "No Meat"
    ],
    "vegetable": [
        "Onions",
        "Green Peppers",
        "Banana Peppers",
        "Jalapeno Peppers",
        "Diced Tomatoes",
        "Sun-Dried Tomatoes",
        "Black Olives",
        "Green Olives",
        "Kalamata Olives",
        "Garlic",
        "Spinach",
        "Pineapple",
        "Mushrooms",
        "Basil",
        "Parsley",
        "No Vegetables"
    ]
};

// Function to populate topping select elements
function populateToppings() {
    for (let category in toppings) {
        let toppingDiv = document.getElementById(`${category}Toppings`);
        toppings[category].forEach((topping, index) => {
            let label = document.createElement('label');
            label.innerHTML = `<input type="checkbox" name="${category}" value="${topping}" onchange="updateSelectedToppingsList()">${topping}<br>`;
            toppingDiv.appendChild(label);
        });
    }
}

// Function to handle form submission
function handleFormSubmission(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Get form data
    const pizzaName = document.getElementById('pizzaName').value;
    const selectedToppings = {};

    // Loop through topping categories
    for (let category in toppings) {
        selectedToppings[category] = [];
        document.querySelectorAll(`input[name="${category}"]:checked`).forEach(checkbox => {
            selectedToppings[category].push(checkbox.value);
        });
    }

    // Create custom pizza output
    let customPizzaOutput = `<h2>Pizza Name: ${pizzaName}</h2><p><strong>Toppings:</strong></p>`;
    for (let category in selectedToppings) {
        if (selectedToppings[category].length > 0) {
            customPizzaOutput += `<p><strong>${category.capitalize()}:</strong> ${selectedToppings[category].join(', ')}</p>`;
        }
    }

    // Display custom pizza output
    document.getElementById('customPizzaOutput').innerHTML = customPizzaOutput;
}

// Capitalize first letter of string (helper function)
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

// Add event listener for form submission
document.getElementById('customPizzaForm').addEventListener('submit', handleFormSubmission);

// Populate topping select elements
populateToppings();

// Function to add custom topping
function addCustomTopping(category) {
    const customToppingInput = document.getElementById(`custom${category.charAt(0).toUpperCase() + category.slice(1)}`).value;
    if (customToppingInput.trim() !== "") {
        let toppingDiv = document.getElementById(`${category}Toppings`);
        let label = document.createElement('label');
        label.innerHTML = `<input type="checkbox" name="${category}" value="${customToppingInput}" onchange="updateSelectedToppingsList()">${customToppingInput}<br>`;
        toppingDiv.appendChild(label);
        // Clear the input field after adding the topping
        document.getElementById(`custom${category.charAt(0).toUpperCase() + category.slice(1)}`).value = "";
    }
}

// Function to update selected toppings list
function updateSelectedToppingsList() {
    const selectedToppingsList = document.getElementById('selectedToppingsList');
    selectedToppingsList.innerHTML = ""; // Clear the list
    for (let category in toppings) {
        document.querySelectorAll(`input[name="${category}"]:checked`).forEach(checkbox => {
            const li = document.createElement('li');
            li.textContent = checkbox.value;
            selectedToppingsList.appendChild(li);
        });
    }
}
