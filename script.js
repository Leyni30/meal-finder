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
            resultHeading.innerHTML += `<br><h3>${data.meals[0].strMeal}</h3>`;
            console.log(data)
        })
        .catch(err => console.log(err));

}

// Event Listeners
submit.addEventListener('submit', searchMeal);
randomBtn.addEventListener('click', randomMeal);