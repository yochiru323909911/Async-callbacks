// Exercise 12: Check File Extension
// Goal: check if notes.txt exists and print whether it is a .txt file.
// Required:
//   fs.access(filePath, fs.constants.F_OK, callback) - check if notes.txt exists
//   path.extname(filePath)                           - check the extension
//   (optional) path.basename(filePath)               - to print the file name
//
// Expected output:
//   notes.txt is a .txt file.     (if it exists and is .txt)
//   File not found.               (if the file is not found)
//
// Run: node ex12.js

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "notes.txt");

// write your code here
