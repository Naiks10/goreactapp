'use strict';

let urls = [
  'https://apiv2.bitcoinaverage.com/indices/global/ticker/ETHUSD',
  'https://apiv2.bitcoinaverage.com/indices/global/ticker/LTCUSD',
  'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD'
];

let data = urls.map((item, index) => {
  return fetch(item).then(function(response) {
    return response.json();
  }).then(function(data) {
    console.log(data);
  }).catch( alert );
})

console.log(data);