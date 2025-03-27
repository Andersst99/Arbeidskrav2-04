const addCharacter = (character) => {
  // Her pusher man karakter til API og lagrer i localStorage
  localStorage.setItem("characters", JSON.stringify(character));
  fetch("https://swapi.dev/api/people/", {
    method: "POST",
    body: JSON.stringify(character),
    headers: { "Content-Type": "application/json" },
  });
};

const deleteCharacter = (characterId) => {
  // Slette karakter
  const characters = JSON.parse(localStorage.getItem("characters")) || [];
  const updatedCharacters = characters.filter((c) => c.id !== characterId);
  localStorage.setItem("characters", JSON.stringify(updatedCharacters));
};

const editCharacter = (characterId) => {
  // Henter karakteren fra API - skjema
  const characters = JSON.parse(localStorage.getItem("characters")) || [];
  const character = characters.find((c) => c.id === characterId);
  if (character) {
    document.getElementById("name").value = character.name;
    document.getElementById("birth-year").value = character.birth_year;
    document.getElementById("species").value = character.species;
  }
};
