const petShop = {
  pets: [],
  vets: [],

  addPet(name, type, age) {
    this.pets.push({ name, type, age });

    updatePetsTable();
    updateSelectOptions();
  },

  addVet(name, specialization) {
    this.vets.push({ name, specialization });

    updateVetsTable();
    updateSelectOptions();
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

  if (name && specialization) {
    petShop.addVet(name, specialization);
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
        `<tr><td>${currentVet.name}</td><td>${currentVet.specialization}</td></tr>`
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
