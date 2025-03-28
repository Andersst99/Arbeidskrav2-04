const addCharacter = (character) => {
  localStorage.setItem("characters", JSON.stringify(character));
  fetch("https://swapi.dev/api/people/", {
    method: "POST",
    body: JSON.stringify(character),
    headers: { "Content-Type": "application/json" },
  });
};

const deleteCharacter = (name) => {
  const characters = JSON.parse(localStorage.getItem("characters")) || [];
  const updatedCharacters = characters.filter((c) => c.name !== name);
  localStorage.setItem("characters", JSON.stringify(updatedCharacters));
  fetch("https://swapi.dev/api/people/" + name, {
    method: "DELETE",
  });
};
