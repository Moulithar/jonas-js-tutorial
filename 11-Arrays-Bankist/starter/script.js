'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [-200, -450, -400, -3000, -650, -130, -70, -1300];

/////////////////////////////////////////////////

const withdrawls = movements
  .filter(mov => mov < 0)
  .map((data, i) => `Withdrawl number ${i + 1}: ${Math.abs(data)}`);
console.log(withdrawls);

const maximun = movements.reduce((acc, curr) => {
  if (acc > curr) {
    return acc;
  } else {
    return curr;
  }
}, movements.at(0));
console.log(maximun);

const groupByActivity = Object.groupBy(accounts, account => {
  const movements = account.movements.length;

  if (movements >= 8) {
    return 'very active';
  }
  if (movements >= 4) {
    return 'active';
  }
  if (movements >= 1) {
    return 'moderate';
  }
  return 'inactive';
});

console.log(groupByActivity);

const total = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, curr) => acc + curr, 0);

console.log(total);

const above1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, curr) => curr > 1000 ? ++acc : acc, 0);

  console.log(above1000)


  const convertTitleCase = (title) => {
    const exceptions = ["a", "an", "and", "the", "but", "or", "on", "in",  "is", "with", ];
    
    const titleCase = title.toLowerCase().split(" ").map((word,index)=> (exceptions.includes(word) && index != 0 )  ? word : word[0].toUpperCase() + word.slice(1)).join(" ")

    return titleCase
  }

  console.log(convertTitleCase("this is a nice title"))
  console.log(convertTitleCase("this is a LONG title but not too long"))
  console.log(convertTitleCase("and here is an another title with an EXAMPLE"))