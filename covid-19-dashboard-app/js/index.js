// By Damian Demasi (damian.demasi.1@gmail.com) - July 2021

'use strict';

// SECTION Get user location

function getCoords(pos) {
    var crd = pos.coords;
    console.log(pos);
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);

    // Spinner off
    searchingCoords(0);

    getCountry(crd.latitude, crd.longitude);

    // Show map
    getCountryMap('134.489562606981', '-25.7349684916223');
}

function getError(err) {
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

const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

navigator.geolocation.getCurrentPosition(getCoords, getError, geolocationOptions);

// SECTION Get country

const getCountry = async function (lat, lng) {
    // Spinner on
    searchingCountry(1);
    // Get country (reverse geocoding)
    const data = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`).then(res => res.json()).then(data => data);
    console.log(data);
    const userCountry = data.country;

    // const userCountry = 'Argentina';
    console.log(userCountry);

    // Spinner off
    searchingCountry(0);

    // Load country on search input
    putCountryOnInput(userCountry);
}

// SECTION COVID-19 data

const getCovid19Data = async function (country) {
    // Spinner on
    searchingCOVID19Data(1);

    // Get COVID-19 data (https://github.com/M-Media-Group/Covid-19-API)
    const covid19CurrentData = await fetch(`https://covid-api.mmediagroup.fr/v1/cases?country=${country}`).then(res => res.json()).then(data => console.log(data));
    const covid19HistoricalData = await fetch(`https://covid-api.mmediagroup.fr/v1/history?country=${country}&status=deaths`).then(res => res.json()).then(data => console.log(data));
    const covid19HistoricalData2 = await fetch(`https://covid-api.mmediagroup.fr/v1/history?country=${country}&status=confirmed`).then(res => res.json()).then(data => console.log(data));
    const covid19VaccinesData = await fetch(`https://covid-api.mmediagroup.fr/v1/vaccines?country=${country}`).then(res => res.json()).then(data => console.log(data));

    // Spinner off
    searchingCOVID19Data(0);

    getCountryMap(country);
}

// SECTION Map

const getCountryMap = async function (country) {

    // Get lat and lng
    const myMapboxToken = 'pk.eyJ1IjoiY29sb2NvZGVzIiwiYSI6ImNrcmN6dTVteTU0bzQzMXFodTY3OXJ0dTMifQ.QysxDce4hVKfLLO4PMYi9w' // This should be private, but for the purposes of this project, it's OK
    const query = `https://api.mapbox.com/geocoding/v5/mapbox.places/${country}.json?access_token=${myMapboxToken}`

    searchingCountryCoords(1);
    const [lng, lat] = await fetch(query).then(res => res.json()).then(data => data.features[0].center);
    searchingCountryCoords(0);

    // Leaflet Map API
    var myMap = L.map('mapId').setView([lat, lng], 3);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiY29sb2NvZGVzIiwiYSI6ImNrcmN6dTVteTU0bzQzMXFodTY3OXJ0dTMifQ.QysxDce4hVKfLLO4PMYi9w'
    }).addTo(myMap);

    // var marker = L.marker([-30.5, 50]).addTo(myMap);

    // var mapLocation = new L.LatLng(crd.latitude, crd.longitude);
    // var mymap = L.map('mapid').setView([51.505, -0.09], 13);
    // myMap.setView(mapLocation, 13);

    // Mapbox map API (200,000 free tile requests available)

    mapboxgl.accessToken = myMapboxToken;
    var map = new mapboxgl.Map({
        container: 'mapId2', // container id
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [lng, lat], // starting position [lng, lat]
        zoom: 2 // starting zoom
    });
}

// SECTION Search country

const putCountryOnInput = function (country) {
    document.querySelector('#search-bar__input__countryToSearch').value = country;
}

document.querySelector('.search-bar__btn').addEventListener('click', function (event) {
    event.preventDefault();

    const countryToSearch = document.querySelector('#search-bar__input__countryToSearch').value;

    getCovid19Data(countryToSearch);

});

// SECTION spinners

const searchingCountry = function (toggle) {
    if (toggle === 1) {
        // Show
        document.querySelector('.spinner').setAttribute("style", "opacity: 1;");
        document.querySelector('.spinner-legend').textContent = "Searching for country...";
    }
    else {
        // Hide
        document.querySelector('.spinner').setAttribute("style", "opacity: 0;");
        document.querySelector('.spinner-legend').textContent = "";
    }
}

const searchingCoords = function (toggle) {
    if (toggle === 1) {
        // Show
        document.querySelector('.spinner').setAttribute("style", "opacity: 1;");
        document.querySelector('.spinner-legend').textContent = "Searching for coordinates...";
    }
    else {
        // Hide
        document.querySelector('.spinner').setAttribute("style", "opacity: 0;");
        document.querySelector('.spinner-legend').textContent = "";
    }
}
// Spinner on
searchingCoords(1);

const searchingCOVID19Data = function (toggle) {
    if (toggle === 1) {
        // Show
        document.querySelector('.spinner').setAttribute("style", "opacity: 1;");
        document.querySelector('.spinner-legend').textContent = "Searching for COVID-19 data...";
    }
    else {
        // Hide
        document.querySelector('.spinner').setAttribute("style", "opacity: 0;");
        document.querySelector('.spinner-legend').textContent = "";
    }
}

const searchingCountryCoords = function (toggle) {
    if (toggle === 1) {
        // Show
        document.querySelector('.spinner').setAttribute("style", "opacity: 1;");
        document.querySelector('.spinner-legend').textContent = "Searching for country coordinates...";
    }
    else {
        // Hide
        document.querySelector('.spinner').setAttribute("style", "opacity: 0;");
        document.querySelector('.spinner-legend').textContent = "";
    }
}