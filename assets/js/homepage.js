// Variables
var userFormEl = document.querySelector("#search-form");
var foodHistoryContainerEl = document.querySelector("#historyContainer");
//console.log(foodHistoryContainerEl);
var recipeContainerEl = document.querySelector("#recipe-container");
// API function pull data from Spoonacular - Search Ingredient Facts
//var searchFood = "banana"
var foodInputEl = document.querySelector("#plant");
var drinkContainerEl = document.querySelector("#drink-container");
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

var getDrinkId = function(food) {
    console.log("The drunk function is working");
    console.log(food);
    var apiCocktailUrl = "https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i="+food;
    fetch(apiCocktailUrl).then(function(response) {
       
        if(response.ok) {
          response.json().then(function(data) {
            console.log(data);
            console.log(data.drinks.length);
            for  (var i=0; i<data.drinks.length; i++) {
                 console.log("this if mf'er is working");
                 var drinkID= data.drinks[i].idDrink;
                 console.log(drinkID);
                fullCktailDet(drinkID);
            }; 
            
        });  
        } else {
            alert("Error: Food not found");
        }
        
    })
    .catch(function(error) {
        alert("Unable to connect");
   });
};

var fullCktailDet = function (id) {
    console.log("why am I being sent to another f'in fetch function?");
    console.log(id);
    var apiDetailsCocktailUrl = "https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i="+id;
    fetch(apiDetailsCocktailUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
              console.log(data);
              displayDrinkRecipe(data);
            });  
        } else {
            alert("Error: Food not found");
        }
        
    })
    .catch(function(error) {
        alert("Unable to connect");  
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
        getDrinkId(food);
        //getIngredient(food);
        //saved(food);
    } else {
        alert("Please enter a food");
    }
};


// Spoonacular function call

var displayDrinkRecipe = function(data) {
    console.log(data);
    console.log("displaydrinkrecipe is working");

    // clear old content
    //ingredientContainerEl.textContent = "";
    
    // display info
    for (i = 0; i<data.drinks.length; i++) {
       console.log("display drink loop is working");

         //  display jpg
         var drinkItemImage = data.drinks[i].strDrinkThumb;
         var drinkItemImageEl = document.createElement("img");
         drinkItemImageEl.setAttribute("src", drinkItemImage);
         drinkContainerEl.appendChild(drinkItemImageEl);

         // display name
         var drinkItemName = data.drinks[i].strDrink;
         console.log(drinkItemName);
         var drinkItemNameEl = document.createElement("h2");
         drinkItemNameEl.innerHTML = "Name: "+drinkItemName;
         drinkContainerEl.appendChild(drinkItemNameEl);

         //display ingredients
        //  var ingredient = "strIngredient"+i
        //  if (i=0;ingredient!=null,i++) { 
            
        //  }
    };
    
};



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

    //console.log(oldFood);
}
// load from local storage into button
var loadFood = function () {
    foodHistoryContainerEl.innerHTML="";
    foodArr = JSON.parse(localStorage.getItem("foodItems")) || [];
    //console.log(foodArr);
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
    //console.log("It's populating the buttons");
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
    getDrinkId(clickedFood.textContent)
}

loadFood()

userFormEl.addEventListener("submit", formSubmitHandler);

