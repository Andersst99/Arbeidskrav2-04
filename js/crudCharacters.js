const addCharacter = (character) => {
  // Push karakter til API og lagre i localStorage
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
