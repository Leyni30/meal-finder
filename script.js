const search = document.getElementById('search');
const submit = document.getElementById('submit');
const randomBtn = document.getElementById('random');
const resultHeading = document.getElementById('result-heading');
const mealsEl = document.getElementById('meals');
const singleMealEl = document.getElementById('single-meal');




// Search meal and fetch from API
function searchMeal(e) {
    e.preventDefault();

    singleMealEl.innerHTML = "";
    const term = search.value;
    console.log(term);
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
                if (data.meals === null) {
                    resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
                } else {
                    mealsEl.innerHTML = data.meals
                        .map(meal => `
                            <div class="meal">
                                <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                                <div class="meal-info" data-mealID="${meal.idMeal}">
                                    <h3>${meal.strMeal}</h3>
                                </div>
                            </div>
                        `)
                        .join('');
                }
            })
        // clear search text
        search.value = '';
    } else {
        alert('Please enter a word to search for meals')
    }
}

// Generate a random meal from the API
function randomMeal() {
    resultHeading.innerHTML = "";
    mealsEl.innerHTML = "";
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then(data => {
            //resultHeading.innerHTML += `<br><h3>${data.meals[0].strMeal}</h3>`;
            console.log(data)
            const ingredients = [];
            const meal = data.meals[0];
            for (let i = 1; i <= 20; i++) {
                if (meal[`strIngredient${i}`]) {
                    ingredients.push(
                        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
                } else {
                    break;
                }
            }

            singleMealEl.innerHTML = `
            <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}"/>
            <div class="single-meal-info">
            ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
            ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
            </div>
            <div class="main">
            <p>${meal.strInstructions}</p>
            <h2>Ingredients</h2>
            <ul>
            ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
            </div>
            </div>
            `;
        })
        .catch(err => console.log(err));

}

//Fetch meal by ID
function getMealById(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            addMealToDOM(meal);
        })

}

//Add meal to DOM
function addMealToDOM(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }

    singleMealEl.innerHTML = `
    <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}"/>
    <div class="single-meal-info">
    ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
    ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
    </div>
    <div class="main">
    <p>${meal.strInstructions}</p>
    <h2>Ingredients</h2>
    <ul>
    ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
    </ul>
    </div>
    </div>
    `;
}

// Event Listeners
submit.addEventListener('submit', searchMeal);
randomBtn.addEventListener('click', randomMeal);
mealsEl.addEventListener('click', e => {
    // const mealInfo = e.path.find(item => {
    //     if (item.classList) {
    //         return item.classList.contains('meal-info');
    //     } else {
    //         return false;
    //     }
    // })
    if (e.target.classList.contains('meal-info')) {
        console.log(e.target);
        const mealID = e.target.getAttribute('data-mealid');
        console.log(mealID);
        getMealById(mealID);
    } else if (e.target.parentElement.classList.contains('meal-info')) {
        console.log(e.target.parentElement);
        const mealID = e.target.parentElement.getAttribute('data-mealid');
        console.log(mealID);
        getMealById(mealID);
    }

});