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
        resultHeading.innerHTML = "";
        mealsEl.innerHTML = "";

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.meals[0].strMeal, data.meals[0].strMealThumb)
                let resultArr = data.meals;
                console.log(resultArr);
                resultArr.forEach(item => {
                    resultHeading.innerHTML += `<br><h3>${item.strMeal}</h3>`;
                    mealsEl.innerHTML += `<img src="${item.strMealThump}" width="100" height="100">`;

                })
            })
            .catch(err => console.log(err));
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