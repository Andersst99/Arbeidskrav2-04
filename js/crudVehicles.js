const saldoEl = document.getElementById("saldo");
const kjøretøyEl = document.getElementById("vehicles-container");
const mineKjøretøyEl = document.getElementById("mine-vehicles");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let saldo = Number(localStorage.getItem("saldo")) || 500000;
let side = 1;
let mineKjøretøy = JSON.parse(localStorage.getItem("mineKjøretøy")) || [];

function oppdaterSaldo() {
    saldoEl.textContent = saldo;
    localStorage.setItem("saldo", saldo);
}

async function hentKjøretøy() {
    kjøretøyEl.innerHTML = "<p>Laster inn...</p>";
    try {
        const res = await fetch(`https://swapi.dev/api/vehicles/?page=${side}`);
        const data = await res.json();
        kjøretøyEl.innerHTML = data.results.slice(0, 6).map(v => `
            <div class="vehicle-card">
                <h3>${v.name}</h3>
                <p>Lastkapasitet: ${v.cargo_capacity}</p>
                <p>Pris: ${v.cost_in_credits} credits</p>
                <button onclick="kjøp(${encodeURIComponent(JSON.stringify(v))})">Kjøp</button>
            </div>
        `).join("");
    } catch (error) {
        kjøretøyEl.innerHTML = "<p>Kunne ikke laste inn kjøretøy.</p>";
        console.error("Feil ved henting av kjøretøy:", error);
    }
}

function kjøp(kjøretøyStr) {
    const kjøretøy = JSON.parse(decodeURIComponent(kjøretøyStr));
    const pris = Number(kjøretøy.cost_in_credits);

    if (pris > saldo) return alert("Du har ikke nok credits!");

    saldo -= pris;
    mineKjøretøy.push(kjøretøy);
    oppdaterLagreOgVis();
}

function selg(navn) {
    const index = mineKjøretøy.findIndex(v => v.name === navn);
    if (index === -1) return;

    saldo += Number(mineKjøretøy[index].cost_in_credits);
    mineKjøretøy.splice(index, 1);
    oppdaterLagreOgVis();
}

function oppdaterLagreOgVis() {
    localStorage.setItem("saldo", saldo);
    localStorage.setItem("mineKjøretøy", JSON.stringify(mineKjøretøy));
    oppdaterSaldo();
    visMineKjøretøy();
}

function visMineKjøretøy() {
    mineKjøretøyEl.innerHTML = mineKjøretøy.length ? mineKjøretøy.map(v => `
        <div class="vehicle-card">
            <h3>${v.name}</h3>
            <p>Lastkapasitet: ${v.cargo_capacity}</p>
            <p>Pris: ${v.cost_in_credits} credits</p>
            <button onclick="selg('${v.name}')">Selg</button>
        </div>
    `).join("") : "<p>Ingen kjøretøy kjøpt.</p>";
}

nextBtn.addEventListener("click", () => { side++; hentKjøretøy(); });
prevBtn.addEventListener("click", () => { if (side > 1) side--; hentKjøretøy(); });

oppdaterSaldo();
hentKjøretøy();
visMineKjøretøy();
