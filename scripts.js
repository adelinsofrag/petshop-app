// onclick alternative from HTML (check Add Pet button)
document
  .querySelector("#addVetButton")
  .addEventListener("click", () => handleAddVetButtonClick());

document.getElementById("vetLocation").addEventListener("input", (event) => {
  const inputValue = event.target.value;

  handleOnInputChange(inputValue);
});
