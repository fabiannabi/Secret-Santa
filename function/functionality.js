let AddParticipant = document.querySelector("#register-form");
let GetName = document.querySelector("#participant-name");
let GetEmail = document.querySelector("#participant-email");
let GetWish = document.querySelector("#participant-wish");
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
  if (
    GetName.value.length < 1 ||
    GetEmail.value.length < 1 ||
    GetWish.value.length < 1
  ) {
    status.className = "Error";
    status.innerText = "Please Complete The Form";
    return;
  }

  //reset event

  ResetList.addEventListener("click", function() {
    status.className = "Cleared";
    status.innerText = "Succesfully Cleared, Add New Participants";
  });

  // add to the objetc in the format of
  //DATA = {
  //people : [
  //{name : name, email: email , wish: present} ]

  Data.people.push({
    name: GetName.value,
    email: GetEmail.value,
    wish: GetWish.value
  });

  //add person to list
  let node = document.createElement("Li");
  let namenode = document.createElement("span");
  let emailnode = document.createElement("span");
  let wishnode = document.createElement("span");

  namenode.className = "nameNode";
  emailnode.className = "emailNode";
  wishnode.className = "wishNode";

  namenode.innerText = "Name : " + GetName.value;
  emailnode.innerText = "EMail : " + GetEmail.value;
  wishnode.innerText = "Wish For : " + GetWish.value;
  node.appendChild(namenode);
  node.appendChild(emailnode);
  node.appendChild(wishnode);
  display.appendChild(node);

  //clears input fields
  GetName.value = "";
  GetEmail.value = "";
  GetWish.value = "";

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
  GetWish.value = "";

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
  try {
    initialPeople = JSON.parse(localStorage.getItem("Data")).people;
  } catch {
    status.className = "Error";
    status.innerText = "Please Complete The Form";
    return;
  }
  //shuffle the array
  console.log("initialPeople");
  console.log(initialPeople);

  initialPeople = shuffle(initialPeople);
  shuffledPeople = initialPeople.map(people => {
    return people;
  });

  console.log("shuffled");
  console.log(shuffledPeople);
  shuffledPeople.unshift(shuffledPeople.pop());
};

StartButton.addEventListener("click", function() {
  secretSanta();
});

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

//send e-mail

document.querySelector(".send").addEventListener("click", function() {
  if (Data.people.length < 4) {
    status.className = "Error";
    status.innerText = "Please Add At Least 4 People";
    return;
  }

  initialPeople.forEach(people => {
    let recipient = shuffledPeople.shift();
    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "barrothkiller@gmail.com",
      Password: "1adef199-7309-43b4-9509-958512bfc7f3",
      To: people.email,
      From: "barrothkiller@gmail.com",
      Subject: "Intercambio Navideño",
      Body:
        "Hola " +
        people.name +
        " Te toco regalar a : " +
        recipient.name +
        " Esta persona le gustaria lo siguiente : " +
        recipient.wish
    }).then(message => console.log(message));

    console.log(people.name + " le regala a " + recipient.name);
  });
});
