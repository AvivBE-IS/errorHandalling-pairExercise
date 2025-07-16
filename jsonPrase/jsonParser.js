

function safeJsonParse(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (err) {
    return "Invalid JSON format";
  }
}

// בדיקות
console.log(safeJsonParse('{"name": "John"}'));
// ➜ { name: 'John' }

console.log(safeJsonParse('invalid json'));
// ➜ "Invalid JSON format"


