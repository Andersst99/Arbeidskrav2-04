const fetchCharacters = async () => {
  try {
    const response = await fetch("https://swapi.dev/api/people/");
    const data = await response.json();
    renderCharacters(data.results);
  } catch (error) {
    console.error("Feil ved henting av karakterer:", error);
  }
};

const renderCharacters = (characters) => {
  const container = document.getElementById("characters-container");
  container.innerHTML = ""; // Tøm containeren før vi legger til nye kort
  characters.forEach((character) => {
    const card = document.createElement("div");
    card.classList.add("character-card");
    card.innerHTML = `
        <h2>${character.name}</h2>
        <p>Født: ${character.birth_year}</p>
        <p>Species: ${character.species}</p>
      `;
    container.appendChild(card);
  });
};

fetchCharacters();
