// API function pull data from Fruityvice API









// API function to pull data from Spoonacular API - Search Recipes FROM ingredients
searchTerm = "mango"

// Fetch API
var getRecipes = function(searchTerm) {
    var apiUrl = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + searchTerm + "&number=10&apiKey=9145364b47d54a31968bed38b03f6572";
    fetch(apiUrl).then(function(response){
    response.json().then(function(data) {
       console.log(data);
    });
});
};

// Spoonacular function call
getRecipes(searchTerm);

