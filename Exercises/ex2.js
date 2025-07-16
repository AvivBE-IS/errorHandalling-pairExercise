const fs = require("fs").promises;

function readFileWithErrorHandling(filePath) {
  try {
    const data = fs.readFile(filePath);
    return `File read successfully. Size: ${data.length} bytes`;
  } catch (err) {
    console.log(err);
    if (err.code === "ENOENT") {
      return `File not found: ${filePath}`;
    } else if (err.code === "EISDIR") {
      return `Path is a directory, not a file: ${filePath}`;
    } else {
      return `Error reading file: ${err.message}`;
    }
  }
}

console.log(readFileWithErrorHandling("./data.txt"));
//console.log(readFileWithErrorHandling("./notExist.txt"));
console.log(readFileWithErrorHandling("./dir"));
