// ------ R - GET
// const BASE_URL = 'https://jsonplaceholder.typicode.com/posts/1/';
// fetch(BASE_URL).then(resp => resp.json()).then(data => console.log(data))

// ------C - POST

// const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

// const addBtn = document.querySelector('.add');
// const container = document.querySelector('.for-form');
// const comment = document.querySelector('.js-comment')
// addBtn.addEventListener('click', onClick);

// function onClick (e){
// container.innerHTML = createFormMarkup();
// const form = document.querySelector('.js-form');
// form.addEventListener('submit', onSubmit)
// };

// function createFormMarkup(){
//     return `<form class="js-form" action="submit">
//     <input type="text" name="title">
//     <textarea name="body" id="" cols="30" rows="10"></textarea>
//     <button class="post">Post comment</button>
//   </form>`
// }

// function onSubmit(e){
//     e.preventDefault();
//     const {title, body} = e.currentTarget.elements;
//     const options = {
//         method: "POST",
//         body:JSON.stringify({
//             title: title.value,
//             body: body.value,
//             userId: 14
//         }),
//         headers: {
//             "Content-type":"application/json"
//         }
//     };
//     fetch(BASE_URL, options).then(resp => {
//         if(!resp.ok){
//             throw new Error(resp.statusText)
//         };
//         return resp.json()
//     }).then(({title,body,id}) => {
//         console.log(title);
//         console.log(body)
//         comment.insertAdjacentHTML("beforeend", `<li data-id="${id}">
//         <h3>${title}</h3>
//         <p>${body}</p>
//       </li>`);
//       container.innerHTML = '';
//     }).catch(err=> console.log(err));
// };

// ------------U - PUT/PATCH

// const BASE_URL = 'https://jsonplaceholder.typicode.com/posts/1';

// const options = {
//     method:"PUT",
//     body:JSON.stringify({
//         body: 'Hello world'
//     }),
//     headers:{
//         "Content-Type":"application/json"
//     }
// };

// fetch(BASE_URL, options).then(resp => resp.json()).then(data => console.log(data));

// -----------Weather in capital of countries
// 'https://restcountries.com/v3.1/name/'
//  const BASE_URL = "http://api.weatherapi.com/v1";
// const API_KEY = "ce2cb9b2a3da414bb5b172546231704";

const countriesApi = 'https://restcountries.com/v3.1/name/'

const searchForm = document.querySelector('.js-searchForm');
const inputCountriesWrapper = document.querySelector('.js-wrapper');
const addBtn = document.querySelector('.js-add');
const list = document.querySelector('.js-list')
addBtn.addEventListener('click', handlerOnClick);
function handlerOnClick(e){
inputCountriesWrapper.insertAdjacentHTML('beforeend', createMarkup())
}

function createMarkup (){
    return `<input name="country" type="text">`
}

searchForm.addEventListener('submit', handlerOnSubmit);
async function handlerOnSubmit (e){
    e.preventDefault();
    const data = new FormData(searchForm);
    const countries = data.getAll('country');
    const checkedCountries = countries.map(country => country.trim()).filter(country => country);
    getCapitals(checkedCountries).then(async data => {
        const resps = await getWeather(data);
        const weather = resps.filter(item => item.status === 'fulfilled').map(item => item.value);
        
            list.innerHTML = createWeatherMarkup(weather);
            searchForm.innerHTML='';
    })
};

async function getCapitals (arr){
const resps = arr.map(async country => {
const resp = await fetch(`${countriesApi}${country}`);
if(!resp.ok){
    throw new Error()
};
return resp.json()
});
const data = await Promise.allSettled(resps);
const countryObj = data.filter(item => item.status === 'fulfilled').map(country => country.value[0]);
return countryObj;
}

async function getWeather (arr) {
     const BASE_URL = "http://api.weatherapi.com/v1/current.json";
const API_KEY = "ce2cb9b2a3da414bb5b172546231704";
    const resps = arr.map(async country => {
        const resp = await fetch(`${BASE_URL}?key=${API_KEY}&q=${country.capital[0]}`);
        if (!resp.ok){
            throw new Error()
        };
        return resp.json();
    });
    const data = await Promise.allSettled(resps);
    const weatherObj = data.filter(item => item.status === 'fulfilled');
    return weatherObj;
}

function createWeatherMarkup(arr){
    return arr.map(({location:{country, name}, current:{temp_c, condition:{text, icon}}}) => {
        return `<li>
        <img src="${icon}" alt="${name}">
        <h2>${name}</h2>
        <h3>${country}</h3>
        <p>${text}</p>
        <p>${temp_c}</p>
      </li>`
    }).join('')
};