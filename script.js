// const array = [2, 6, 5, 2, 3];

// function printForecast(array) {
//   let string = "";
//   for (let i = 0; i < array.length; i++) {
//     string = string + `...${array[i]} @ celsius in ${i + 1} days`;
//   }
//   return string;
// }

// console.log(printForecast(array));

const array = [7.5, 8, 6.5, 0, 8.5, 4, 0];

function giveWorkStats(array) {
  const weeks = {
    0: "Monday",
    1: "Tuesday",
    2: "wed",
    3: "thurs",
    4: "fri",
    5: "sat",
    6: "sun",
  };

  let status = {
    total: 0,
    average: 0,
    most: array[0],
    noOfDays: array.filter((arr) => arr !== 0).length,
    full: false,
  };

  for (let i = 0; i < array.length; i++) {
    status.total += array[i];
    if (status.most < array[i]) {
      console.log(array[i], status.most);
      status.most = [i];
    }
  }
  status.average = status.total / status.noOfDays;
  status.full = status.total >= 35 ? true : false;
  status.most = weeks[status.most];
  return status;
}

console.log(giveWorkStats(array));
