//how to work with file systmem in node js

const fs = require('fs');

//read file synchronously
const files = fs.readdirSync("./");

// console.log(files);

//read file system asynchronously
fs.readdir("/", (err, files) => {
    if(err) console.log("Error", err);
    else console.log("Result", files)
});