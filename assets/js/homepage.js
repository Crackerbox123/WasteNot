// API function pull data from Spoonacular - Search Ingredient Facts
var searchFood = "banana"

var getIngredient = function(searchFood) {

    // returns 5 foods
    var apiUrl = "https://api.spoonacular.com/food/ingredients/search?query=" + searchFood + "&number=5&sort=calories&sortDirection=desc&apiKey=9145364b47d54a31968bed38b03f6572";
    fetch(apiUrl).then(function(response){
    response.json().then(function(data) {
       console.log(data);
    });
});
};

// Spoonacular function call
getIngredient(searchFood);


// API function to pull data from Spoonacular API - Search Recipes FROM ingredients
var searchRecipe = "mango"

// Fetch API
var getRecipes = function(searchRecipe) {
    // returns 5 recipes
    var apiUrl = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + searchRecipe + "&number=5&apiKey=9145364b47d54a31968bed38b03f6572";
    fetch(apiUrl).then(function(response){
    response.json().then(function(data) {
       console.log(data);
    });
});
};

var foodInputEl = document.querySelector("#plant");
var formSubmitHandler = function(event) {
    event.preventDefault();
    //get value from input element
    var food = foodInputEl.ariaValueMax.trim();
    console.log(food);
    if (food) {
        getRecipes(food);
    } else {
        alert("Please enter a food");
    }
};
// Spoonacular function call
// getRecipes(searchRecipe);

// var ingredientContainerEl = document.getElementById("ingredient-container");

// var displayIngredient = function (data,searchFood) {
//     ingredientContainerEl.textContent = "";

//     for (var i= 1; i<results[i]; i++) {
//         v
//     }
// }




