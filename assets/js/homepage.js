// Variables
var userFormEl = document.querySelector("#search-form");



// API function pull data from Spoonacular - Search Ingredient Facts
var searchFood = "banana"

var getIngredient = function(searchFood) {

    // returns 5 foods
    var apiUrl = "https://api.spoonacular.com/food/ingredients/search?query=" + searchFood + "&number=5&sort=calories&sortDirection=desc&apiKey=854e53810e43467a816b9a7449bf9772";
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
    var apiUrl = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + searchRecipe + "&number=5&apiKey=854e53810e43467a816b9a7449bf9772";
    fetch(apiUrl).then(function(response){
    response.json().then(function(data) {
       console.log(data);
       displayRecipe(data);
       saved(searchFood);
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
        //console.log(recipeImage);
        var recipeImageEl=document.createElement("img");
        recipeImageEl.setAttribute("src", recipeImage);
        recipeImageEl.className=""; // <--className here
        recipeContainerEl.appendChild(recipeImageEl);

        // name element
        var recipeName=food[i].title;
        //console.log(recipeName);
        var recipeNameEl=document.createElement ("h2");
        recipeNameEl.textContent="Recipe Name: "+recipeName;
        recipeNameEl.className="";  // <--className here
        recipeContainerEl.appendChild(recipeNameEl);

        // ul div created for il's of ingredients
        var recipeUl=document.createElement("ul");
        recipeUl.textContent= "Ingredients:";
        recipeUl.className=""; // <--className here for ul
        recipeContainerEl.appendChild(recipeUl);

        for (x=0; x<food[i].usedIngredients.length;x++) {
            console.log ("this is MF'in working");
            var usedIngName = food[i].usedIngredients[x].original;
            var usedIngNameEl = document.createElement("li");
            usedIngNameEl.textContent= usedIngName;
            usedIngNameEl.className=""; // <-- className here
            recipeUl.appendChild(usedIngNameEl);

        }
        
        //console.log(food[i].missedIngredients)
        for (x=0; x<food[i].missedIngredients.length; x++) {
            //console.log("this is working");
            // missed incredient loop( I believe this is unentered ingredients)
            //console.log(food[i].missedIngredients[x].name);
            var missedIngNam = food[i].missedIngredients[x].original;
            //console.log(missedIngNam);
            var missedIngNamEl =document.createElement("li");
            missedIngNamEl.textContent= missedIngNam;
            missedIngNamEl.classname=""; // <-- className here
            recipeUl.appendChild(missedIngNamEl);


        }
    }

    };

var saved = function(storedFood) {

    var oldFood = JSON.parse(localStorage.getItem("foodItems")) || [];
    if (oldFood.includes(storedFood)===false){
        oldFood.unshift(storedFood)
        localStorage.setItem("foodItems", JSON.stringify(oldFood));
    }

    console.log(oldFood);
}

var loadFood = function () {
    //containerEl.innerHTML="";
    foodArr = JSON.parse(localStorage.getItem("foodItems")) || [];
    console.log(foodArr);
        for (i=0; i<9; i++) {
            var eachFood = foodArr[i];
            if(eachFood != undefined){
                foodButtons(eachFood);
            }
        }
}

var foodButtons = function(newEachFood) {
    var fdBtn = document.createElement("button");
    fdBtn.innerHTML=newEachFood;
    console.log(newEachFood);
    //containerEl.appendChild(fdBtn);
    fdBtn.className = "" // <----- needs className
    fdBtn.onlcick=clickAnswer;
}

function clickAnswer(e) {
    e.preventDefault;
    var clickedFood=e.target;
    console.log(clickedFood.textContent);

    getRecipes(clickedFood.textContent)
}

loadFood()

userFormEl.addEventListener("submit", formSubmitHandler);



