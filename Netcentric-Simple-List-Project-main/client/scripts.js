const http = new coreHTTP;

// Block Variables
let theList = [];

// setup selectors
const result = document.querySelector(".result");
const input =  document.querySelector("#listitem");
const addButton =  document.querySelector(".add-btn");
const delButton =  document.querySelector(".del-btn");

// Listeners
addButton.addEventListener("click", httpPost);
delButton.addEventListener("click", httpDelete);

/* Helper Functions */
function ShowList() {
  let output = "<ul>";
  for (const itm of theList) {
    output += `<li>${itm}</li>`;
  }
  output += "</ul>";
  result.innerHTML = output;
}

async function GetList() {
  theList = await http.get("./api");
  ShowList();
  return;
}

async function WriteList() {
  await http.post("./api", theList); // posts the new list
  ShowList(); // calls the show list function
  return;
}

/* Listener Functions */
async function httpPost(e) {
  const newData = input.value; // collects new user input from input

  if (newData === ""){ // checks to see if new user input is blank, returning (cancelling the post) if it is
    return;
  }

  theList.push(newData); // adding the new user input to the list
  WriteList(); // writing the list to the api
  e.preventDefault();  // basic prevent default code snipit
}

function httpDelete(e) {
  const userData = input.value;

  if (userData === ""){ // same check as in http post to prevent function if the data is blank
    return;
  }
  
  const pos = theList.indexOf(userData); // gets the position (index) of the data in the array
  if (pos === -1){ // handles if the data isn't in the array
    return;
  }

  theList.splice(pos, 1); // removes the user data entry in the list from the list
  WriteList(); // writes the new list post splice
  e.preventDefault();
}

// Loading functions
function showLoading() {
  result.innerHTML = "Loading...";
}

async function main() {
  addButton.disabled = true;
  delButton.disabled = true;
  showLoading();

  await GetList();

  addButton.disabled = false;
  delButton.disabled = false;
}

main();