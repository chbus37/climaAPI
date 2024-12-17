const result = document.querySelector(".result");
const form = document.querySelector(".get-weather");
const inputCity = document.querySelector("#city");
const inputCountry = document.querySelector("#country");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (inputCity.value === "" || inputCountry === "") {
    showError("Todos los campos son obligatorios");
    return;
  }

  callAPI(inputCity.value, inputCountry.value);
});

function callAPI(city, country) {
  const apiId = "ea95321ce438e93131e85bac4b3d80ec";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;

  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((resultado) => {
      if (resultado.cod === "404") {
        showError("Ciudad no encontrada");
      } else {
        limpiarHTML();
        showResult(resultado);
      }
      //   console.log(resultado);
    })
    .catch((error) => {
      console.error(error);
    });
}

function showResult(resultado) {
  const {
    name,
    main: { temp, temp_min, temp_max },
    weather: [arr],
  } = resultado;

  const degrees = conversorGrados(temp);
  const tempMin = conversorGrados(temp_min);
  const tempMax = conversorGrados(temp_max);

  const content = document.createElement("div");
  content.innerHTML = `
  
            <h5>Clima en ${name}</h5>
            <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
            <h2>${degrees}</h2>
            <p>Max: ${tempMax}</p>
            <p>Min: ${tempMin}</p>
  
  `;

  result.appendChild(content);
}

function showError(message) {
  const alert = document.createElement("p");
  alert.classList.add("alert-message");
  alert.innerHTML = message;
  form.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, 3000);
}

function conversorGrados(temp) {
  return parseInt(temp - 273.15);
}

function limpiarHTML() {
  result.innerHTML = "";
}
