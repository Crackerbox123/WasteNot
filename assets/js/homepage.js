// Variables
var userFormEl = document.querySelector("#search-form");
var foodHistoryContainerEl = document.querySelector("#historyContainer");

var recipeContainerEl = document.querySelector("#recipe-container");
// API function pull data from Spoonacular - Search Ingredient Facts
var foodInputEl = document.querySelector("#plant");
var drinkContainerEl = document.querySelector("#drink-container");

console.log(drinkContainerEl);

var clearHistoryEl = document.querySelector("#clear-history");
console.log(foodInputEl)

var modal = document.getElementById("modal-js-food");
var modalConnection =  document.getElementById("modal-js-connection");
var close = document.getElementsByClassName('modal-close')[0];

// Fetch API
var getRecipes = function(searchRecipe) {
    
    //console.log(searchRecipe);
    var apiUrl = 'https://api.spoonacular.com/recipes/findByIngredients?ingredients=' + searchRecipe + '&apiKey=66ddd5de554b45bc946bc6143c86952d';
    fetch(apiUrl).then(function(response){
    if(response.ok) {
        response.json().then(function(data) {
       console.log(data);
       displayRecipe(data);
       saved(searchRecipe);
       loadFood();
    });
    } else {
        //alert('Food item not found.');
        
            foodModal();
            console.log("food isn't found");
        
    }
})
    .catch(function(error) {
        //alert("Unable to connect to Spoonacular");
        connectionModal();
    });      

};

var getDrinkId = function(food) {
    console.log(food);
    var apiCocktailUrl ='https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=' + food;
    fetch(apiCocktailUrl).then(function(response) {
       
        if(response.ok) {
          response.json().then(function(data) {
            for  (var i=0; i<data.drinks.length; i++) {
                 var drinkID= data.drinks[i].idDrink;
                fullCktailDet(drinkID);
            }; 
            
        });  
        } else {
            //alert("Error: Food not found");
            foodModal();
        }
        
    })
    .catch(function(error) {
        //alert("Unable to connect");
        connectionModal();
   });
};

var fullCktailDet = function (id) {
    var apiDetailsCocktailUrl = 'https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=' + id;
    fetch(apiDetailsCocktailUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
              displayDrinkRecipe(data);
            });  
        } else {
            //alert("Error: Food not found");
            foodModal();
        }
        
    })
    .catch(function(error) {
        //alert("Unable to connect"); 
        connectionModal(); 
    });
};


// Form Submit Handler Logic
var formSubmitHandler = function(event) {
    event.preventDefault();
    //get value from input element
    var food = foodInputEl.value.trim();
    if (food) {
        getRecipes(food);
        getDrinkId(food);
        //getIngredient(food);
        //saved(food);
    } else {
        //alert("Please enter a food");
        console.log("food isn't found");
        
            foodModal();
            
    }
};

//modal functions
var foodModal = function() {
    modal.style.display= "block";
      
};

close.onclick = function() {
    modal.style.display = "none";
};


window.onclick=function(event) {
    if(event.target.className == 'modal-background') {
        modal.style.display = 'none'
    }
};

var connectionModal= function () {
    modal.style.display="block";
};

// Spoonacular function call

var displayDrinkRecipe = function(data) {

    // clear old content
    drinkContainerEl.textContent = "";
    
    // display info
    for (i = 0; i<data.drinks.length; i++) {
       console.log("display drink loop is working");

       var drinkCardDisplay = document.createElement("div");
        drinkCardDisplay.id = i+1;
       
         //  display jpg
         var drinkItemImage = data.drinks[i].strDrinkThumb;
         var drinkItemImageEl = document.createElement("img");
         drinkItemImageEl.setAttribute("src", drinkItemImage);// <----I don't know if the image needs class
         drinkCardDisplay.appendChild(drinkItemImageEl);

         // display name
         var drinkItemName = data.drinks[i].strDrink;
         console.log(drinkItemName);
         var drinkItemNameEl = document.createElement("h2");
         drinkItemNameEl.innerHTML = "Name: "+drinkItemName;
         drinkItemImageEl.className = ""  // <--- Classname here
         drinkCardDisplay.appendChild(drinkItemNameEl);

         //display instructions
        var drinkIngredientStringUl=document.createElement('ul');
        drinkCardDisplay.appendChild(drinkIngredientStringUl);

         var drinkInstructions=data.drinks[i].strInstructions;
         var drinkInstructionsEl=document.createElement("li");
         //console.log(drinkInstructions);
         drinkInstructionsEl.className = "" // <-- Classname here
         drinkInstructionsEl.innerHTML = drinkInstructions;
         drinkCardDisplay.appendChild(drinkInstructionsEl);

        

        drinkContainerEl.appendChild(drinkCardDisplay);
         //display ingredients 
            for (x=0; x<16; x++) {
                if (data.drinks[i][`strMeasure${x}`] != null) {
                    var drinkMeasureStringEl=document.createElement("li");
                    console.log(data.drinks[i][`strMeasure${x}`]);
                    drinkMeasureStringEl.className = "" //< ----classname
                    drinkMeasureStringEl.innerHTML = data.drinks[i][`strMeasure${x}`] +": ";
                    drinkIngredientStringUl.appendChild(drinkMeasureStringEl);
            };      

                if (data.drinks[i][`strIngredient${x}`] != null) {
                    var drinkIngredientStringEl=document.createElement("li");
                    console.log(data.drinks[i][`strIngredient${x}`]);
                    drinkIngredientStringEl.className = "" //< ----classname
                    drinkIngredientStringEl.innerHTML = data.drinks[i][`strIngredient${x}`];
                    drinkIngredientStringUl.appendChild(drinkIngredientStringEl);
                }
    };  
};
};

var displayRecipe = function(data) {
    //clear out old content
    recipeContainerEl.textContent="";
    foodInputEl.value="";

    for (i=0; i<data.length;i++) {

        var recipeCardDisplay = document.createElement("div");
        recipeCardDisplay.id = i+1;
        //var recipeCardDisplay = document.querySelector("#recipe-container");

        // image element
        var recipeImage = data[i].image;
        var recipeImageDivEl=document.createElement("div");
        recipeImageDivEl.className="card-image";
        var recipeImageEl=document.createElement("img");
        recipeImageEl.setAttribute("src", recipeImage);
        //recipeImageEl.className="image is-1by1"; // <--className here
        recipeCardDisplay.appendChild(recipeImageEl);

        // name element
        var recipeName=data[i].title;
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
        for (x=0; x<data[i].missedIngredients.length; x++) {
            var missedIngNam = data[i].missedIngredients[x].original;
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

}
// load from local storage into button
var loadFood = function () {
    foodHistoryContainerEl.innerHTML="";
    foodArr = JSON.parse(localStorage.getItem("foodItems")) || [];
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

    var fdBtn = document.createElement("button");
    fdBtn.innerHTML=newEachFood;
    foodHistoryContainerEl.appendChild(fdBtn);
    fdBtn.className = "button is-warning is-medium" // <----- needs className
    fdBtn.setAttribute("id","foodButton");
    fdBtn.onclick=clickAnswer;
}
// click event to put button value back into search
function clickAnswer(e) {
    e.preventDefault;
    var clickedFood=e.target;
    getRecipes(clickedFood.textContent)
    getDrinkId(clickedFood.textContent)
}


// clear search historu
var clearHistory = function() {

    localStorage.clear();

    loadFood();

};


loadFood()

userFormEl.addEventListener("submit", formSubmitHandler);

clearHistoryEl.addEventListener("click", clearHistory);
