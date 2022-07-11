// Variables
var userFormEl = document.querySelector("#search-form");
var foodHistoryContainerEl = document.querySelector("#historyContainer");
//console.log(foodHistoryContainerEl);
var recipeContainerEl = document.querySelector("#recipe-container");
// API function pull data from Spoonacular - Search Ingredient Facts
//var searchFood = "banana"
var foodInputEl = document.querySelector("#plant");

// var getIngredient = function(searchFood) {

//     // returns 5 foods
//     var apiUrl = "https://api.spoonacular.com/food/ingredients/search?query=" + searchFood + "&number=5&sort=calories&sortDirection=desc&apiKey=854e53810e43467a816b9a7449bf9772";
//     fetch(apiUrl).then(function(response){
//     response.json().then(function(data) {
//        console.log(data);
//        //displayIngredients(data);
       
//     });
// });
// };
//getIngredient(searchFood);


// API function to pull data from Spoonacular API - Search Recipes FROM ingredients
//var searchRecipe = "mango"

// Fetch API
var getRecipes = function(searchRecipe) {
    // returns 5 recipes
    console.log(searchRecipe);
    var apiUrl = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + searchRecipe + "&apiKey=66ddd5de554b45bc946bc6143c86952d";
    fetch(apiUrl).then(function(response){
    if(response.ok) {
        response.json().then(function(data) {
       console.log(data);
       displayRecipe(data);
       saved(searchRecipe);
       loadFood();
    });
    } else {
        alert('Food item not found.');
    }
})
    .catch(function(error) {
        alert("Unable to connect to Spoonacular");
    });      

};





// Form Submit Handler Logic


var formSubmitHandler = function(event) {
    event.preventDefault();
    console.log("Why is this running again?")
    //get value from input element
    var food = foodInputEl.value.trim();
    console.log(food);

    if (food) {
        getRecipes(food);
        //getIngredient(food);
        //saved(food);
    } else {
        alert("Please enter a food");
    }
};

// var ingredientContainerEl = document.querySelector("#ingredient-container");
// // Spoonacular function call

// var displayIngredients = function(food) {
//     console.log(food);
//     // clear old content
//     ingredientContainerEl.textContent = "";
    
//     // display info
//     for (i = 0; i<food.results.length; i++) {
       
//         //  display jpg
//         var itemImage = food.results[i].image;
//         var itemImageEl = document.createElement("img");
//         itemImageEl.setAttribute("src", "https://spoonacular.com/cdn/ingredients_100x100/"+itemImage);
//         ingredientContainerEl.appendChild(itemImageEl);

//         // display name
//         var itemName = food.results[i].name;
//         //console.log(itemName);
//         var itemNameEl = document.createElement("h2");
//         itemNameEl.innerHTML = "Name: "+itemName;
//         //console.log(ingredientContainerEl);
//         ingredientContainerEl.appendChild(itemNameEl);
//     }
    
// };



var displayRecipe = function(data) {
    console.log(data);
    //clear out old content
    recipeContainerEl.textContent="";
    foodInputEl.value="";

    for (i=0; i<data.length;i++) {

        var recipeCardDisplay = document.createElement("div");
        recipeCardDisplay.id = i+1;
        //var recipeCardDisplay = document.querySelector("#recipe-container");




        //console.log("This loop is working");
        // image element
        var recipeImage = data[i].image;
        //console.log(recipeImage);
        var recipeImageDivEl=document.createElement("div");
        recipeImageDivEl.className="card-image";
        var recipeImageEl=document.createElement("img");
        recipeImageEl.setAttribute("src", recipeImage);
        //recipeImageEl.className="image is-1by1"; // <--className here
        recipeCardDisplay.appendChild(recipeImageEl);

        // name element
        var recipeName=data[i].title;
        //console.log(recipeName);
        var recipeCard=document.createElement ("div");
        recipeCard.className="content";
        var recipeNameEl=document.createElement ("div");
        recipeNameEl.textContent="Recipe Name: "+recipeName;
        recipeNameEl.className="title is-5";  // <--className here
        recipeCardDisplay.appendChild(recipeNameEl);

        // ul div created for il's of ingredients
        var recipeULDiv=document.createElement ("div");
        recipeULDiv.className="content";
        var recipeUl=document.createElement("div");
        recipeUl.className="content"; // <--className here for ul
        recipeUl.textContent= "Ingredients:";
        recipeCardDisplay.appendChild(recipeUl);

        recipeContainerEl.appendChild(recipeCardDisplay);

        for (x=0; x<data[i].usedIngredients.length;x++) {
            console.log ("this is MF'in working");
            var usedIngName = data[i].usedIngredients[x].original;
            var usedIngNameEl = document.createElement("li");
            usedIngNameEl.textContent= usedIngName;
            usedIngNameEl.className="li has-background-warning"; // <-- className here
            recipeUl.appendChild(usedIngNameEl);
        } 
        //console.log(food[i].missedIngredients)
        for (x=0; x<data[i].missedIngredients.length; x++) {
            //console.log("this is working");
            // missed incredient loop( I believe this is unentered ingredients)
            //console.log(food[i].missedIngredients[x].name);
            var missedIngNam = data[i].missedIngredients[x].original;
            //console.log(missedIngNam);
            var missedIngNamEl =document.createElement("li");
            missedIngNamEl.textContent= missedIngNam;
            missedIngNamEl.classname="li"; // <-- className here
            recipeUl.appendChild(missedIngNamEl);
        }
    }





    };
//put into local storage
var saved = function(storedFood) {

    var oldFood = JSON.parse(localStorage.getItem("foodItems")) || [];
    if (oldFood.includes(storedFood)===false){
        oldFood.unshift(storedFood)
        localStorage.setItem("foodItems", JSON.stringify(oldFood));
    }

    console.log(oldFood);
}
// load from local storage into button
var loadFood = function () {
    foodHistoryContainerEl.innerHTML="";
    foodArr = JSON.parse(localStorage.getItem("foodItems")) || [];
    console.log(foodArr);
        for (i=0; i <foodArr.length; i++) {
            var eachFood = foodArr[i];
            console.log(eachFood);
            if(eachFood != undefined){
                foodButtons(eachFood);
            }
        }
}
// creates buttons
var foodButtons = function(newEachFood) {
    console.log("It's populating the buttons");
    var fdBtn = document.createElement("button");
    fdBtn.innerHTML=newEachFood;
    console.log(newEachFood);
    foodHistoryContainerEl.appendChild(fdBtn);
    fdBtn.className = "button is-warning is-medium" // <----- needs className
    fdBtn.setAttribute("id","foodButton");
    fdBtn.onclick=clickAnswer;
}
// click event to put button value back into search
function clickAnswer(e) {
    e.preventDefault;
    var clickedFood=e.target;
    console.log(clickedFood.textContent);
    console.log("this button is working");
    console.log(clickedFood);
    getRecipes(clickedFood.textContent)
}

loadFood()

userFormEl.addEventListener("submit", formSubmitHandler);

