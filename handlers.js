function handleAddPetButtonClick() {
  const name = document.getElementById("petName").value;
  const type = document.getElementById("petType").value;
  const age = document.getElementById("petAge").value;

  if (name && type && age) {
    petShop.addPet(name, type, age);
  }
}

function handleAddVetButtonClick() {
  const name = document.getElementById("vetName").value;
  const specialization = document.getElementById("vetSpecialization").value;
  const location = document.getElementById("vetLocation").value;

  if (name && specialization && location) {
    petShop.addVet(name, specialization, location);

    handleShowMessage({
      message: "Vet has been successfully added!",
      success: true,
    });
  } else {
    handleShowMessage({
      message: "Please check the empty fields",
      success: false,
    });
  }

  updateVetsTable();
}

function handleOnInputChange(selectedLocation) {
  if (selectedLocation.length > 1) {
    fetchLocationSuggestions(selectedLocation);
  } else {
    hideSuggestionsList();
  }
}

function handleClickSuggestion(placeDetails) {
  // add value to input - what was clicked
  document.getElementById("vetLocation").value = placeDetails;

  hideSuggestionsList();

  handleShowMessage({
    message: "Location is valid",
    success: true,
  });
}

function handleShowMessage({ message, success }) {
  const messageElement = document.getElementById("messageElement");
  messageElement.textContent = message;

  if (success) {
    messageElement.classList.replace("bg-red-200", "bg-green-200");
    messageElement.classList.replace("text-red-700", "text-green-700");
  } else {
    messageElement.classList.replace("bg-green-200", "bg-red-200");
    messageElement.classList.replace("text-green-700", "text-red-700");
  }
  setTimeout(() => messageElement.classList.remove("hidden"), 500);
}

// TODO: renamed with 'handle' prefix for consistency 
function updatePetsTable() {
  const petsTable = document.getElementById("petsTable");

  petsTable.innerHTML = petShop.pets
    .map(
      (currentPet) =>
        `<tr><td>${currentPet.name}</td><td>${currentPet.type}</td><td>${currentPet.age}</td></tr>`
    )
    .join("");
}

function updateVetsTable() {
  const vetsTable = document.getElementById("vetsTable");

  vetsTable.innerHTML = petShop.vets
    .map(
      (currentVet) =>
        `<tr><td>${currentVet.name}</td><td>${currentVet.specialization}</td><td>${currentVet.location}</td></tr>`
    )
    .join("");
}

function assignVetToPet() {
  const petName = document.getElementById("assignPet").value;
  const vetName = document.getElementById("assignVet").value;

  petShop.assignVetToPet(vetName, petName);
}

function updateSelectOptions() {
  document.getElementById("assignPet").innerHTML = petShop.pets
    .map((currentPet) => `<option>${currentPet.name}</option>`)
    .join("");

  document.getElementById("assignVet").innerHTML = petShop.vets
    .map((currentVet) => `<option>${currentVet.name}<option>`)
    .join("");
}

function hideSuggestionsList() {
  document.getElementById("locationSuggestion").classList.add("hidden");
}
