const petShop = {
  pets: [],
  vets: [],

  addPet(name, type, age) {
    this.pets.push({ name, type, age });

    updatePetsTable();
    updateSelectOptions();
  },

  addVet(name, specialization, location) {
    this.vets.push({
      name,
      specialization,
      location,
    });

    updateVetsTable();
    updateSelectOptions();

    showMessage({
      success: true,
      validatedLocation: location,
    });
  },

  assignVetToPet(vetName, petName) {
    const vetToBeAssigned = this.vets.find(
      (currentVet) => currentVet.name === vetName
    );

    const petToBeAssigned = this.pets.find(
      (currentPet) => currentPet.name === petName
    );

    if (vetToBeAssigned && petToBeAssigned) {
      document.getElementById("assignmentListMessage").classList.add("hidden");

      document.getElementById(
        "assignmentList"
      ).innerHTML += `<li><span class="font-bold">${vetToBeAssigned.name}</span> (${vetToBeAssigned.location}) is assigned to <span class="font-bold">${petToBeAssigned.name}</span>`;
    }
  },
};

// DOM handling Logic
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

    showMessage({
      message: "Vet has been successfully added!",
      success: true,
    });
  } else {
    showMessage({
      message: "Please check the empty fields",
      success: false,
    });
  }

  updateVetsTable();
}

/*
(result) => {
      if (result.success) {
        // add validation message in vet section
        validationMessageElement.textContent = `Vet has been successfully added in ${result.validatedLocation}`;
        validationMessageElement.classList.add("text-green-500");

        // cleanup input(s)
        // .value = ""

        setTimeout(
          () => validationMessageElement.classList.add("hidden"),
          2500
        );
      } else {
        // add invalidation message in vet section
        validationMessageElement.textContent = result.message;
        validationMessageElement.classList.add("text-red-500");
      }
    }
*/

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

function fetchLocationSuggestions(location) {
  const baseURL = "http://api.geonames.org";
  const pathToSearch = "searchJSON";
  const username = "adelin2202";

  fetch(
    `${baseURL}/${pathToSearch}?q=${location}&maxRows=5&username=${username}`
  )
    .then((response) => response.json())
    .then((data) => {
      const suggestionsList = document.getElementById("locationSuggestion");
      suggestionsList.innerHTML = "";

      const dataHasResults = data.geonames.length > 0;
      if (data.geonames && dataHasResults) {
        data.geonames.forEach((place) => {
          const placeDetails = `${place.name}, ${place.countryName}`;

          const li = document.createElement("li");

          li.textContent = placeDetails;
          li.classList.add("p-2", "hover:bg-zinc-500", "cursor-point");

          li.addEventListener("click", () =>
            handleClickSuggestion(placeDetails)
          );

          suggestionsList.appendChild(li);
          suggestionsList.classList.remove("hidden");
        });
      } else {
        showMessage({
          message: "No results or invalid location",
          success: false,
        });

        document.getElementById('addVetButton').disabled = true
      }
    });
}

function onInputChange(selectedLocation) {
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

  showMessage({
    message: "Location is valid",
    success: true,
  });
}

function showMessage({ message, success }) {
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

function hideSuggestionsList() {
  document.getElementById("locationSuggestion").classList.add("hidden");
}

// -------------
// Events area
// -------------

// onclick alternative from HTML (check Add Pet button)
document
  .querySelector("#addVetButton")
  .addEventListener("click", () => handleAddVetButtonClick());

// -----------------
// Fetch & validate data
// https://api.geonames.org/searchJSON?q=london&maxRows=2&username=adelin2202
// -----------------

document.getElementById("vetLocation").addEventListener("input", (event) => {
  const inputValue = event.target.value;

  onInputChange(inputValue);
});
