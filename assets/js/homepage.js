// Variables
var userFormEl = document.querySelector("#search-form");



// API function pull data from Spoonacular - Search Ingredient Facts
var searchFood = "banana"

var getIngredient = function(searchFood) {

    // returns 5 foods
    var apiUrl = "https://api.spoonacular.com/food/ingredients/search?query=" + searchFood + "&number=5&sort=calories&sortDirection=desc&apiKey=66860a9f6ecc463a9f11cf2c7e1b8fe0";
    fetch(apiUrl).then(function(response){
    response.json().then(function(data) {
       console.log(data);
       displayIngredients(data);
    });
});
};
//getIngredient(searchFood);


// API function to pull data from Spoonacular API - Search Recipes FROM ingredients
var searchRecipe = "mango"

// Fetch API
var getRecipes = function(searchRecipe) {
    // returns 5 recipes
    var apiUrl = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + searchRecipe + "&number=5&apiKey=66860a9f6ecc463a9f11cf2c7e1b8fe0";
    fetch(apiUrl).then(function(response){
    response.json().then(function(data) {
       console.log(data);
       displayRecipe(data);
    });
});
};
//getRecipes(searchFood)



// Form Submit Handler Logic
var foodInputEl = document.querySelector("#plant");

var formSubmitHandler = function(event) {
    event.preventDefault();
    //get value from input element
    var food = foodInputEl.value.trim();
    
    if (food) {
        getRecipes(food);
        getIngredient(food);
    } else {
        alert("Please enter a food");
    }
};

var ingredientContainerEl = document.querySelector("#ingredient-container");
// Spoonacular function call

var displayIngredients = function(food) {
    console.log(food);
    // clear old content
    ingredientContainerEl.textContent = "";
    
    // display info
    for (i = 0; i<food.results.length; i++) {
       
        //  display jpg
        var itemImage = food.results[i].image;
        var itemImageEl = document.createElement("img");
        itemImageEl.setAttribute("src", "https://spoonacular.com/cdn/ingredients_100x100/"+itemImage);
        ingredientContainerEl.appendChild(itemImageEl);

        // display name
        var itemName = food.results[i].name;
        //console.log(itemName);
        var itemNameEl = document.createElement("h2");
        itemNameEl.innerHTML = "Name: "+itemName;
        //console.log(ingredientContainerEl);
        ingredientContainerEl.appendChild(itemNameEl);
    }
    
};

var recipeContainerEl = document.querySelector("#recipe-container");

var displayRecipe = function(food) {
    console.log(food);
    //clear out old content
    recipeContainerEl.textContent="";

    for (i=0; i<food.length;i++) {
        //console.log("This loop is working");
        // image element
        var recipeImage = food[i].image;
        console.log(recipeImage);
        var recipeImageEl=document.createElement("img");
        recipeImageEl.setAttribute("src", recipeImage);
        recipeImageEl.className=""; // classname here
        recipeContainerEl.appendChild(recipeImageEl);

        // name element
        
    }

    
};


userFormEl.addEventListener("submit", formSubmitHandler);



