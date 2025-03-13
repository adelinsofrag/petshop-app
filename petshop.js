const petShop = {
  lsKey: "petshop",
  data: { pets: [], vets: [], assignments: [] },

  init() {
    this.loadFromLocalStorage();
    this.updateAndRender();
  },

  loadFromLocalStorage() {
    const storedData = JSON.parse(localStorage.getItem(this.lsKey)) || {};
    this.data = { ...this.data, ...storedData };
  },

  saveToLocalStorage() {
    localStorage.setItem(this.lsKey, JSON.stringify(this.data));
  },

  addPet(name, type, age) {
    this.data.pets.push({ name, type, age });
    this.updateAndRender();
  },

  addVet(name, specialization, location) {
    this.data.vets.push({ name, specialization, location });
    this.updateAndRender();
  },

  removePet(petName) {
    this.data.pets = this.data.pets.filter((pet) => pet.name !== petName);
    this.data.assignments = this.data.assignments.filter(
      (a) => a.petName !== petName
    );
    this.updateAndRender();
  },

  assignVetToPet(vetName, petName) {
    const vet = this.data.vets.find((v) => v.name === vetName);
    const pet = this.data.pets.find((p) => p.name === petName);
    if (vet && pet) {
      this.data.assignments.push({ vetName, petName, location: vet.location });
      this.updateAndRender();
    }
  },

  updateAndRender() {
    this.saveToLocalStorage();
    updatePetsTable();
    updateVetsTable();
    updateAssignmentList();
    updateSelectOptions();
  },
};

function updateAssignmentList() {
  const assignmentList = document.getElementById("assignmentList");
  if (petShop.data.assignments.length > 0) {
    assignmentList.innerHTML = petShop.data.assignments
      .map(
        (a) =>
          `<li><span class="font-bold">${a.vetName}</span> (${a.location}) is assigned to <span class="font-bold">${a.petName}</span></li>`
      )
      .join("");
  } else {
    assignmentList.innerHTML =
      '<li class="bg-yellow-800 text-center py-2.5">No vet assigned yet</li>';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  petShop.init();
});
