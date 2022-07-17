// Import stylesheets
import './style.css';

// Write Javascript code!
//const appDiv = document.getElementById('app');
const timeDiv = document.getElementById('timeInfo');
const btnPesquisar = document.getElementById('go');
const searchInput = document.getElementById('cityName');
const location = document.getElementById('location');
//appDiv.innerHTML = `<h1>JS Starter</h1>`;

btnPesquisar.addEventListener('click', pesquisar);
searchInput.addEventListener('keypress', (ev) => {
  if (ev.key === 'Enter') pesquisar();
});

function pesquisar() {
  let searchURL =
    'https://api.weatherapi.com/v1/current.json?key=467fd5822fc54c6a965223404221607&q=';
  searchURL += searchInput.value;
  fetch(searchURL)
    .then((res) => res.json())
    .then((d) => {
      console.log(d);
      console.log(timeDiv);
      timeDiv.innerHTML = renderTimeElement(d.current);
      renderLocation(d.location);
    })
    .catch((err) => console.log(err));
}

function renderTimeElement({
  condition: { icon: imgIcon, text: text },
  temp_c: temperatura,
  feelslike_c: sensacaoTermica,
  humidity: humidadeDoAr,
  wind_kph: ventos,
  precip_mm: chuva,
}) {
  const timeInfoTemplate = `
    <div>
    <img src="https:${imgIcon}" alt="${text}"></img>
    <p>
    temperatura: ${temperatura}<br>
    sensação térmica: ${sensacaoTermica}<br>
    humidade: ${humidadeDoAr}%<br>
    ventos: ${ventos} km/h<br>
    chuva: ${chuva} mm<br>
    </p>
    </div>
  `;
  return timeInfoTemplate;
}

function renderLocation({
  country: pais,
  name: cidade,
  region: regiao,
  localtime: data,
}) {
  const locationTemplate = `
  <p>${cidade}/${regiao}
  <small>${pais}</small>
  </p>
  `;
  location.innerHTML = locationTemplate;
}

/**
 * 
 * Current:
feelslike_c: 17
feelslike_f: 62.6
gust_kph: 21.2
gust_mph: 13.2
humidity: 88
is_day: 0
last_updated: "2022-07-17 18:45"
last_updated_epoch: 1658094300
precip_in: 0
precip_mm: 0
pressure_in: 30.21
pressure_mb: 1023
temp_c: 17
temp_f: 62.6
uv: 6
vis_km: 6
vis_miles: 3
wind_degree: 120
wind_dir: "ESE"
wind_kph: 16.9
wind_mph: 10.5
Location:
country: "Brazil"
lat: -23.53
localtime: "2022-07-17 19:08"
localtime_epoch: 1658095690
lon: -46.62
name: "San Paulo"
region: "Sao Paulo"
tz_id: "America/Sao_Paulo"
 */
