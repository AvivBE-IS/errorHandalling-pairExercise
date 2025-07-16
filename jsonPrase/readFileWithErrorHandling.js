const fs = require('fs');

function readFileWithErrorHandling(path, callback) {
  fs.readFile(path, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return callback(`File not found: ${path}`);
      }
      if (err.code === 'EISDIR') {
        return callback(`Expected a file but found a directory: ${path}`);
      }
      return callback(`An unknown error occurred: ${err.message}`);
    }

    const size = data.length;
    callback(`File read successfully. Size: ${size} bytes`);
  });
}




readFileWithErrorHandling('existing.txt', console.log);
readFileWithErrorHandling('nonexistent.txt', console.log);
readFileWithErrorHandling('.', console.log); 