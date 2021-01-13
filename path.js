//Working with path module.. it allows us to work with directory and file
const path = require('path');

var fileName = path.parse(__filename);
var dir = path.parse(__dirname);

console.log(fileName);

console.log(dir);