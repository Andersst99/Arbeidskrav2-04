const hentKjøretøyFraAPI = async (side = 1) => {
  try {
    const res = await fetch(`https://swapi.dev/api/vehicles/?page=${side}`);
    if (!res.ok) {
      throw new Error("Kunne ikke hente data (${res.status})");
    }

    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Feil ved henting av kjøretøy:", error);
    return [];
  }
};
