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

const textArea = document.createElement("textarea");
const button = document.createElement("button")

document.body.appendChild(textArea);
document.body.appendChild(button);

button.innerHTML = 'Sumbit';

const handleClick =()=>{
  const value = textArea.value;
  const formattedArray = value.replaceAll("// ", "").split("\n");

  for(const [index,row] of formattedArray.entries()){
    const [firstWord, lastWord] = row.split("_");
    const camelCase = firstWord.toLowerCase().trim() + lastWord[0].toUpperCase()+ lastWord.slice(1).toLowerCase();
    console.log(camelCase.padEnd(20," ")+"#".repeat(index+1))

  }

}

button.addEventListener("click", handleClick)