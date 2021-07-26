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
    constructor(countryName, infectConfirmed, infectRecovered, infectDeaths, infectPopulation, vaccAdministered, vaccPartially, vaccFully) {
        this.countryName = countryName;
        this.infectConfirmed = infectConfirmed;
        this.infectRecovered = infectRecovered;
        this.infectDeaths = infectDeaths;
        this.infectPopulation = infectPopulation;
        this.vaccAdministered = vaccAdministered;
        this.vaccPartially = vaccPartially;
        this.vaccFully = vaccFully;
    }

    getComparisonConfirmed(referenceObject) {
        return ((this.infectConfirmed / this.infectPopulation - referenceObject.infectConfirmed / referenceObject.infectPopulation) * 100).toFixed(2);
    }

    getComparisonRecovered(referenceObject) {
        return ((this.infectRecovered / this.infectConfirmed - referenceObject.infectRecovered / referenceObject.infectConfirmed) * 100).toFixed(2);
    }

    getComparisonDeaths(referenceObject) {
        return ((this.infectDeaths / this.infectConfirmed - referenceObject.infectDeaths / referenceObject.infectConfirmed) * 100).toFixed(2);
    }

    getComparisonVaccinations(referenceObject) {
        return ((this.vaccAdministered / this.infectPopulation - referenceObject.vaccAdministered / referenceObject.infectPopulation) * 100).toFixed(2);
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
    try {

        // Spinner on
        spinnerSearchingCountry('on');
        // Get country (reverse geocoding)
        const data = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`).then(res => res.json()).then(data => data);
        console.log(data);
        const userCountry = data.country;

        // Spinner off
        spinnerSearchingCountry('off');

        // Handling possible error
        if (userCountry === undefined) {
            displayErrorMessage('getting country name', new Error('Country name is undefined'));
        } else {
            // Load country on search input
            putCountryNameOnSearchBar(userCountry);
        }

    } catch (err) {
        displayErrorMessage('getting country name', new Error(err));
    }
}

const getCountryFlag = async function (countryName) {
    try {
        const flag = await fetch(`https://restcountries.eu/rest/v2/name/${countryName}`).then(res => res.json()).then(data => data[0].flag);
        return flag;
    } catch (err) {
        displayErrorMessage('calling API to get country flag', new Error(err));
    }
}

const removeOldMessage = function () {
    // Remove possible old message
    const oldSuccessMessage = document.querySelector('.message-success');
    const oldErrorMessage = document.querySelector('.message-error');

    if (oldSuccessMessage) {
        oldSuccessMessage.remove();
    }
    if (oldErrorMessage) {
        oldErrorMessage.remove();
    }
}

const displayComparisonSuccessfullyUpdatedMessage = function () {
    // Remove possible old message
    removeOldMessage();
    // Show new message
    if (countries.length > 0) {

        const comparisonSuccessfullyUpdated = `
        <div class="message-success-container">
        <div class="message-success">
        <p>${countries.length > 1 ? `Comparison data updated. ` : ``}New reference country is ${countries[0].countryName}.</p>
        <div class="close-message-btn">
        <img src="./img/delete.png" alt="Close card icon" width="0.625rem" height="0.625rem" id="success-message-close-btn"/>
        </div>
        </div>
        </div>
        `;
        document.querySelector('.countries-container').insertAdjacentHTML('beforebegin', comparisonSuccessfullyUpdated);
        // Delete button event listener
        document.querySelector('.close-message-btn').addEventListener('click', () => document.querySelector('.message-success').remove());
    }
};

const displayErrorMessage = function (errorType, errorMessage) {
    // Remove possible old message
    removeOldMessage(); // FIXME

    // Show new message
    const errorMessageToDisplay = `
        <div class="message-error-container">
            <div class="message-error">
                <p>Error in ${errorType} (${errorMessage.message}).</p>
                <div class="close-message-btn">
                    <img src="./img/delete.png" alt="Close card icon" width="0.625rem" height="0.625rem" id="error-message-close-btn"/>
                </div>
            </div>
        </div>
        `;
    document.querySelector('.countries-container').insertAdjacentHTML('beforebegin', errorMessageToDisplay);
    // Delete button event listener
    document.querySelector('.close-message-btn').addEventListener('click', () => document.querySelector('.message-error').remove());
};

const recalculateComparisons = function () {
    const countryCards = document.querySelectorAll('.full-country-data-container');
    countryCards.forEach((card, i) => {
        const comparisonContainer = card.lastElementChild;
        if (i === 0) {
            // Render "Reference country" for first country card and remove comparison data
            const comparisonHTML = `
                <aside class="country__comparison__list-container">
                    <div class="country__comparison__title reference-country">
                        <h3>Reference country</h3>
                    </div>
                </aside>
            `;
            comparisonContainer.insertAdjacentHTML('afterend', comparisonHTML)
            comparisonContainer.remove();
        } else {
            // Recalculate and render other country cards comparison data
            const comparisonConfirmed = new Intl.NumberFormat().format(countries[i].getComparisonConfirmed(countries[0]));
            const comparisonRecovered = new Intl.NumberFormat().format(countries[i].getComparisonRecovered(countries[0]));
            const comparisonDeaths = new Intl.NumberFormat().format(countries[i].getComparisonDeaths(countries[0]));
            const comparisonVaccinations = new Intl.NumberFormat().format(countries[i].getComparisonVaccinations(countries[0]));
            const comparisonContainerUpdated = `
                <aside class="country__comparison__list-container">
                    <div class="country__comparison__title">
                        <h3>Comparison with first country</h3>
                    </div>
                    <ul>
                        <li class="country__comparison__list__item">
                            <div class="country__comparison__list__item__reference">Confirmed</div>
                            <div class="country__comparison__list__item__value">${(comparisonConfirmed < 0 ? '' : '+') + comparisonConfirmed + '%'}</div>
                        </li>
                        <li class="country__comparison__list__item">
                            <div class="country__comparison__list__item__reference">Recovered</div>
                            <div class="country__comparison__list__item__value">${(comparisonRecovered < 0 ? '' : '+') + comparisonRecovered + '%'}</div>
                        </li>
                        <li class="country__comparison__list__item">
                            <div class="country__comparison__list__item__reference">Deaths</div>
                            <div class="country__comparison__list__item__value">${(comparisonDeaths < 0 ? '' : '+') + comparisonDeaths + '%'}</div>
                        </li>
                        <li class="country__comparison__list__item">
                            <div class="country__comparison__list__item__reference">Vaccinations</div>
                            <div class="country__comparison__list__item__value">${(comparisonVaccinations < 0 ? '' : '+') + comparisonVaccinations + '%'}</div>
                        </li>
                    </ul>
                    </aside>
                    `;
            // Render updated container
            comparisonContainer.insertAdjacentHTML('afterend', comparisonContainerUpdated);
            // Delete old container
            comparisonContainer.remove();
        }
    });
    // Display message about updated data
    displayComparisonSuccessfullyUpdatedMessage();
}

const addEventListenerToCardDeleteButton = function (countryInfo) {
    // Delete card
    const deleteButtons = document.querySelectorAll('.close-card-btn');
    // Newly added country
    deleteButtons[deleteButtons.length - 1].addEventListener('click', () => {
        const countryCards = document.querySelectorAll('.full-country-data-container');
        // Delete array element
        countries.forEach(element => {
            if (element.countryName === countryInfo.countryName) {
                countries.splice(countries.indexOf(element), 1);
            }
        });
        // Delete card HTML
        countryCards.forEach((card, i) => {
            if (card.dataset.id === countryInfo.countryName) {
                card.remove();

                recalculateComparisons();

                if (countryCards.length === 1) {
                    hideResetButton();
                }
            }
        });

    });
};

const displayCountryCard = async function (countryInfo) {

    let comparisonConfirmed;
    let comparisonRecovered;
    let comparisonDeaths;
    let comparisonVaccinations;
    let countryCardHTMLStructure;
    let comparisonHTML;

    if (countries.length > 1) {
        comparisonConfirmed = new Intl.NumberFormat().format(countryInfo.getComparisonConfirmed(countries[0]));
        comparisonRecovered = new Intl.NumberFormat().format(countryInfo.getComparisonRecovered(countries[0]));
        comparisonDeaths = new Intl.NumberFormat().format(countryInfo.getComparisonDeaths(countries[0]));
        comparisonVaccinations = new Intl.NumberFormat().format(countryInfo.getComparisonVaccinations(countries[0]));

        comparisonHTML = `
        <aside class="country__comparison__list-container">
        <div class="country__comparison__title">
        <h3>Comparison with first country</h3>
        </div>
        <ul>
                    <li class="country__comparison__list__item">
                    <div class="country__comparison__list__item__reference">Confirmed</div>
                    <div class="country__comparison__list__item__value">${(comparisonConfirmed < 0 ? '' : '+') + comparisonConfirmed + '%'}</div>
                    </li>
                    <li class="country__comparison__list__item">
                    <div class="country__comparison__list__item__reference">Recovered</div>
                    <div class="country__comparison__list__item__value">${(comparisonRecovered < 0 ? '' : '+') + comparisonRecovered + '%'}</div>
                    </li>
                    <li class="country__comparison__list__item">
                    <div class="country__comparison__list__item__reference">Deaths</div>
                    <div class="country__comparison__list__item__value">${(comparisonDeaths < 0 ? '' : '+') + comparisonDeaths + '%'}</div>
                    </li>
                    <li class="country__comparison__list__item">
                        <div class="country__comparison__list__item__reference">Vaccinations</div>
                        <div class="country__comparison__list__item__value">${(comparisonVaccinations < 0 ? '' : '+') + comparisonVaccinations + '%'}</div>
                        </li>
                        </ul>
            </aside>
            
            </article>
            `;
    } else {
        // Render "Reference country" for first country card
        comparisonHTML = `
            <aside class="country__comparison__list-container">
                    <div class="country__comparison__title reference-country">
                    <h3>Reference country</h3>
                    </div>
                    </aside>
                    
                    </article>
                    `;
    }

    countryCardHTMLStructure = `
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
                    <div class="country__infections__list__item__value">${new Intl.NumberFormat().format(countryInfo.infectConfirmed)}</div>
                    </li>
                    <li class="country__infections__list__item">
                                <div class="country__infections__list__item__reference">Recovered</div>
                                <div class="country__infections__list__item__value">${new Intl.NumberFormat().format(countryInfo.infectRecovered)}</div>
                            </li>
                            <li class="country__infections__list__item">
                            <div class="country__infections__list__item__reference">Deaths</div>
                            <div class="country__infections__list__item__value">${new Intl.NumberFormat().format(countryInfo.infectDeaths)}</div>
                            </li>
                            <li class="country__infections__list__item">
                            <div class="country__infections__list__item__reference">Population</div>
                            <div class="country__infections__list__item__value">${new Intl.NumberFormat().format(countryInfo.infectPopulation)}</div>
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
                        <div class="country__vaccinations__list__item__value">${new Intl.NumberFormat().format(countryInfo.vaccAdministered)}</div>
                        </li>
                            <li class="country__vaccinations__list__item">
                            <div class="country__vaccinations__list__item__reference">Partially Vacc.</div>
                            <div class="country__vaccinations__list__item__value">${new Intl.NumberFormat().format(countryInfo.vaccPartially)}</div>
                            </li>
                            <li class="country__vaccinations__list__item">
                            <div class="country__vaccinations__list__item__reference">Fully Vacc.</div>
                            <div class="country__vaccinations__list__item__value">${new Intl.NumberFormat().format(countryInfo.vaccFully)}</div>
                            </li>
                            </ul>
                            </div>
                            </div>
                            </main>
                            `;

    countryCardHTMLStructure += comparisonHTML;

    document.querySelector('.countries-container').insertAdjacentHTML('beforeend', countryCardHTMLStructure);
    try {
        const flagContainers = document.querySelectorAll('.country__flag-container');
        flagContainers[flagContainers.length - 1].style.backgroundImage = `url(${await getCountryFlag(countryInfo.countryName)})`;

    } catch (err) {
        displayErrorMessage('getting country flag', new Error(err));
    }
    addEventListenerToCardDeleteButton(countryInfo);
}

const hideResetButton = function () {
    document.querySelector('.reset-btn').classList.add('hidden');
}

const displayResetButton = function () {
    document.querySelector('.reset-btn').classList.remove('hidden');
}

const buildCountryCard = async function (country) {
    try {

        const countryInfo = new CountryCard(...await getCovid19Data(country));
        console.log('countryInfo', countryInfo);

        countries.push(countryInfo);
        console.log(countries);

        displayCountryCard(countryInfo);

        displayResetButton();
    } catch (err) {
        displayErrorMessage('getting COVID-19 data to build country statistics', new Error(err));
    }
}

const getCovid19Data = async function (country) {
    try {

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
    } catch (err) {
        displayErrorMessage('getting COVID-19 data', new Error(err));
    }
}

// SECTION Search country

const putCountryNameOnSearchBar = function (country) {
    document.querySelector('#search-bar__input__countryToSearch').value = country;
}

// SECTION Event listeners

navigator.geolocation.getCurrentPosition(getCurrentCoords, getCurrentCoordsError, currentGeolocationOptions);

document.querySelector('.search-bar__btn').addEventListener('click', event => {
    event.preventDefault();
    const countryToSearch = document.querySelector('#search-bar__input__countryToSearch').value;
    // getCovid19Data(countryToSearch);
    buildCountryCard(countryToSearch);
});

document.querySelector('.reset-btn').addEventListener('click', () => {
    document.querySelector('.reset-btn').classList.add('hidden');
    document.querySelectorAll('.full-country-data-container').forEach(element => element.remove());
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SECTION spinners

const spinnerSearchingCountry = function (toggle) {
    // Remove possible old message
    removeOldMessage();

    if (toggle === 'on') {
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

const spinnerSearchingCoords = function (toggle) {
    // Remove possible old message
    removeOldMessage();

    if (toggle === 'on') {
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
spinnerSearchingCoords('on');

const spinnerSearchingCOVID19Data = function (toggle) {
    // Remove possible old message
    removeOldMessage();

    if (toggle === 'on') {
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

const spinnerSearchingCountryCoords = function (toggle) {
    // Remove possible old message
    removeOldMessage();

    if (toggle === 'on') {
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