'use strict';
const greet = () => alert('Hello');

// const btnElement = document.querySelector('.buy');

// btnElement.addEventListener('click', greet);

const name = 'jessica is my good friend';
function capitalizeFirstLetter(str) {
  const names = str.split(' ');
  let nameUpper = [];
  for (let name of names) {
    nameUpper = [...nameUpper, name[0].toUpperCase() + name.slice(1)];
  }
  console.log(nameUpper.join(' '));
}

capitalizeFirstLetter(name);

const creditCardNumber = 2345678901234567;
const maskedNumber = creditCardNumber
  .toString()
  .slice(-4)
  .padStart(creditCardNumber.toString().length, '*');
console.log(maskedNumber);

// underscore_case
//  first_name
// some_var
//   calculate_AGE
// delayed_departure

const textArea = document.createElement('textarea');
const button = document.createElement('button');

document.body.appendChild(textArea);
document.body.appendChild(button);

button.textContent = 'Submit';

const handleClick = value => {
  const formattedArray = value.replaceAll('// ', '').split('\n');

  for (const [index, row] of formattedArray.entries()) {
    const [firstWord, lastWord] = row.toLowerCase().trim().split('_');
    const camelCase =
      firstWord + lastWord.replace(lastWord[0], lastWord[0].toUpperCase());
    console.log(camelCase.padEnd(20, ' ') + '#'.repeat(index + 1));
  }
};

button.addEventListener('click', () => handleClick(textArea.value));
button.addEventListener('click', handleClick);

const flights =
  '+Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// # Delayed Departure from FAO to TXL (11h25)
// #           Arrival from BRU to FAO (11h45)
// #   Delayed Arrival from HEL to FAO (12h05)
// #         Departure from FAO to LIS (12h30)

const displayFlight = flights => {
  const splittedFlights = flights.slice(1).split('+');

  for (const row of splittedFlights) {
    const [type, from, to, time] = row.split(';');
    const message = `${type.replaceAll('_', ' ').trim()} from ${from
      .slice(0, 3)
      .toUpperCase()} to ${to.slice(0, 3).toUpperCase()} (${time.replace(
      ':',
      'h'
    )})`;
    console.log('#' + message.padStart(50, ' '));
  }
};

displayFlight(flights);
