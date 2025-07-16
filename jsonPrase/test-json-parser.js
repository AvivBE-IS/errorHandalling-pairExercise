const { safeParseJSON } = require("./jsonParser");

// בדיקה עם JSON תקין
const validJSON = '{"name": "John", "age": 30}';
console.log("Valid JSON:");
console.log(safeParseJSON(validJSON));

// בדיקה עם JSON לא תקין
const invalidJSON = '{name: John, age: 30}';
console.log("\nInvalid JSON:");
console.log(safeParseJSON(invalidJSON));
