var fs = require('fs');
file = fs.readFileSync(process.argv[2]).toString();
lineCount = file.split('\n').length - 1;
console.log(lineCount);