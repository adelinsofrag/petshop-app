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
        handleShowMessage({
          message: "No results or invalid location",
          success: false,
        });

        document.getElementById("addVetButton").disabled = true;
      }
    });
}
