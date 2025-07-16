console.log(safeJsonParse('{"name": "John"}')); 
// Output: { name: "John" }

console.log(safeJsonParse('invalid json')); 
// Output: "Invalid JSON format"


function safeParseJSON(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    return { success: true, data: parsed };
  } catch (err) {
    return { success: false, error: `Invalid JSON: ${err.message}` };
  }
}

module.exports = { safeParseJSON };
