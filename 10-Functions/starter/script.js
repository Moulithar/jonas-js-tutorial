'use strict';
// const greet = () => alert('Hello');

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

const greet = greeting => name => console.log(`${greeting}, -> ${name}`);

greet('hey')('moogi manga');

const lufthansa = {
  name: 'lufthansa airlines',
  iataCode: 'LH',
  bookings: [],
  book(name, iataCode) {
    console.log(`${this.name} booked a seat on ${this.iataCode}`);
    this.bookings.push({ name, iataCode });
  },
};

lufthansa.book('Moulithar', 'LH123');

const euroWings = {
  name: 'eurowings airlines',
  iataCode: 'EW',
  bookings: [],
};
const swissAirlines = {
  name: 'swiss airlines',
  iataCode: 'SW',
  bookings: [],
};

const bookFn = lufthansa.book;

bookFn.call(euroWings, 'Manga', 'EW');
bookFn.call(swissAirlines, ' ', 'SW');

const addTaxRate = value => {
  return rate => {
    console.log(value + value * rate);
  };
};

const addVAT2 = addTaxRate(200);

addVAT2(0.25);

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the 
  value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number 
  makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an 
input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the 
results array as it is, using console.log(). This should be the default option. If type is 'string', 
display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and 
the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const answerPollBtn = document.querySelector('.poll');

const poll = {
  question: 'What is your favourite programming language?',
  options: [
    { option: 'JavaScript', value: 0 },
    { option: 'Python', value: 0 },
    { option: 'Rust', value: 0 },
    { option: 'C++', value: 0 },
  ],
  displayResults(type = 'array') {
    if (type == 'string') {
      console.log(`Poll results are ${this.options.map((opt)=> opt.value).join(", ")}`);
    } else if (type == 'array') {
      console.log(this.options);
    }
  },
  registerNewAnswer() {
    const answer = prompt(
      `${this.question} \n${this.options
        .map((opt, index) => `${index}: ${opt.option}\n`)
        .join('')} (Write option number)`
    );
    answer >= 0 && answer < this.options.length
      ? this.options[answer].value++
      : console.log('please enter a valid option');
    // this.displayResults();
    this.displayResults();
  },

};

const registerNewAnswer = poll.registerNewAnswer.bind(poll);

answerPollBtn.addEventListener('click', registerNewAnswer);


let f;
const g = ()=>{

  const a = 63;
   f = function(){
    console.log(a*2)
  }
}

g();
f();

(function(){
  const header = document.querySelector("h1");
  header.style.color = "red";
  document.body.addEventListener("click", ()=>{
    header.style.color = "blue"
  })
})()