// Exercise 6: Append to File
// Goal: append a new line to log.txt with the current timestamp.
// Required: fs.appendFile(filePath, data, callback)
// - build the log line with new Date().toISOString()
// - add it to log.txt as a NEW line (every run adds one line, the old lines stay)
//
// Expected output (in log.txt):
//   2025-06-28T22:10:15.000Z - Log entry
//
// Run: node ex06.js   (then open log.txt)

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "log.txt");

// write your code here
