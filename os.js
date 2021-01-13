//importing operating system module
const os = require('os');

//get free memory and total memory availavble at your machine
var freeMem = os.freemem();
var totalMem = os.totalmem();

console.log(`Total free memory avaible ${freeMem}`);
console.log(`Total memory ${totalMem}`);