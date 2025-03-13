document
  .querySelector("#addVetButton")
  .addEventListener("click", handleAddVetButtonClick);

document
  .getElementById("vetLocation")
  .addEventListener("input", (event) =>
    handleOnInputChange(event.target.value)
  );
