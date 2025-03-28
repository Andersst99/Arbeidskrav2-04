const saldoEl = document.getElementById("saldo");
const kjøretøyEl = document.getElementById("vehicles-container");
const mineKjøretøyEl = document.getElementById("mine-vehicles");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let saldo = Number(localStorage.getItem("saldo")) || 500000;
let side = 1;

function oppdaterSaldo() {
  saldoEl.textContent = saldo;
  localStorage.setItem("saldo", saldo);
}

async function hentKjøretøy() {
  kjøretøyEl.innerHTML = "<p>Laster inn...</p>";
  try {
    const res = await fetch(`https://swapi.dev/api/vehicles/?page=${side}`);
    const data = await res.json();
    kjøretøyEl.innerHTML = "";

    data.results.slice(0, 6).forEach((v) => {
      const card = document.createElement("div");
      card.classList.add("vehicle-card");
      card.innerHTML = `
                <h3>${v.name}</h3>
                <p>Lastkapasitet: ${v.cargo_capacity}</p>
                <p>Pris: ${v.cost_in_credits}</p>
                <button class="kjop-knapp">Kjøp</button>
            `;

      card
        .querySelector(".kjop-knapp")
        .addEventListener("click", () => kjøp(v));
      kjøretøyEl.appendChild(card);
    });
  } catch (error) {
    kjøretøyEl.innerHTML = "<p>Kunne ikke laste inn kjøretøy.</p>";
    console.error("Feil ved henting av kjøretøy:", error);
  }
}

nextBtn.addEventListener("click", () => {
  side++;
  hentKjøretøy();
});
prevBtn.addEventListener("click", () => {
  if (side > 1) side--;
  hentKjøretøy();
});

oppdaterSaldo();
hentKjøretøy();
