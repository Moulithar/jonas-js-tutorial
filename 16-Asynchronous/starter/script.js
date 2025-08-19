'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

const getCountry = (country) => {
  const request = new XMLHttpRequest();
  // request.open('GET', `https://restcountries.com/v3.1/independent?status=true`);
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  // request.open("GET", "https://countries-api-836d.onrender.com/countries/")

  request.send();

  request.addEventListener('load', data => {
    const countryData = JSON.parse(data.currentTarget.responseText);
    const firstObj = countryData[0];
    const { flags, name, region, population, languages, currencies } = firstObj;
    console.log(firstObj);

    const html = `
          <article class="country">
            <img class="country__img" src=${flags.png} />
            <div class="country__data">
              <h3 class="country__name">${name}</h3>
              <h4 class="country__region">${region}</h4>
              <p class="country__row"><span>👫</span>${
                (+population / 10000000).toFixed(1) + 'M'
              }</p>
              <p class="country__row"><span>🗣️</span>${languages[0].name}</p>
              <p class="country__row"><span>💰</span>${currencies[0].name}</p>
            </div>
          </article>
  
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountry("portugal")
getCountry("germany")
getCountry("china")
getCountry("bharat")
