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
// getCoun(-33.933, 18.474);

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

// console.log('1');
// setTimeout(() => console.log('4'), 0);
// Promise.resolve('3').then(data => {
//   return Promise.resolve('5').then(res => setTimeout(() => console.log(data + res), 0));
// });
// console.log('2');

// const lotteryResults = new Promise((resolve, reject) => {
//   console.log("Lottery process happening")
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve('YOU WIN!!');
//     } else {
//       reject(new Error("YOU LOSE!!"));
//     }
//   }, 3000);
// });

// lotteryResults.then(res => console.log(res)).catch(err => console.error(err));

const wait = seconds => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
};

// wait(3)
//   .then(() => {
//     console.log(`waited 3 second`);
//     return wait(1);
//   })
//   .then(() => {
//     console.log(`waited 4 second`);
//     return wait(1);
//   })
//   .then(() => {
//     console.log(`waited 5 second`);
//     return wait(1);
//   })
//   .then(() => {
//     console.log(`waited 6 second`);
//     return wait(1);
//   });

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

const imageLoader = document.getElementById('load-image');
const imageElement = document.createElement('img');

const images = document.querySelector('.images');
const createImage = imgPath => {
  imageElement.src = imgPath;
  return new Promise((res, rej) => {
    imageElement.addEventListener('load', () => {
      images.style.display = 'block';
      images.appendChild(imageElement);
      res(imageElement);
    });
    imageElement.addEventListener('error', () => {
      rej(new Error('Failed to load image'));
    });
  });
};

imageLoader.addEventListener('click', () => {
  createImage('./img/img-1.jpg')
    .then(res => {
      return wait(2);
    })
    .then(() => {
      images.style.display = 'none';
      return createImage('./img/img-2.jpg');
    })
    .then(res => {
      console.log(res);
      return wait(2);
    })
    .then(() => {
      images.style.display = 'none';
      return createImage('./img/img-3.jpg');
    })
    .then(res => {
      console.log(res);
      return wait(2);
    })
    .then(() => {
      images.style.display = 'none';
    });
});

// const nums = [2, 7, 13, 0, 14, 22, 6];
// const target = 84;
// function twoSum(nums, target) {
//   const hashMap = {};
//   for (let i = 0; i < nums.length; i++) {
//     if (hashMap[target - nums[i]] !== undefined) {
//       return [hashMap[target - nums[i]], i];
//     } 
//       hashMap[nums[i]] = i;
    
//   }
//   return "No pairs found"
// }

// console.log(twoSum(nums, target));


// const nums: number[] = [2, 7, 13, 0, 14, 22, 6];
// const target: number = 84;

// function twoSum(nums: number[], target: number): number[] {
//   const map: Record<number, number> = {}; // key = value from nums, value = index

//   for (let i = 0; i < nums.length; i++) {
//     const complement: number = target - nums[i];

//     if (map[complement] !== undefined) {
//       return [map[complement], i];
//     }

//     map[nums[i]] = i;
//   }

//   return []; // consistent return type
// }

// console.log(twoSum(nums, target)); // []
