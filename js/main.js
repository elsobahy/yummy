



// close open nav
$(".close").css("display", "none")

$(".open").click(function () {
    $(".close").css("display", "block")
    $(".open").css("display", "none")
    $("li").animate({ "padding": "12px" }, 1000)
    $(".div1").animate({ "width": "250px" }, 500)




})


$(".close").click(function () {
    $(".open").css("display", "block")
    $(".close").css("display", "none")
    $("li").animate({ "padding": "0px" }, 1000)
    $(".div1").animate({ "width": "0px" }, 1000)
})

// showData inFirst section
var arrayofMeals
async function showData() {

    let myresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`)

    var myData = await myresponse.json();
    arrayofMeals=myData
    console.log("myData",arrayofMeals)

    displayMeals()
}
showData()

function displayMeals() {

    let meals = ""
    for (let i = 0; i <arrayofMeals.meals.length; i++) {
        meals += `
        <div class="col-md-6 col-lg-3 my-3 myM  shadow">
            <div onclick="getMeal('${arrayofMeals.meals[i].idMeal}')" class="movie shadow rounded position-relative">
                <div class="post ">
                    <img src='${arrayofMeals.meals[i].strMealThumb}' class="w-100 rounded  position-relative" />
                    <div class="layer  
                     d-flex align-items-center ">
                        <div class="  info p-2">
                        <h2 class="fw-light">${arrayofMeals.meals[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    } document.getElementById("demo").innerHTML = meals
    
}
async function getMeal(mealID) {
    $(".loading-screen").fadeIn(100)
    $(".meals-section").hide(10);
    
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    meal = await meal.json()
    displayMeal(meal.meals[0])
    $(".loading-screen").fadeOut(500)
    
}
//  discreption of meals

function displayMeal(meal) {
    let recipes = ""
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            recipes += `<li class="my-3 mx-1 p-1 alert-success rounded">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",") 
    let tagsStr = "" 
    for (let i = 0; i < tags?.length; i++) { 
        tagsStr += `<li class="my-3 mx-1 p-1 alert-danger rounded">${tags[i]}</li>`
    } 

    let str = `
    <div class="col-md-4 myM text-white">
					<img class="w-100" src="${meal.strMealThumb}" alt=""
						srcset=""><br>
					<h1>${meal.strMeal}</h1>
				</div>
				<div class="col-md-8 myM text-white text-left">
					<h2>Instructions</h2>
					<p>${meal.strInstructions}</p>
					<p><b class="fw-bolder">Area :</b> ${meal.strArea}</p>
					<p><b class="fw-bolder">Category :</b> ${meal.strCategory}</p>
					<h3>Recipes :</h3>
					<ul class="d-flex " id="recipes">
					</ul>

					<h3 class="my-2 mx-1 p-1">Tags :</h3>
					<ul class="d-flex " id="tags">
					</ul>

					
					<a class="btn btn-success text-white" target="_blank" href="${meal.strSource}">Source</a>
					<a class="btn youtube text-white" target="_blank" href="${meal.strYoutube}">Youtub</a>
				</div>`
                console.log("str",str)
document.getElementById("myRow").innerHTML =str
    document.getElementById("recipes").innerHTML = recipes
    document.getElementById("tags").innerHTML = tagsStr
  

}

// search
var arrayofSearch=[]
async function search(q) {
console.log("qqq",q)
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`)
    meals = await meals.json()
    arrayofSearch=meals
   
    searchByName()

    
}

function searchByName() {
    var meals = ""
    for (var i = 0; i < arrayofSearch.meals.length; i++) {
       
            meals += `
            <div class="col-md-6 col-lg-3 my-3 myM  shadow">
            <div onclick="getMeal('${arrayofSearch.meals[i].idMeal}')" class="movie shadow rounded position-relative">
                <div class="post ">
                    <img src='${arrayofSearch.meals[i].strMealThumb}' class="w-100 rounded position-relative" />
                    <div class="layer 
                     d-flex align-items-center ">
                        <div class="  info p-2">
                        <h2 class="fw-light">${arrayofSearch.meals[i].strMeal}</h2>

                        </div>
                    </div>
                </div>
            </div>
        </div>`
        } document.getElementById("section-search").innerHTML = meals
    }







// category
var arrayOfCategory = []

async function getCategories() {
    var myresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    myresponse = await myresponse.json()
    arrayOfCategory = myresponse
    console.log("arrayOfCategory", arrayOfCategory)
    displayCategories()
}
getCategories()

function displayCategories() {
    
    let category = ""
    for (var i = 0; i < arrayOfCategory.categories.length; i++) {
        category += `
    <div class="col-md-6 col-lg-3 my-3 myM    ">
    <div class="movie  shadow  rounded position-relative">
    <div onclick="filterByCategory('${arrayOfCategory.categories[i].strCategory}')" class="post">
    
            
    <img src='${arrayOfCategory.categories[i].strCategoryThumb}' class="w-100 rounded " >
    <div class="layer d-flex align-items-center ">
    <div class="info p-2">
    <h2 class="fw-light">${arrayOfCategory.categories[i].strCategory}</h2>
    <p class="  text-black p11">${arrayOfCategory.categories[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
</div>
         </div>   
        </div>
            
             </div> 
               </div>        
                       
       
    `
    }
    document.getElementById("categ").innerHTML = category


}

async function filterByCategory(category) {
    $(".loading-container").fadeIn(100)
    $("#categ").hide(10);
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    meals = await meals.json()
    arrayOfCategory=meals
    displayMealsCategory(arrayOfCategory.meals)  
    console.log("asmaa",arrayOfCategory.meals)
    $(".loading-container").fadeOut(500)
}



function displayMealsCategory(arrayOfCategory) {

    let meals = ""
    for (let i = 0; i <arrayOfCategory.length; i++) {
        meals += `
        <div class="col-md-6 col-lg-3 my-3 myM  shadow">
            <div onclick=" getMeal('${arrayOfCategory[i].idMeal}')" class="movie shadow rounded position-relative">
                <div class="post ">
                    <img src='${arrayOfCategory[i].strMealThumb}' class="w-100 rounded  position-relative" />
                    <div class="layer  
                     d-flex align-items-center ">
                        <div class="  info p-2">
                        <h2 class="fw-light">${arrayOfCategory[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    } document.getElementById("asmaa").innerHTML = meals
    
}


// area
var arrayofArea = []
async function Area() {
    $(".loading-screen").fadeIn(500)
    var x = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    x = await x.json()
    arrayofArea = x
    console.log("area", arrayofArea)
    displayArea()
    
    $(".loading-screen").fadeOut(500)

}
Area()
function displayArea() {
    let area = ""
    for (var i = 0; i < arrayofArea.meals.length; i++) {
console.log(arrayofArea.meals.length)
        area += `
    <div class="col-md-6 col-lg-3 my-3 myM  shadow">
        <div class="movie shadow rounded position-relative text-center">
            <div onclick=(filterByArea('${arrayofArea.meals[i].strArea}')) class="post ">
                <i class="fa-solid fa-city fa-3x"></i>
                <h3 class="text-white fw-light">${arrayofArea.meals[i].strArea}</h3>
            </div>
        </div>
    </div>` 
    }
    document.getElementById("areaaa").innerHTML = area

}



async function filterByArea(area) {
    $(".loading-container").fadeIn(100)
    $("#areaaa").hide(10);
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    meals = await meals.json()
    displayMealsCategory(meals.meals)
    console.log("displayMeals(meals.meals.slice(0, 20))", meals.meals )
    $(".loading-container").fadeOut(500)
}


// Ingredients
var ingredientt=[]
async function Ingredients() {
    x = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    x = await x.json()
    ingredientt=x
    displayIngredients()
    console.log("integ",ingredientt)



}
Ingredients()
function displayIngredients() {
    let ingredients = ""
    for (var i = 0; i < ingredientt.meals.length-550; i++) {
        ingredients += `
    <div class="col-md-6 col-lg-3 my-3 myM  shadow">
        <div onclick="getMainIngredient('${ingredientt.meals[i].strIngredient}')" class="movie shadow rounded position-relative">
            <div class="post text-center">
                <i class="fa-solid fa-bowl-food fa-3x"></i>
                <h2 class="text-white fw-light">${ingredientt.meals[i].strIngredient}</h2>
                <p class="text-white">${ingredientt.meals[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
        </div>
    </div>`
    }
    document.getElementById("integ").innerHTML = ingredients
    
}
async function getMainIngredient(mealName) {
    $(".loading-screen").fadeIn(100)
    $("#integ").hide(10);
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealName}`)
    meal = await meal.json()
    displayMealsCategory(meal.meals) 
    $(".loading-screen").fadeOut(500)
}










// contact nav
$("#contactUs").click(function () {
    
            $("#contact").css("display", "block")
        $("#asmaa").css("display", "none")
            $(".meals-section").css("display", "none")
            $("#myRow").css("display", "none")
            $("#integ").css("display", "none")
            $("#areaaa").css("display", "none")
            $("#categ").css("display", "none")
            $("#sear").css("display", "none")
            $("#demo").css("display", "none")
        })
  
        // ingredient  nav  
$("#ingredient").click(function () {
  
            $("#integ").css("display", "flex")
            
            
            $("#myRow").css("display", "none")
            $("#areaaa").css("display", "none")
            $("#categ").css("display", "none")
            $("#sear").css("display", "none")
            $("#contact").css("display", "none")
            $("#demo").css("display", "none")

        })
 
        // area nav
$("#area").click(function () {
   
            $("#areaaa").css("display", "flex")
          
            $("#myRow").css("display", "none")
            $("#categ").css("display", "none")
            $("#sear").css("display", "none")
            $("#integ").css("display", "none")
            $("#contact").css("display", "none")
            $("#demo").css("display", "none")

        })
 
        // category nav
$("#category").click(function () {
   
    $("#categ").css("display", "flex")
    
    $("#myRow").css("display", "none")
    $("#sear").css("display", "none")
    $("#areaaa").css("display", "none")
    $("#integ").css("display", "none")
    $("#contact").css("display", "none")
    $("#demo").css("display", "none")


})
       // search nav
$("#search").click(function () {
   
    $("#sear").css("display", "block")
    $("#asmaa").css("display", "none")
    $(".meals-section").css("display", "none")
    $("#myRow").css("display", "none")
    $("#areaaa").css("display", "none")
    $("#integ").css("display", "none")
    $("#contact").css("display", "none")
    $("#demo").css("display", "none")
    $("#categ").css("display", "none")
})



// loading-screen 

$(document).ready(function () {
    $(".loading-screen ").fadeOut(1500)
})
// validation

var userName = document.getElementById("name")
var userEmail = document.getElementById("email")
var userPhone = document.getElementById("phone")
var userAge = document.getElementById("age")
var userPassword = document.getElementById("password")
var userRePassword = document.getElementById("repassword")
var userNameAlert = document.getElementById("userNameAlert")
var UseremailAlert = document.getElementById("UseremailAlert")
var UserPhoneAlert = document.getElementById("UserPhoneAlert")
var UserAgeAlert = document.getElementById("UserAgeAlert")
var UserPassAlert = document.getElementById("UserPassAlert")
var UserRepassAlert = document.getElementById("UserRepassAlert")
console.log(userName)
userName.addEventListener('keyup', function () {
    var regexName = /^[a-zA-Z]{4}$/
    console.log("regexName", regexName.test(userName.value))
    if (regexName.test(userName.value) == true) {
        userName.classList.add("is-valid")
        userName.classList.remove("is-invalid")
        userNameAlert.classList.replace("d-block", "d-none")
        checkDisabeld()


    } else {
        userName.classList.add("is-invalid")
        userName.classList.remove("is-valid")
        userNameAlert.classList.replace("d-none", "d-block")
    }
    
    
})
userEmail.addEventListener('keyup', function () {
    var regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (regexEmail.test(userEmail.value) == true) {
        userEmail.classList.add("is-valid")
        userEmail.classList.remove("is-invalid")
        UseremailAlert.classList.replace("d-block", "d-none")
        
    checkDisabeld()
    } else {
        userEmail.classList.add("is-invalid")
        userEmail.classList.remove("is-valid")
        UseremailAlert.classList.replace("d-none", "d-block")
    }
    
})
userPhone.addEventListener('keyup', function () {
    var regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

    if (regexPhone.test(userPhone.value) == true) {
        userPhone.classList.add("is-valid")
        userPhone.classList.remove("is-invalid")
        UserPhoneAlert.classList.replace("d-block", "d-none")
        checkDisabeld()
    } else {
        userPhone.classList.add("is-invalid")
        userPhone.classList.remove("is-valid")
        UserPhoneAlert.classList.replace("d-none", "d-block")
    }
    
   
})

userAge.addEventListener('keyup', function () {
    var regexAge = /^[1-9][0-9]?$|^100$/

    if (regexAge.test(userAge.value) == true) {
        userAge.classList.add("is-valid")
        userAge.classList.remove("is-invalid")
        UserAgeAlert.classList.replace("d-block", "d-none")
        checkDisabeld()
    } else {
        userAge.classList.add("is-invalid")
        userAge.classList.remove("is-valid")
        UserAgeAlert.classList.replace("d-none", "d-block")

    }
    
    
})

var regexPassword
userPassword.addEventListener('keyup', function () {
    regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    if (regexPassword.test(userPassword.value) == true) {
        userPassword.classList.add("is-valid")
        userPassword.classList.remove("is-invalid")
        UserPassAlert.classList.replace("d-block", "d-none")
        
    checkDisabeld()
    } else {
        userPassword.classList.add("is-invalid")
        userPassword.classList.remove("is-valid")
        UserPassAlert.classList.replace("d-none", "d-block")
    }
    
})
userRePassword.addEventListener('keyup', function () {

    if (userPassword.value == userRePassword.value) {
        userRePassword.classList.add("is-valid")
        userRePassword.classList.remove("is-invalid")
        UserRepassAlert.classList.replace("d-block", "d-none")
        checkDisabeld()

    } else {
        userRePassword.classList.add("is-invalid")
        userRePassword.classList.remove("is-valid")
        UserRepassAlert.classList.replace("d-none", "d-block")
    }
    
    
})

//   submitDisabeld

function checkDisabeld(){

    if (userName.value && userEmail.value && userAge.value && userPassword.value && userRePassword.value && userPhone.value ==true) {
        document.getElementById("submitBtn").disabled = false
        console.log("false",false)
    } else {
        document.getElementById("submitBtn").disabled = true
        console.log("true",true)
    }
    
}









