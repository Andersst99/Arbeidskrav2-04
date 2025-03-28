// Mock localStorage
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

import {
  fetchCharacters,
  renderCharacters,
  filterCharactersBySpecies,
} from "../js/characters";

// Test 1: fetchCharacters denne testen skal hente karakter fra API -
// sjekker om den får data tilbake
test("fetchCharacters henter karakterer fra API", async () => {
  const data = await fetchCharacters();
  expect(data).toBeDefined();
  expect(data.results.length).toBeGreaterThan(0);
});

// Test 2: renderCharacters denne testen viser karakterene i DOM -
// sjekker om karakteren er der den skal være
test("renderCharacters viser karakterene i DOM", () => {
  document.body.innerHTML = `<div id="characters-container"></div>`;
  const characters = [
    { name: "Luke Skywalker", birth_year: "19BBY", species: ["Human"] },
  ];
  renderCharacters(characters);

  const characterCard = document.querySelector(".character-card");
  expect(characterCard).toBeDefined();
  expect(characterCard.querySelector("h2").textContent).toBe("Luke Skywalker");
});

// Test 3: renderCharacters håndterer karakterer uten species -
// skal komme uknown species hvis det ikke står noe i species feltet på karakteren
test("renderCharacters håndterer karakterer uten species", () => {
  document.body.innerHTML = `<div id="characters-container"></div>`;
  const characters = [
    { name: "Luke Skywalker", birth_year: "19BBY", species: [] },
  ];
  renderCharacters(characters);

  const characterCard = document.querySelector(".character-card");
  expect(characterCard).toBeDefined();
  expect(characterCard.querySelector("p").textContent).toBe(
    "Species: Unknown species"
  );
});

// Test 4: renderCharacters tildeler riktig bakgrunnsfarge basert på hvilken type species karakteren er
test("renderCharacters tildeler riktig bakgrunnsfarge basert på species", () => {
  document.body.innerHTML = `<div id="characters-container"></div>`;
  const characters = [
    { name: "Chewbacca", birth_year: "200BBY", species: ["Wookiee"] },
  ];
  renderCharacters(characters);

  const characterCard = document.querySelector(".character-card");
  expect(characterCard).toHaveStyle("background-color: red");
});

// Test 5: filterCharacters filtrerer karakterene etter species
test("filterCharacters filtrerer karakterene etter species", () => {
  document.body.innerHTML = `
      <select id="species-filter">
        <option value="All">All</option>
        <option value="Droid">Droid</option>
        <option value="Human">Human</option>
      </select>
      <div id="characters-container"></div>
    `;

  const characters = [
    { name: "Luke Skywalker", birth_year: "19BBY", species: "Human" },
    { name: "R2-D2", birth_year: "33BBY", species: "Droid" },
  ];

  renderCharacters(characters);

  const speciesFilter = document.getElementById("species-filter");
  speciesFilter.value = "Droid";

  const filteredCharacters = characters.filter(
    (character) => character.species === speciesFilter.value
  );

  renderCharacters(filteredCharacters);

  const characterCards = document.querySelectorAll(".character-card");
  expect(characterCards.length).toBe(1);
  expect(characterCards[0].querySelector("h2").textContent).toBe("R2-D2");
});
