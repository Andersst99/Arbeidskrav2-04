const fetchCharacters = async () => {
  try {
    const response = await fetch("https://swapi.dev/api/people/");
    const data = await response.json();
    renderCharacters(data.results);
  } catch (error) {
    console.error("Feil ved henting av karakterer:", error);
  }
};

const fetchCharacterSpecies = async (speciesUrl) => {
  try {
    const response = await fetch(speciesUrl);
    const speciesData = await response.json();
    return speciesData.name; // Return species name
  } catch (error) {
    console.error("Feil ved henting av art:", error);
    return "Unknown species"; // Default "Unknown species" hvis feil oppstår
  }
};

const renderCharacters = (characters) => {
  const container = document.getElementById("characters-container");
  container.innerHTML = ""; // Tømmer containeren før vi legger til nye kort

  characters.forEach(async (character) => {
    const speciesName = await fetchCharacterSpecies(character.species[0]); // Hent artens navn

    const card = document.createElement("div");
    card.classList.add("character-card");

    // Bakgrunnsfarge avhengig av art
    let speciesColor = "white"; // Default color
    if (speciesName === "Wookie") {
      speciesColor = "red";
    } else if (speciesName === "Human") {
      speciesColor = "blue";
    } else if (speciesName === "Droid") {
      speciesColor = "green";
    }

    card.innerHTML = `
          <h2>${character.name}</h2>
          <p>Født: ${character.birth_year}</p>
          <p>Species: ${speciesName}</p>
          <button class="delete-btn">Delete</button>
          <button class="edit-btn">Edit</button>
        `;
    card.style.backgroundColor = speciesColor;

    container.appendChild(card);
  });
};

fetchCharacters();
