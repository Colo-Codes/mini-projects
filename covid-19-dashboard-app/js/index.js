// By Damian Demasi (damian.demasi.1@gmail.com) - July 2021

'use strict';

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

const displayCountryCard = function (countryInfo) {
    document.querySelector('.country__flag__title').textContent = countryInfo.countryName;

    const infectionsListItemsValues = document.querySelectorAll('.country__infections__list__item__value');
    infectionsListItemsValues[0].textContent = countryInfo.infectConfirmed;
    infectionsListItemsValues[1].textContent = countryInfo.infectRecovered;
    infectionsListItemsValues[2].textContent = countryInfo.infectDeaths;
    infectionsListItemsValues[3].textContent = countryInfo.infectPopulation;

    const vaccinationsListItemsValues = document.querySelectorAll('.country__vaccinations__list__item__value')
    vaccinationsListItemsValues[0].textContent = countryInfo.vaccAdministered;
    vaccinationsListItemsValues[1].textContent = countryInfo.vaccPartially;
    vaccinationsListItemsValues[2].textContent = countryInfo.vaccFully;

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