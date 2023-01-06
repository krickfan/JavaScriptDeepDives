const readline = require('readline');
const strg = ["Firstname:", "Lastname:", "Age:"];
const property = ["firstname", "lastname", "age"];
let x = -1;
let person = {};
let postCreateFunction;

let reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

console.log("Please define post create hook:");
reader.on('line', function(input){
    if(input == "Quit") {
        process.exit();
    }
    
    if(x == -1) {
      postCreateFunction = new Function("person2", input);
      x = 0;
      console.log("New person:");
    }
    else {
      person[property[x]] = input;
      x++;
      
      if(x == 3) {
        try {
          postCreateFunction(person);
        }
        catch(err) {
          console.log("ERROR: " + err);
        }
        console.log("Created person is " + JSON.stringify(person));
        x = 0;
        console.log("New person:");
      }
    }
    console.log(strg[x]);   
});