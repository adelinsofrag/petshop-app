function handleAddPetButtonClick() {
  const name = document.getElementById("petName").value.trim();
  const type = document.getElementById("petType").value.trim();
  const age = parseInt(document.getElementById("petAge").value.trim(), 10);

  if (name && type && !isNaN(age) && age > 0) {
    petShop.addPet(name, type, age);
  } else {
    handleShowMessage({ message: "Invalid pet details!", success: false });
  }
}

function handleAddVetButtonClick() {
  const name = document.getElementById("vetName").value.trim();
  const specialization = document
    .getElementById("vetSpecialization")
    .value.trim();
  const location = document.getElementById("vetLocation").value.trim();

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
}

function handleOnInputChange(selectedLocation) {
  if (selectedLocation.length > 1) {
    fetchLocationSuggestions(selectedLocation);
  } else {
    hideSuggestionsList();
  }
}

function handleClickSuggestion(placeDetails) {
  document.getElementById("vetLocation").value = placeDetails;
  hideSuggestionsList();
  handleShowMessage({ message: "Location is valid", success: true });
}

function handleShowMessage({ message, success }) {
  const messageElement = document.getElementById("messageElement");
  messageElement.textContent = message;
  messageElement.classList.remove("hidden");

  if (success) {
    messageElement.classList.replace("bg-red-200", "bg-green-200");
    messageElement.classList.replace("text-red-700", "text-green-700");
  } else {
    messageElement.classList.replace("bg-green-200", "bg-red-200");
    messageElement.classList.replace("text-green-700", "text-red-700");
  }

  setTimeout(() => {
    messageElement.classList.add("hidden");
  }, 3000);
}

function updatePetsTable() {
  const petsTable = document.getElementById("petsTable");
  const pets = petShop.data.pets;

  if (pets.length > 0) {
    petsTable.innerHTML = pets
      .map(
        (pet) =>
          `<tr><td>${pet.name}</td><td>${pet.type}</td><td>${pet.age}</td></tr>`
      )
      .join("");
  } else {
    petsTable.innerHTML = `<tr><td colspan="3" class="bg-yellow-800 text-center py-2.5">No pets yet</td></tr>`;
  }
}

function updateVetsTable() {
  const vetsTable = document.getElementById("vetsTable");
  const vets = petShop.data.vets;

  if (vets.length > 0) {
    vetsTable.innerHTML = vets
      .map(
        (vet) =>
          `<tr><td>${vet.name}</td><td>${vet.specialization}</td><td>${vet.location}</td></tr>`
      )
      .join("");
  } else {
    vetsTable.innerHTML = `<tr><td colspan="3" class="bg-yellow-800 text-center py-2.5">No vets yet</td></tr>`;
  }
}

function assignVetToPet() {
  const petName = document.getElementById("assignPet").value;
  const vetName = document.getElementById("assignVet").value;

  if (petName && vetName) {
    petShop.assignVetToPet(vetName, petName);
  } else {
    handleShowMessage({
      message: "Please select a pet and a vet!",
      success: false,
    });
  }
}

function updateSelectOptions() {
  document.getElementById("assignPet").innerHTML = petShop.data.pets
    .map((pet) => `<option>${pet.name}</option>`)
    .join("");

  document.getElementById("assignVet").innerHTML = petShop.data.vets
    .map((vet) => `<option>${vet.name}</option>`)
    .join(""); // Fixed missing closing tag
}

function hideSuggestionsList() {
  document.getElementById("locationSuggestion").classList.add("hidden");
}
