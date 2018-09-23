let number1 = 500;
let number2 = 501;
let difference;
let earningsTotal = 1000;
let operation;

if (number1 > number2) {
  difference = number1 - number2;
  operation = 'subtract'
} else {
  difference = number2 - number1;
  operation = 'add'
}

console.log(operation, difference)
