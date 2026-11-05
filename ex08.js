// Exercise 8: Delete a File Safely
// Goal: delete temp.txt, but only if the file exists.
// Required:
//   fs.access(path, fs.constants.F_OK, callback) - check if temp.txt exists
//   fs.unlink(path, callback)                    - delete it if found
//
// Expected output:
//   File deleted.        (if deleted)
//   File not found.      (if not found)
//
// Run: create a file temp.txt in this folder, then run node ex08.js twice.

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "temp.txt");

// write your code here

fs.access(filePath, fs.constants.F_OK, (err) => {
  if (err) {
    console.log("File not found.");
  } else {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted.");
      }
    });
  }
});