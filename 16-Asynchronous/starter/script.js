'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

// const addHtml = (data, className = '') => {
//   const countryData = JSON.parse(data.currentTarget.responseText);
//   const firstObj = className ? countryData : countryData[0];
//   const { flags, name, region, population, languages, currencies } = firstObj;
//   console.log(firstObj);

//   const html = `
//           <article class="country ${className}">
//             <img class="country__img" src=${flags.png} />
//             <div class="country__data">
//               <h3 class="country__name">${name}</h3>
//               <h4 class="country__region">${region}</h4>
//               <p class="country__row"><span>👫</span>${
//                 (+population / 10000000).toFixed(1) + 'M'
//               }</p>
//               <p class="country__row"><span>🗣️</span>${languages[0].name}</p>
//               <p class="country__row"><span>💰</span>${currencies[0].name}</p>
//             </div>
//           </article>

//     `;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };

// const getCountry = country => {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();
//   request.addEventListener('load', event => {
//     addHtml(event);

//     const border = JSON.parse(event.currentTarget.responseText)[0].borders[0];
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${border}`);
//     request2.send();
//     request2.addEventListener('load', event => addHtml(event, 'neighbour'));
//   });
// };

// getCountry('portugal');

// const makeRequest = (url, callback, className = '') => {
//   const request = new XMLHttpRequest();
//   request.open('GET', url);
//   request.send();
//   request.addEventListener('load', event => callback(event, className));
// };

// const addHtml = (event, className = '') => {
//   const countryData = JSON.parse(event.currentTarget.responseText);
//   const firstObj = className ? countryData : countryData[0];
//   const { flags, name, region, population, languages, currencies } = firstObj;

//   const html = `
//     <article class="country ${className}">
//       <img class="country__img" src="${flags.png}" />
//       <div class="country__data">
//         <h3 class="country__name">${name}</h3>
//         <h4 class="country__region">${region}</h4>
//         <p class="country__row"><span>👫</span>${(population / 1000000).toFixed(
//           1
//         )}M</p>
//         <p class="country__row"><span>🗣️</span>${languages[0].name}</p>
//         <p class="country__row"><span>💰</span>${currencies[0].name}</p>
//       </div>
//     </article>
//   `;

//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };

// const getCountry = country => {
//   const url = `https://restcountries.com/v2/name/${country}`;

//   makeRequest(url, event => {
//     addHtml(event);
//     const border = JSON.parse(event.currentTarget.responseText)[0].borders?.[0];
//     if (border) {
//       makeRequest(
//         `https://restcountries.com/v2/alpha/${border}`,
//         addHtml,
//         'neighbour'
//       );
//     }
//   });
// };

// getCountry('bharat');

const getJson = url => {
  return fetch(url).then(data => {
    if (!data.ok) throw new Error(`Country not found (${data.status})`);
    return data.json();
  });
};

const renderHtml = (data, className = '') => {
  const { flags, name, region, population, languages, currencies } = data;

  const html = `
      <article class="country ${className}">
        <img class="country__img" src="${flags.png}" />
        <div class="country__data">
          <h3 class="country__name">${name}</h3>
          <h4 class="country__region">${region}</h4>
          <p class="country__row"><span>👫</span>${(
            population / 1000000
          ).toFixed(1)}M</p>
          <p class="country__row"><span>🗣️</span>${languages[0].name}</p>
          <p class="country__row"><span>💰</span>${currencies[0].name}</p>
        </div>
      </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getSingleCountry = country => {
  getJson(`https://restcountries.com/v2/name/${country}`)
    .then(data => {
      renderHtml(data[0]);
      const border = data[0].borders[0];
      if (border) {
        return getJson(`https://restcountries.com/v2/alpha/${border}`);
      }
    })
    .then(data => renderHtml(data, 'neighbour'))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// getSingleCountry('nepal');

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}.
The AJAX call will be done to a URL with this format: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=52.508&longitude=13.381. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

const showHtml = (data, className = '') => {
  const { name, population, flags, currencies, region, languages } = className
    ? data
    : data[0];
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${name}</h3>
        <h4 class="country__region">${region}</h4>
        <p class="country__row"><span>👫</span>${(population / 1000000).toFixed(
          1
        )}M</p>
        <p class="country__row"><span>🗣️</span>${languages[0].name}</p>
        <p class="country__row"><span>💰</span>${currencies[0].name}</p>
      </div>
    </article>
  `;
  return countriesContainer.insertAdjacentHTML('beforeend', html);
};

const getCoun = (lat = '52.509', lon = '13.381') => {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
  )
    .then(response => response.json())
    .then(response => {
      const country = response.countryName.toLowerCase();

      return fetch(`https://restcountries.com/v2/name/${country}`);
    })
    .then(response => response.json())
    .then(data => {
      const border = data[0]?.borders[0];

      showHtml(data);
      if (border) {
        return fetch(`https://restcountries.com/v2/alpha/${border}`);
      }
    })
    .then(res => res.json())
    .then(data => {
      const border = data?.borders[0];

      showHtml(data, 'neighbour');
      if (border) {
        return fetch(`https://restcountries.com/v2/alpha/${border}`);
      }
    })
    .then(response => response.json())
    .then(data => {
      const border = data?.borders[0];

      showHtml(data, 'neighbour');
      if (border) {
        return fetch(`https://restcountries.com/v2/alpha/${border}`);
      }
    })
    .then(response => response.json())
    .then(data => {
      const border = data?.borders[0];

      showHtml(data, 'neighbour');
      if (border) {
        return fetch(`https://restcountries.com/v2/alpha/${border}`);
      }
    })
    .then(response => response.json())
    .then(data => {
      const border = data?.borders[0];

      showHtml(data, 'neighbour');
      if (border) {
        return fetch(`https://restcountries.com/v2/alpha/${border}`);
      }
    })
    .then(response => response.json())
    .then(data => {
      const border = data?.borders[0];

      showHtml(data, 'neighbour');
      if (border) {
        return fetch(`https://restcountries.com/v2/alpha/${border}`);
      }
    })
    .then(response => response.json())
    .then(data => {
      const border = data?.borders[0];

      showHtml(data, 'neighbour');
      if (border) {
        return fetch(`https://restcountries.com/v2/alpha/${border}`);
      }
    })
    .then(response => response.json())
    .then(data => showHtml(data, 'neighbour'))
    .catch(err => console.error(err))
    .finally(() => (countriesContainer.style.opacity = 1));
};

// getCoun(52.509, 13.381);
// getCoun(19.037, 72.873);
getCoun(-33.933, 18.474);

// const a = 'jonas';
// first();

// function first() {
//   const b = 'Hello';
//   second();

//   function second() {
//     const c = 'hi';
//     third();
//   }
// }

// function third() {
//   const d = 'hey';
//   console.log(a, b, c, d);
// }

// printHelloDeclaration();
// const printHelloExpression = function(){
//   console.log("hello expression")
// }   
// printHelloExpression();
// printHelloExpressionArrow();

// const printHelloExpressionArrow = ()=>{
//   console.log("hello expression")
// }



// function printHelloDeclaration(){
//   console.log("hello desclaration")
// }


// function sayName(intial = "", secondInitial = ""){
//   console.log(`${this.name} ${intial}${secondInitial}`)
// }

// const vihals = {
//   name: "vihals"
// }

// const mouli ={
//   name: "mouli"
// }

// const intials = ["B", "C"]

// sayName.call(vihals, typeof(intials))
// sayName.apply (mouli, intials)

// const sayNameMouli = sayName.bind(mouli, "B", "C")
// sayNameMouli()