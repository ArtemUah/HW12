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