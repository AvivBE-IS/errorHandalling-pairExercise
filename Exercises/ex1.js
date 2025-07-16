// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

function userInput() {
  rl.question("Enter something: ", (answer) => {
    console.log(`You entered: ${answer}`);
    rl.close();
  });
}

function safeJsonParse(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (err) {
    return { error: "Invalid JSON format" };
  }
}

console.log(safeJsonParse('{"name": "John"}'));
// Output: { name: "John" }

console.log(safeJsonParse("invalid json"));
// Output: "Invalid JSON format"

// const jsonString = `{"num": "123"}`;
// const obj = JSON.parse(jsonString);

// console.log(obj.num);
// console.log(obj.age);

// jsonString = { name: "Aviv" };
