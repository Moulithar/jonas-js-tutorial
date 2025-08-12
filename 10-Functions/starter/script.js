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
//  calculate_AGE
// delayed_departure

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));
const btnElement = document.querySelector('button');
btnElement.innerHTML = 'Submit';
btnElement.addEventListener('click', () => {
  const textData = document.querySelector('textarea').value;
  const replaced = textData.replaceAll('// ', '');
  const textArray = replaced.split('\n');
  const camelCaseArray = [];
  for (const text of textArray) {
    let splittedArray = text.split('_');


    let firstWord = splittedArray[0];

    let secondWord =
      splittedArray[1][0].toUpperCase() + splittedArray[1].slice(1).toLowerCase();
    let camelCase = (firstWord + secondWord).trim();
    camelCaseArray.push(camelCase);
  }

  for(const [index,text] of camelCaseArray.entries()){
    console.log(`${text.padEnd(20, " ")} ${"x".repeat(index + 1)}`);
  }
});
