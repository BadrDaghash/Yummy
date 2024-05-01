//! Nav section 
let Category = document.querySelector("#Category");
let rowCategory = document.getElementById("rowCategory");
let area = document.querySelector("#area");
let recipes = document.querySelector("#recipes");
let result;
let resultA;
//* loader 
$(window).ready(function(){
   $(".lds-roller").fadeOut(200,function(){
      $("#loading").remove();
      $("body").css({overflow:"auto"})
   })
})

//* NAVBAR 
let isMenuOpen = false;
function openMenu() {
   $(".menu").animate({ left: "0" }, 1000);
   $(".first").removeClass("d-block").addClass("d-none");
   $(".second").removeClass("d-none").addClass("d-block");
   isMenuOpen = true;
   console.log("Opening menu...");
}
function closeMenu() {
   $(".menu").animate({ left: "-220px" }, 1000);
   $(".first").removeClass("d-none").addClass("d-block");
   $(".second").removeClass("d-block").addClass("d-none");
   isMenuOpen = false;
   console.log("Closing menu...");
}
$(".menu-icon i").click(function () {
   console.log("Menu icon clicked!");
   if (isMenuOpen) {
      closeMenu();
   } else {
      openMenu();
   }
});
// * search section
$("#search").click(async function (event) {
   event.preventDefault();
   $("#searchInputs").toggleClass("d-none");
   const searchValue = document.getElementById('searchName').value.trim();
   getRecipesSearch(searchValue)
   closeMenu()
   $("#searchInputs").addClass("d-block").removeClass("d-none");
   $("#searchCon").removeClass("d-none");
   $("#resultRow").addClass("d-none");
   $("#rowContact").addClass("d-none");
});

document.getElementById('searchName').addEventListener('keyup', function (event) {
   searchMealByName();
   $(".searchRes").removeClass("d-none");
});
document.getElementById('searchLetter').addEventListener('keyup', function (event) {
   searchMealByFirstLetter();
   $(".searchRes").removeClass("d-none");
});
//! search name funtions  
async function searchMealByName() {
   const searchValue = document.getElementById('searchName').value.trim();
   const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`);
   const data = await response.json();
   displayMeals(data.meals);
   console.log(data);
   $("#rowContact").addClass("d-none");

}
searchMealByFirstLetter()
//! search letter funtions
async function searchMealByFirstLetter() {

   const searchValue = document.getElementById('searchLetter').value.trim();
   const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchValue}`);
   const data = await response.json();
   console.log(data);
   displayMeals(data.meals);
   $("#rowContact").addClass("d-none");

}
searchMealByName()
function displayMeals(meals) {
   let cartona = ``;
   if (meals) {
      meals.forEach(meal => {
         cartona += `  
           <div class="inner col-md-3 py-5 ">
               <div class="Categories rounded-4 overflow-hidden clicked-div">
                   <img src="${meal.strMealThumb}" class="w-100 category-img" alt="image" data-category="${meal.strMeal}">
                   <div class="cat-layer d-flex flex-column text-center text-black">
                       <h3 style="font-size: 1.75rem; font-weight: 500; line-height: 1.2;">${meal.strMeal}</h3>
                   </div>
               </div>
           </div>`;
      });
   }
   document.getElementById("searchResult").innerHTML = cartona;
   let clickedDivs = document.querySelectorAll(".clicked-div");
   clickedDivs.forEach(div => {
      div.addEventListener("click", async function () {
         const searchValue = this.querySelector('.category-img').getAttribute("data-category");
         getRecipesSearch(searchValue);

      });
   });
}
async function getRecipesSearch(searchValue) {
   if (searchValue !== "") {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`);
      const data = await response.json();
      if (data.meals) {
         displayRecipesSearch(data.meals);
      }
   }
}
getRecipesSearch()
//! search Display (e) 
function displayRecipesSearch(Array) {
   let cartona = ` `;
   for (let i = 0; i < Array.length; i++) {
      let ingredients = '';
      for (let j = 1; j <= 20; j++) {
         if (Array[i][`strIngredient${j}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${Array[i][`strMeasure${j}`]} ${Array[i][`strIngredient${j}`]}</li>`
         }
      }
      let tags = Array[i].strTags?.split(",") || [];
      let tagsStr = '';
      for (let j = 0; j < tags.length; j++) {
         tagsStr += `<li class="alert alert-danger m-2 p-1">${tags[j]}</li>`;
      }
      cartona += `
           <div class="left col-md-4">
               <img src="${Array[i].strMealThumb}" class="w-100 rounded-3 " alt="">
               <h2 class="text-white " style="font-weight: 500;">${Array[i].strMeal}</h2>
           </div>
           <div class="right col-md-8 text-white" style="line-height: 1.2;">
               <h2>Instructions</h2>
               <p>${Array[i].strInstructions}</p>
               <h3><span class="fw-bolder">Area :</span> ${Array[i].strArea}</h3>
               <h3><span class="fw-bolder">Category :</span> ${Array[i].strCategory}</h3>
               <h3>Recipes :</h3>
               <ul class="list-unstyled d-flex g-3 flex-wrap">
                   ${ingredients}
               </ul>
               <h3>Tags :</h3>
               <ul class="list-unstyled d-flex g-3 flex-wrap">
                   ${tagsStr}
               </ul>
               <a href="${Array[i].strSource} " class="btn btn-success">Source</a>
               <a href="${Array[i].strYoutube} " class="btn btn-danger">Youtube</a>
           </div>`;
   }
   document.getElementById("searchResult").innerHTML = cartona;
   $("#searchInputs").addClass("d-none")
}
//! Category link 
$("#Category").click(async function (event) {
   event.preventDefault();
   let result = await categoryApi();
   displayCategApi(result);
   $("#rowCategory").fadeIn(300);
   closeMenu()
   $("#rowContact").addClass("d-none");
   $("#searchCon").addClass("d-none");
   $("#resultRow").removeClass("d-none");
});
// ! Area Link 
$("#area").click(async function (event) {
   event.preventDefault();
   let result = await areaApi()
   displayArea(result);
   $("#resultRow").fadeIn(300)
   closeMenu()
   $("#rowContact").addClass("d-none");
   $("#searchCon").addClass("d-none");
   $("#resultRow").removeClass("d-none");
})

//! recipes  link
$("#recipes").click(async function (event) {
   event.preventDefault();
   let result = await getAllIngredients()
   displayIngredients(result)
   console.log(result);
   $("#resultRow").fadeIn(300)
   closeMenu()
   $("#rowContact").addClass("d-none");
   $("#searchCon").addClass("d-none");
   $("#resultRow").removeClass("d-none");
})
// !  category first api
async function categoryApi() {
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
   let data = await response.json();
   console.log(data);
   return data.categories;
}
//! area first api 
async function areaApi() {
   let response = await fetch(` https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
   let data = await response.json();
   console.log(data);
   closeMenu()
   return data.meals
}
//! recipes first api 
async function getAllIngredients() {
   let data = await fetch(` https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
   let res = await data.json();
   let Ingredient = res.meals;
   console.log(Ingredient);
   $("#searchCon").addClass("d-none");
   closeMenu()
   displayIngredients(res.meals.slice(0, 25));
 }
//! display category one
function displayCategApi(result) {
   let cartona = ``;
   for (let i = 0; i < result.length; i++) {
      cartona += `  
      <div class="inner col-md-3 py-5 pt-3">
         <div class="Categories  rounded-4 overflow-hidden category-img " data-category="${result[i].strCategory}">
             <img src="${result[i].strCategoryThumb}" class="w-100 " alt="image">
             <div class="cat-layer d-flex flex-column  text-center text-black">
                 <h3 style="font-size: 1.75rem;font-weight: 500;line-height: 1.2;">${result[i].strCategory}</h3>
                 <p style="overflow: hidden">${result[i].strCategoryDescription} </p>
             </div>
         </div>
      </div>`;
   }
   document.getElementById("resultRow").innerHTML = cartona;
   let categoryImages = document.querySelectorAll(".category-img");
   categoryImages.forEach(img => {
      img.addEventListener("click", async function () {
         let category = this.getAttribute("data-category");
         if (category) {
            await getCategoryMeals(category);
         
         }
      });
   });
}
//! display area one
function displayArea(result) {
   let cartona = ``;
   for (let i = 0; i < result.length; i++) {
      cartona += ` <div class="inner col-md-3 pt-3 text-center text-white areaLayer" data-area="${result[i].strArea}">
      <i class="fa-solid fa-house-laptop fa-4x "></i>
      <h3 style="font-weight: 500;font-size: 1.75rem;line-height: 1.2;">${result[i].strArea}</h3>
   </div>`
   }
   document.getElementById("resultRow").innerHTML = cartona;
   let areaLayers = document.querySelectorAll(".areaLayer");
   areaLayers.forEach(layer => {
      layer.addEventListener("click", async function () {
         let area = this.getAttribute("data-area");
         if (area) {
            await getAreaMeals(area);
         }
      });
   });
}

//!  display recipes one
function displayIngredients(Ingredient) {
   let cartona = ``;
   for (let i = 0; i < Ingredient.length; i++) {
     cartona += ` <div class="col-md-3 pt-3 text-center text-white dataMeal">
     <i class="fa-solid fa-drumstick-bite fa-4x"></i>
     <h3>${Ingredient[i].strIngredient}</h3>
     <p>${Ingredient[i].strDescription.split(" ").slice(0, 15).join(" ")}</p>
   </div>
     `;
   }
   document.getElementById("resultRow").innerHTML = cartona;
   let dataMeal = document.querySelectorAll(".dataMeal");
   for (let i = 0; i < dataMeal.length; i++) {
     dataMeal[i].addEventListener("click", async function (e) {
       let areadata = Ingredient[i].strIngredient;
       console.log(areadata);
 
       await getAllIngredientsMeals(areadata);
     });
   }
 }
 
// ! category clicked 
async function getCategoryMeals(category) {
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
   response = await response.json();
   console.log(response);
   displayCategoryMeals(response.meals);

}
//! Area clicked 
async function getAreaMeals(area) {
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
   let data = await response.json();
   console.log(data);
   displayAreaMeals(data.meals);
}
//! recipe clicked
async function getAllIngredientsMeals(Ingredientsea) {
   let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredientsea}`);
   let res = await data.json();
   let final = res.meals;
   console.log(final);
   displayingredientsMeals(final);
 }
// ! display category clicked 
function displayCategoryMeals(meals) {
   let cartona = ``;
   for (let i = 0; i < meals.length; i++) {
      cartona += `  
           <div class="inner col-md-3 py-5 pt-3" >
               <div class="Categories  rounded-4 overflow-hidden " data-meal="${meals[i].idMeal}">
                   <img src="${meals[i].strMealThumb}" class="w-100 " alt="image" >
                   <div class="cat-layer d-flex flex-column  text-center text-black">
                       <h3 style="font-size: 1.75rem;font-weight: 500;line-height: 1.2;">${meals[i].strMeal}</h3>
                   </div>
               </div>
           </div>`;
   }
   document.getElementById("resultRow").innerHTML = cartona;
   let mealImages = document.querySelectorAll("[data-meal]");
   mealImages.forEach(img => {
      img.addEventListener("click", async function () {
         let mealId = this.getAttribute("data-meal");
         if (mealId) {
            let category = await getCategoryInstructions(mealId);

            displayCategoryInst(category);
         }
      });
   });
}
//! display area clicked 
function displayAreaMeals(meals) {
   let cartona = ` `
   for (let i = 0; i < meals.length; i++) {
      cartona += `  
              <div class="inner col-md-3 py-5 pt-3">
                  <div class="Categories  rounded-4 overflow-hidden " data-meal="${meals[i].idMeal}">
                      <img src="${meals[i].strMealThumb}" class="w-100 " alt="image" >
                      <div class="cat-layer d-flex flex-column  text-center text-black">
                          <h3 style="font-size: 1.75rem;font-weight: 500;line-height: 1.2;">${meals[i].strMeal}</h3>
                      </div>
                  </div>
              </div>`;
   }

   document.getElementById("resultRow").innerHTML = cartona;
   let mealImages = document.querySelectorAll("[data-meal]")
   mealImages.forEach(img => {
      img.addEventListener("click", async function () {
         let mealID = this.getAttribute("data-meal");
         if (mealID) {
            let Area = await getCategoryInstructions(mealID)
            displayCategoryInst(Area)

         }
      })
   })
}
//! display recipes
 function displayingredientsMeals(meals) {
   let cartona = ``;
   for (let i = 0; i < meals.length; i++) {
     cartona += `
         <div class="col-md-3 py-5 dataMeal pt-3 " data-meal = ${meals[i].idMeal}>
           <div class="Categories  rounded-4 overflow-hidden dataMeal">
             <img src="${meals[i].strMealThumb}" alt="" class="w-100" >
             <div class="cat-layer d-flex flex-column  text-center text-black">
               <h2 >${meals[i].strMeal}</h2>
             </div>
           </div>
         </div>
       `;
   }
   document.getElementById("resultRow").innerHTML = cartona;
   let mealImages = document.querySelectorAll("[data-meal]")
   mealImages.forEach(img => {
      img.addEventListener("click", async function () {
         let mealID = this.getAttribute("data-meal");
         if (mealID) {
            let Area = await getCategoryInstructions(mealID)
            displayCategoryInst(Area)
         }
      })
   })
}
//! category Instructions 
async function getCategoryInstructions(category) {
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${category}`);
   let data = await response.json();
   console.log(data);
   displayCategoryInst(data.meals)
   return data.meals; // Return the first meal since mealId should be unique
}
//! instruction function
function displayCategoryInst(array) {
   let cartona = ``;
   for (let i = 0; i < array.length; i++) {
      let ingredients = '';
      for (let j = 1; j <= 20; j++) {
         if (array[i][`strIngredient${j}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${array[i][`strMeasure${j}`]} ${array[i][`strIngredient${j}`]}</li>`
         }
      }
      let tags = array[i].strTags?.split(",") || [];
      let tagsStr = '';
      for (let j = 0; j < tags.length; j++) {
         tagsStr += `<li class="alert alert-danger m-2 p-1">${tags[j]}</li>`;
      }
      cartona += `
           <div class="left col-md-4 pt-3">
               <img src="${array[i].strMealThumb}" class="w-100 rounded-3 " alt="">
               <h2 class="text-white " style="font-weight: 500;">${array[i].strMeal}</h2>
           </div>
           <div class="right col-md-8 text-white pt-3" style="line-height: 1.2;">
               <h2>Instructions</h2>
               <p>${array[i].strInstructions}</p>
               <h3><span class="fw-bolder">Area :</span> ${array[i].strArea}</h3>
               <h3><span class="fw-bolder">Category :</span> ${array[i].strCategory}</h3>
               <h3>Recipes :</h3>
               <ul class="list-unstyled d-flex g-3 flex-wrap">
                   ${ingredients}
               </ul>
               <h3>Tags :</h3>
               <ul class="list-unstyled d-flex g-3 flex-wrap">
                   ${tagsStr}
               </ul>
               <a href="${array[i].strSource} " class="btn btn-success">Source</a>
               <a href="${array[i].strYoutube} " class="btn btn-danger">Youtube</a>
           </div>`;
   }
   document.getElementById("resultRow").innerHTML = cartona;
   // $("#categoryClicked").addClass("d-none")
}
// ! regex section
$("#Contact").click(function (event) {
   event.preventDefault();
   $("#rowContact").removeClass("d-none");
   $("#rowContact").fadeIn(300)
   closeMenu()
   $("#searchCon").addClass("d-none");
   $("#resultRow").addClass("d-none");
})

let nameInput = document.querySelector("#nameInput")
let emailInput = document.querySelector("#emailInput")
let phoneInput = document.querySelector("#phoneInput")
let ageInput = document.querySelector("#ageInput")
let passwordInput = document.querySelector("#passwordInput")
let repasswordInput = document.querySelector("#repasswordInput")
//! Name Event
document.getElementById("nameInput").addEventListener("input", () => {
   if (nameValidation()) {
      document.querySelector("#nameAlert").classList.replace("d-block", "d-none");
   } else {
      document.querySelector("#nameAlert").classList.replace("d-none", "d-block");
   }
});
function nameValidation() {
   return (/^[a-zA-Z ]+$/.test(nameInput.value))
}
//! Email Event
document.getElementById("emailInput").addEventListener("input", () => {
   if (emailValidation()) {
      document.querySelector("#emailAlert").classList.replace("d-block", "d-none");
   } else {
      document.querySelector("#emailAlert").classList.replace("d-none", "d-block");
   }
});
function emailValidation() {
   return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailInput.value))
}
//! Phone Event
document.getElementById("phoneInput").addEventListener("input", () => {
   if (phoneValidation()) {
      document.querySelector("#phoneAlert").classList.replace("d-block", "d-none");
   } else {
      document.querySelector("#phoneAlert").classList.replace("d-none", "d-block");
   }
})
function phoneValidation() {
   return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phoneInput.value))
}
//! Age Event
document.getElementById("ageInput").addEventListener("input", () => {
   if (ageValidation()) {
      document.querySelector("#ageAlert").classList.replace("d-block", "d-none");
   } else {
      document.querySelector("#ageAlert").classList.replace("d-none", "d-block");
   }
})
function ageValidation() {
   return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(ageInput.value))
}
//! Password Event
document.getElementById("passwordInput").addEventListener("input", () => {
   if (passwordValidation()) {
      document.querySelector("#passwordAlert").classList.replace("d-block", "d-none");

   } else {
      document.querySelector("#passwordAlert").classList.replace("d-none", "d-block");
   }
})
function passwordValidation() {
   return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(passwordInput.value))
}
//! Repassword Event
document.getElementById("repasswordInput").addEventListener("input", () => {
   if (repasswordValidation()) {
      document.querySelector("#repasswordAlert").classList.replace("d-block", "d-none");
   } else {
      document.querySelector("#repasswordAlert").classList.replace("d-none", "d-block");
   }
})
function repasswordValidation() {
   return repasswordInput.value == passwordInput.value
}
//! Submit Update 
function updateSubmitButton() {
   if (nameValidation() && emailValidation() && phoneValidation() && ageValidation() && passwordValidation() && repasswordValidation()) {
      document.querySelector(".submitBtn").removeAttribute("disabled");
   } else {
      document.querySelector(".submitBtn").setAttribute("disabled", true);
   }
}
nameInput.addEventListener("input", updateSubmitButton);
emailInput.addEventListener("input", updateSubmitButton);
phoneInput.addEventListener("input", updateSubmitButton);
ageInput.addEventListener("input", updateSubmitButton);
passwordInput.addEventListener("input", updateSubmitButton);
repasswordInput.addEventListener("input", updateSubmitButton);




