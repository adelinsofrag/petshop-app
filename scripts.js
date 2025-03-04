const petShop = {
  pets: [],
  vets: [],

  addPet(name, type, age) {
    this.pets.push({ name, type, age });

    updatePetsTable();
    updateSelectOptions();
  },

  addVet(name, specialization, location, callback) {
    validateLocation(location, (response) => {
      if (response.validatedLocation) {
        this.vets.push({
          name,
          specialization,
          location: response.validatedLocation,
        });

        updateVetsTable();
        updateSelectOptions();

        callback({
          success: true,
          validatedLocation: response.validatedLocation,
        });
      } else {
        callback({
          success: false,
          message: response.message,
        });
      }
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
      document.getElementById(
        "assignmentList"
      ).innerHTML += `<li>${vetToBeAssigned.name} is assigned to ${petToBeAssigned.name}`;
    }
  },
};

// DOM handling Logic
function addPet() {
  const name = document.getElementById("petName").value;
  const type = document.getElementById("petType").value;
  const age = document.getElementById("petAge").value;

  if (name && type && age) {
    petShop.addPet(name, type, age);
  }
}

function addVet() {
  const name = document.getElementById("vetName").value;
  const specialization = document.getElementById("vetSpecialization").value;
  const location = document.getElementById("vetLocation").value;

  const validationMessageElement =
    document.getElementById("locationValidation");
  const suggestionsList = document.getElementById("locationSuggestion");

  if (name && specialization && location) {
    petShop.addVet(name, specialization, location, (result) => {
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
    });
  }

  updateVetsTable();
}

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

// onclick alternative from HTML (check Add Pet button)
document
  .querySelector("#addVetButton")
  .addEventListener("click", () => addVet());

// -----------------
// Fetch & validate data
// https://api.geonames.org/searchJSON?q=london&maxRows=2&username=adelin2202
// -----------------
function validateLocation(location, callback) {
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

          li.addEventListener("click", () => {
            // add value to input - what was clicked
            document.getElementById("vetLocation").value = placeDetails;
            suggestionsList.classList.add("hidden");

            callback({
              validatedLocation: placeDetails,
              message: "Location is valid",
            });
          });

          suggestionsList.appendChild(li);
          suggestionsList.classList.remove("hidden");
        });
      } else {
        suggestionsList.innerHTML = `<li class="p-2 hover:bg-zinc-500 cursor-point">No results</li>`;
        suggestionsList.classList.remove("hidden");

        setTimeout(() => {
          suggestionsList.classList.add("hidden");
          callback({
            validatedLocation: null,
            message: "No results or invalid location",
          });
        }, 2500);
      }
    });
}
