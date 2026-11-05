// Exercise 15: Create and Write File
// Goal: create a new file data.txt and write "Hello Node.js" into it - only if the file does not already exist.
// Required:
//   fs.access(filePath, fs.constants.F_OK, callback) - check if data.txt exists
//   fs.writeFile(filePath, data, callback)           - create and write the file if it does not exist
//
// Expected output:
//   File created successfully.     (if the file is created)
//   File already exists.           (if the file already exists)
//
// Run: node ex15.js   (run it twice)

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "data.txt");

// write your code here
