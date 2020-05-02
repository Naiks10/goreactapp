'use strict';

let urls = [
  'https://jsonplaceholder.typicode.com/posts',
  'https://jsonplaceholder.typicode.com/posts',
  'https://jsonplaceholder.typicode.com/posts'
];

let data = urls.map((item, index) => {
  return fetch(item).then(function(response) {
    return response.json();
  }).then(function(data) {
    console.log(data);
  }).catch( alert );
})

console.log(data);