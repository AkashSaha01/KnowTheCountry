import "./App.css";

function App() {
  async function fetchCountry() {
    const countryName = document.getElementById("countryInput").value.trim();
    const resultDiv = document.getElementById("result");

    if (!countryName) {
      resultDiv.innerHTML = "<p>Please enter a country name.</p>";
      return;
    }

    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}`
      );
      if (!response.ok) throw new Error("Country not found");

      const data = await response.json();
      const country = data[0];

      const flag = country.flags.svg;
      const capital = Object.values(country.capital)[0];
      const population = country.population.toLocaleString();
      const languages = Object.values(country.languages).join(", ");
      const currency = Object.values(country.currencies)[0].name;

      resultDiv.innerHTML = `
            <h2>${country.name.common}</h2>
            <img src="${flag}" alt="Flag of ${country.name.common}" width="150">
            <p><strong>Population:</strong> ${population}</p>
            <p><strong>Languages:</strong> ${languages}</p>
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Currency:</strong> ${currency}</p>
        `;
    } catch (error) {
      resultDiv.innerHTML = `<p>${error.message}</p>`;
    }
  }
}

export default App;
