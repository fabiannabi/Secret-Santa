let AddParticipant = document.querySelector("#register-form");
let GetName = document.querySelector("#participant-name");
let GetEmail = document.querySelector("#participant-email");
let display = document.querySelector("#participants-list");
let status = document.querySelector(".status-message");
let ResetList = document.querySelector(".Reset");
let StartButton = document.querySelector(".Start");

//check if theres Data in localstorage so we can keep track of previous changes between page reloads
if (localStorage.getItem("Data")) {
  //if there is, use it for Data
  Data = JSON.parse(localStorage.getItem("Data"));
} else {
  //if not initialize data as an empty object
  Data = { people: [] };
}
console.log(Data);

AddParticipant.addEventListener("submit", function(event) {
  //submit pide peticion a los servidores cuando el boton es presionado, para eso se previene con ..
  event.preventDefault();

  //clear Error Message
  status.className = "Success";
  status.innerText = "Participant Added Successfully";

  //ignore incomplete submitions
  if (GetName.value.length < 1 || GetEmail.value.length < 1) {
    status.className = "Error";
    status.innerText = "Please Complete the Form";
    return;
  }

  // add to the objetc in the format of
  //DATA = {
  //people : [
  //{name : name, email: email} ]

  Data.people.push({ name: GetName.value, email: GetEmail.value });

  //add person to list
  let node = document.createElement("Li");
  let namenode = document.createElement("span");
  let emailnode = document.createElement("span");

  namenode.className = "nameNode";
  emailnode.className = "emailNode";

  namenode.innerText = "Name : " + GetName.value;
  emailnode.innerText = "EMail : " + GetEmail.value;
  node.appendChild(namenode);
  node.appendChild(emailnode);
  display.appendChild(node);

  //clears input fields
  GetName.value = "";
  GetEmail.value = "";

  //save data
  //para guardar objetos en storage, hacerlos en strings
  localStorage.setItem("participants", display.innerHTML);
  localStorage.setItem("Data", JSON.stringify(Data));

  //para recuperarlos y obtener el objeto original es con parse.
  //console.log(JSON.parse(localStorage.getItem("Data")));
});

//reset list

AddParticipant.addEventListener("reset", function(event) {
  event.preventDefault();
  //clears input fields
  GetName.value = "";
  GetEmail.value = "";

  localStorage.setItem("participants", "");
  localStorage.setItem("Data", "");
  display.innerHTML = "";
});

// check for saved data
let SavedData = localStorage.getItem("participants");

//if there are any saved items update list

if (SavedData) {
  display.innerHTML = SavedData;
}

// make loop

let initialPeople;
let shuffledPeople;

let secretSanta = function() {
  let initialPeople = JSON.parse(localStorage.getItem("Data")).people;

  console.log("initialPeople");
  console.log(initialPeople);
  shuffledPeople = initialPeople.map(people => {
    return people;
  });
  console.log("shuffledPeople");
  console.log(shuffledPeople);

  //shuffle the array
  shuffle(initialPeople);

  //clone the array
  /*-------------------------------
  ERROR

----------------------------------*/
  //shuffledClone = initialPeople.slice();
  //RecivingPerson = shuffledClone.unshift(shuffledClone.pop());
};

StartButton.addEventListener("click", function() {
  secretSanta();

  // for (let i = 0; i < shuffledClone.length; i++) {}
});

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
