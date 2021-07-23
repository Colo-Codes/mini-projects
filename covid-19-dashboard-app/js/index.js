// By Damian Demasi (damian.demasi.1@gmail.com) - July 2021

'use strict';

// TODO Prevent the same country from being added twice

// SECTION Global variables

let countries = [];

const currentGeolocationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

// SECTION CountryCard Class

class CountryCard {
    constructor(countryName, infectConfirmed, infectRecovered, infectDeaths, infectPopulation, vaccAdministered, vaccPartially, vaccFully, compConfirmed = 0, compRecovered = 0, compDeaths = 0, compVaccinations = 0) {
        this.countryName = countryName
        this.infectConfirmed = infectConfirmed
        this.infectRecovered = infectRecovered
        this.infectDeaths = infectDeaths
        this.infectPopulation = infectPopulation
        this.vaccAdministered = vaccAdministered
        this.vaccPartially = vaccPartially
        this.vaccFully = vaccFully
        this.compConfirmed = compConfirmed
        this.compRecovered = compRecovered
        this.compDeaths = compDeaths
        this.compVaccinations = compVaccinations
    }

    getComparisonConfirmed(referenceObject) {
        return ((referenceObject.infectConfirmed / referenceObject.infectPopulation - this.infectConfirmed / this.infectPopulation) * 100).toFixed(2);
    }

    getComparisonRecovered(referenceObject) {
        return ((referenceObject.infectRecovered / referenceObject.infectConfirmed - this.infectRecovered / this.infectConfirmed) * 100).toFixed(2);
    }

    getComparisonDeaths(referenceObject) {
        return ((referenceObject.infectDeaths / referenceObject.infectConfirmed - this.infectDeaths / this.infectConfirmed) * 100).toFixed(2);
    }

    getComparisonVaccinations(referenceObject) {
        return ((referenceObject.vaccAdministered / referenceObject.infectPopulation - this.vaccAdministered / this.infectPopulation) * 100).toFixed(2);
    }
}

// const countryCard = new CountryCard(country); // TODO Push to countries array


// SECTION Get user location

function getCurrentCoords(pos) {
    var crd = pos.coords;
    console.log(pos);
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    spinnerSearchingCoords('off');
    getCountryName(crd.latitude, crd.longitude);
}

function getCurrentCoordsError(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    /*
function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}
    */
}



const getCountryName = async function (lat, lng) {
    // Spinner on
    spinnerSearchingCountry('on');
    // Get country (reverse geocoding)
    const data = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`).then(res => res.json()).then(data => data);
    console.log(data);
    const userCountry = data.country;

    // const userCountry = 'Argentina';
    console.log(userCountry);

    // Spinner off
    spinnerSearchingCountry('off');

    // Load country on search input
    putCountryNameOnSearchBar(userCountry);
}

const getCountryFlag = async function (countryName) {
    const flag = await fetch(`https://restcountries.eu/rest/v2/name/${countryName}`).then(res => res.json()).then(data => data[0].flag);
    console.log('THIS IS THE FLAG:', flag);
    return flag;
}

// const deleteCountryCard = function (countryCard) {
//     countryCard.remove();
// }

const displayCountryCard = async function (countryInfo) {

    const countryCardHTMLStructure = `
        <article class="full-country-data-container" data-id="${countryInfo.countryName}">
            <main class="country-container">
                <div class="close-card-btn">
                    <img src="./img/delete.png" alt="Close card icon" width="16px" height="16px"/>
                </div>
                <div class="country__flag-container">
                    <div class="country__flag__flag-empty"></div>
                    <div class="country__flag__title__container">
                        <div class="country__flag__title">${countryInfo.countryName}</div>
                    </div>
                </div>
                <div class="country__infections-container">
                    <div class="country__infections__title">
                        <h3>COVID-19 infections</h3>
                    </div>
                    <div class="country__infections__list-container">
                        <ul>
                            <li class="country__infections__list__item">
                                <div class="country__infections__list__item__reference">Confirmed</div>
                                <div class="country__infections__list__item__value">${countryInfo.infectConfirmed}</div>
                            </li>
                            <li class="country__infections__list__item">
                                <div class="country__infections__list__item__reference">Recovered</div>
                                <div class="country__infections__list__item__value">${countryInfo.infectRecovered}</div>
                            </li>
                            <li class="country__infections__list__item">
                                <div class="country__infections__list__item__reference">Deaths</div>
                                <div class="country__infections__list__item__value">${countryInfo.infectDeaths}</div>
                            </li>
                            <li class="country__infections__list__item">
                                <div class="country__infections__list__item__reference">Population</div>
                                <div class="country__infections__list__item__value">${countryInfo.infectPopulation}</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="country__vaccinations-container">
                    <div class="country__vaccinations__title">
                        <h3>COVID-19 vaccinations</h3>
                    </div>
                    <div class="country__vaccinations__list-container">
                        <ul>
                            <li class="country__vaccinations__list__item">
                                <div class="country__vaccinations__list__item__reference">Administered</div>
                                <div class="country__vaccinations__list__item__value">${countryInfo.vaccAdministered}</div>
                            </li>
                            <li class="country__vaccinations__list__item">
                                <div class="country__vaccinations__list__item__reference">Partially Vacc.</div>
                                <div class="country__vaccinations__list__item__value">${countryInfo.vaccPartially}</div>
                            </li>
                            <li class="country__vaccinations__list__item">
                                <div class="country__vaccinations__list__item__reference">Fully Vacc.</div>
                                <div class="country__vaccinations__list__item__value">${countryInfo.vaccFully}</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
            <aside class="country__comparison__list-container">
                <div class="country__comparison__title">
                    <h3>Comparison with first country</h3>
                </div>
                <ul>
                    <li class="country__comparison__list__item"></li>
                    <li class="country__comparison__list__item"></li>
                    <li class="country__comparison__list__item"></li>
                    <li class="country__comparison__list__item"></li>
                </ul>
            </aside>
        </article>
    `;

    // document.querySelector('.country__flag__title').textContent = countryInfo.countryName;


    // const infectionsListItemsValues = document.querySelectorAll('.country__infections__list__item__value');
    // infectionsListItemsValues[0].textContent = countryInfo.infectConfirmed;
    // infectionsListItemsValues[1].textContent = countryInfo.infectRecovered;
    // infectionsListItemsValues[2].textContent = countryInfo.infectDeaths;
    // infectionsListItemsValues[3].textContent = countryInfo.infectPopulation;

    // const vaccinationsListItemsValues = document.querySelectorAll('.country__vaccinations__list__item__value')
    // vaccinationsListItemsValues[0].textContent = countryInfo.vaccAdministered;
    // vaccinationsListItemsValues[1].textContent = countryInfo.vaccPartially;
    // vaccinationsListItemsValues[2].textContent = countryInfo.vaccFully;


    document.querySelector('.countries-container').insertAdjacentHTML('beforeend', countryCardHTMLStructure);

    const flagContainers = document.querySelectorAll('.country__flag-container');
    flagContainers[flagContainers.length - 1].style.backgroundImage = `url(${await getCountryFlag(countryInfo.countryName)})`;



    const closeButtons = document.querySelectorAll('.close-card-btn');
    // Newly added country
    closeButtons[closeButtons.length - 1].addEventListener('click', () => {
        const countryCard = document.querySelectorAll('.full-country-data-container');
        countryCard.forEach(card => {
            if (card.dataset.id === countryInfo.countryName)
                card.remove();

        });
        // deleteCountryCard(document.querySelectorAll('.full-country-data-container')[closeButtons.length - 1]);
        // document.querySelectorAll('.full-country-data-container')[closeButtons.length - 1].remove();
        // document.querySelectorAll('.full-country-data-container')[closeButtons.length - 1].remove();
    });
}



const buildCountryCard = async function (country) {
    const countryInfo = new CountryCard(...await getCovid19Data(country));
    console.log('countryInfo', countryInfo);

    countries.push(countryInfo);
    console.log(countries);

    displayCountryCard(countryInfo);
}

const getCovid19Data = async function (country) {
    let countryCOVID19Data = []; // Array

    // Spinner on
    spinnerSearchingCOVID19Data('on');

    // Get COVID-19 data (https://github.com/M-Media-Group/Covid-19-API)
    const covid19CurrentData = await fetch(`https://covid-api.mmediagroup.fr/v1/cases?country=${country}`).then(res => res.json()).then(data => {
        console.log(data);
        countryCOVID19Data.push(data.All.country);
        countryCOVID19Data.push(data.All.confirmed);
        countryCOVID19Data.push(data.All.recovered);
        countryCOVID19Data.push(data.All.deaths);
        countryCOVID19Data.push(data.All.population);
    });

    const covid19VaccinesData = await fetch(`https://covid-api.mmediagroup.fr/v1/vaccines?country=${country}`).then(res => res.json()).then(data => {
        console.log(data);
        countryCOVID19Data.push(data.All.administered);
        countryCOVID19Data.push(data.All.people_partially_vaccinated);
        countryCOVID19Data.push(data.All.people_vaccinated);
    });

    // Spinner off
    spinnerSearchingCOVID19Data('off');

    console.log('countryCOVID19Data:', countryCOVID19Data)

    return countryCOVID19Data;
}

// SECTION Search country

const putCountryNameOnSearchBar = function (country) {
    document.querySelector('#search-bar__input__countryToSearch').value = country;
}

// SECTION Event listeners

navigator.geolocation.getCurrentPosition(getCurrentCoords, getCurrentCoordsError, currentGeolocationOptions);

document.querySelector('.search-bar__btn').addEventListener('click', function (event) {
    event.preventDefault();
    const countryToSearch = document.querySelector('#search-bar__input__countryToSearch').value;
    // getCovid19Data(countryToSearch);
    buildCountryCard(countryToSearch);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SECTION spinners

const spinnerSearchingCountry = function (toggle) {
    if (toggle === 'on') {
        // Show
        document.querySelector('.spinner').setAttribute("style", "opacity: 1;");
        document.querySelector('.spinner-legend').textContent = "spinnerSearching for country...";
    }
    else {
        // Hide
        document.querySelector('.spinner').setAttribute("style", "opacity: 0;");
        document.querySelector('.spinner-legend').textContent = "";
    }
}

const spinnerSearchingCoords = function (toggle) {
    if (toggle === 'on') {
        // Show
        document.querySelector('.spinner').setAttribute("style", "opacity: 1;");
        document.querySelector('.spinner-legend').textContent = "spinnerSearching for coordinates...";
    }
    else {
        // Hide
        document.querySelector('.spinner').setAttribute("style", "opacity: 0;");
        document.querySelector('.spinner-legend').textContent = "";
    }
}
// Spinner on
spinnerSearchingCoords('on');

const spinnerSearchingCOVID19Data = function (toggle) {
    if (toggle === 'on') {
        // Show
        document.querySelector('.spinner').setAttribute("style", "opacity: 1;");
        document.querySelector('.spinner-legend').textContent = "spinnerSearching for COVID-19 data...";
    }
    else {
        // Hide
        document.querySelector('.spinner').setAttribute("style", "opacity: 0;");
        document.querySelector('.spinner-legend').textContent = "";
    }
}

const spinnerSearchingCountryCoords = function (toggle) {
    if (toggle === 'on') {
        // Show
        document.querySelector('.spinner').setAttribute("style", "opacity: 1;");
        document.querySelector('.spinner-legend').textContent = "spinnerSearching for country coordinates...";
    }
    else {
        // Hide
        document.querySelector('.spinner').setAttribute("style", "opacity: 0;");
        document.querySelector('.spinner-legend').textContent = "";
    }
}