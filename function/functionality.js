let AddParticipant = document.querySelector("#register-form");
let GetName = document.querySelector("#participant-name");
let GetEmail = document.querySelector("#participant-email");
let display = document.querySelector("#participants-list");
let status = document.querySelector(".status-message");

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

  //add person to list
  let node = document.createElement("Li");
  node.innerText = GetName.value;
  display.appendChild(node);

  //clears input fields
  GetName.value = "";
  GetEmail.value = "";

  //save data
  localStorage.setItem("participants", display.innerHTML);
});

// check for saved data
let SavedData = localStorage.getItem("participants");
console.log(SavedData);
//if there are any saved items update list

if (SavedData) {
  display.innerHTML = SavedData;
}
