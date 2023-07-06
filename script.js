
// A function for collecting what is typed in the search box and storing it in the variable searchInput
const searchCocktails = () => {
    const searchInput = document.getElementById("search-input").value;
  
  // Collecting the data from theCocktaildb API based on the value typed in the search box. 
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`)
      .then(response => response.json())
      .then(data => {
        const cocktails = data.drinks;
  
  // Grabbing the html card on the DOM where we will render our new information and storing it in the variable searchResults
    const searchResults = document.querySelector(".search-results");
    searchResults.innerHTML = "";
  
  /*The code goes through each element of the cocktail database, creates a card for each cocktail 
  and renders them adjascent to each other on the area earlier difined as seachResults*/
        cocktails.forEach(cocktail => {
          const card = createCocktailCard(cocktail);
          searchResults.appendChild(card);
        });
      })
  };
  
  // Function to create a single cocktail card 
  // Assigning it the css class search-result
  function createCocktailCard(cocktail) {
    const card = document.createElement("div");
    card.classList.add("search-result");
  // Adding image to the card
    const image = document.createElement("img");
    image.src = cocktail.strDrinkThumb;
    card.appendChild(image);
  //Creating a new div and assigning it the class name "drinkInfo"
    const drinkInfo = document.createElement("div");
    drinkInfo.classList.add("drink-info");
  // Creating an h2 in the card inside the "drink-info" div, where the drinks name will be rendered giving it the class name "drink-name"
    const drinkName = document.createElement("h2");
    drinkName.classList.add("drink-name");
    drinkName.textContent = cocktail.strDrink;
    drinkInfo.appendChild(drinkName);
  
  // Creates a button that when clicked adds the calls the addTOorder function passing in the drinks name
    const orderButton = document.createElement("button");
    orderButton.classList.add("order");
    orderButton.textContent = "Order";
    orderButton.addEventListener("click", function () {
      addToOrders(cocktail.strDrink);
    });
  //ads the order button to the drinks info div
    drinkInfo.appendChild(orderButton);
  //adds the drinkInfo div to larger card element
    card.appendChild(drinkInfo);
  
    return card;
  }
  
  // Function to add a cocktail to the ordered list
  function addToOrders(cocktailName) {
    const myOrders = document.getElementById("myOrders");
    const orderItem = document.createElement("li");
    orderItem.textContent = cocktailName;
    myOrders.appendChild(orderItem);
  }
  
  // Function to clear the ordered list
  function clearOrders() {
    const myOrders = document.getElementById("myOrders");
    myOrders.innerHTML = "";
  }
  
  // Calling  the searchCocktail function when the button is clicked but preventing the page from reloading
  const searchButton = document.getElementById("search-button");
  searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    searchCocktails();
  });
  
  // calling the clearOrder function on buttton click also preventing the page from reloading
  const clearOrderButton = document.querySelector(".clear-order");
  clearOrderButton.addEventListener("click", function (event) {
    event.preventDefault();
    clearOrders();
  });
  
  // Default rendering of all cocktails available, on page load
  searchCocktails();
  