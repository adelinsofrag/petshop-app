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
  
      handleShowMessage({
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