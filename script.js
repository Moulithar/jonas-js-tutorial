const array = [2, 6, 5, 2, 3];

function printForecast(array) {
  let string = "";
  for (let i = 0; i < array.length; i++) {
    string = string + `...${array[i]} @ celsius in ${i + 1} days`;
  }
  return string;
}

console.log(printForecast(array));
