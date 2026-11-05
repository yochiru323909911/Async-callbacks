// Exercise 7: Create a New Folder
// Goal: create a folder named backup if it does not already exist.
// Required:
//   fs.access(path, fs.constants.F_OK, callback) - check if backup exists
//   fs.mkdir(path, callback)                     - create the folder if it does not exist
//   path.join(basePath, 'backup')                - build the folder path (basePath = __dirname)
//
// Expected output:
//   Folder created successfully.      (if the folder was created)
//   Folder already exists.            (if it already exists)
//
// Run: node ex07.js   (run it twice)

const fs = require("fs");
const path = require("path");

// write your code here

fs.access(path.join(__dirname, 'backup'), fs.constants.F_OK, (err) => {
    if (err) {
        fs.mkdir(path.join(__dirname, 'backup'), (err) => {
            if (err) {
                console.error("Error creating folder:", err);
            } else {
                console.log("Folder created successfully.");
            }
        });
    }
    else {
        console.log("Folder already exists.");
    }
});

