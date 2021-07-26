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
    getCountryName(crd.latitude, crd.longitude);
}

function getCurrentCoordsError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            displayErrorMessage('automatic geolocation', new Error('User denied the request for Geolocation'));
            break;
        case error.POSITION_UNAVAILABLE:
            displayErrorMessage('automatic geolocation', new Error('Location information is unavailable'));
            break;
        case error.TIMEOUT:
            displayErrorMessage('automatic geolocation', new Error('The request to get user location timed out'));
            break;
        case error.UNKNOWN_ERROR:
            displayErrorMessage('automatic geolocation', new Error('An unknown error occurred'));
            break;
    }
}

const getCountryName = async function (lat, lng) {
    try {
        // Get country (reverse geocoding)
        spinnerSearchingCountry('on');
        const data = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`).then(res => res.json()).then(data => data);
        const userCountry = data.country;
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
                            <div class="country__comparison__list__item__value">${!isFinite(comparisonConfirmed) ? 'no data' : ((comparisonConfirmed < 0 ? '' : '+') + comparisonConfirmed + '%')}</div>
                        </li>
                        <li class="country__comparison__list__item">
                            <div class="country__comparison__list__item__reference">Recovered</div>
                            <div class="country__comparison__list__item__value">${!isFinite(comparisonRecovered) ? 'no data' : ((comparisonRecovered < 0 ? '' : '+') + comparisonRecovered + '%')}</div>
                        </li>
                        <li class="country__comparison__list__item">
                            <div class="country__comparison__list__item__reference">Deaths</div>
                            <div class="country__comparison__list__item__value">${!isFinite(comparisonDeaths) ? 'no data' : ((comparisonDeaths < 0 ? '' : '+') + comparisonDeaths + '%')}</div>
                        </li>
                        <li class="country__comparison__list__item">
                            <div class="country__comparison__list__item__reference">Vaccinations</div>
                            <div class="country__comparison__list__item__value">${!isFinite(comparisonVaccinations) ? 'no data' : ((comparisonVaccinations < 0 ? '' : '+') + comparisonVaccinations + '%')}</div>
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
                // Recalculate if deleted country is the first one
                if (i === 0) {
                    recalculateComparisons();
                }

                if (countryCards.length <= 1) {
                    hideResetButton();
                }
            }
        });

        checkCountryLimitReached();
    });
};

const checkCountryLimitReached = function () {
    // Prevent further countries from being added (4 countries maximum)
    const searchButton = document.querySelector('.search-bar__btn');
    const inputField = document.getElementById('search-bar__input__countryToSearch');
    if (countries.length >= 4) {
        inputField.disabled = true;
        inputField.value = 'Country comparison limit reached';
        searchButton.classList.add('hidden');
    } else {
        if (searchButton.classList.contains('hidden')) {
            inputField.disabled = false;
            inputField.value = '';
            searchButton.classList.remove('hidden');
        }
    }
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
                    <div class="country__comparison__list__item__value">${!isFinite(comparisonConfirmed) ? 'no data' : (comparisonConfirmed < 0 ? '' : '+') + comparisonConfirmed + '%'}</div>
                    </li>
                    <li class="country__comparison__list__item">
                    <div class="country__comparison__list__item__reference">Recovered</div>
                    <div class="country__comparison__list__item__value">${!isFinite(comparisonRecovered) ? 'no data' : (comparisonRecovered < 0 ? '' : '+') + comparisonRecovered + '%'}</div>
                    </li>
                    <li class="country__comparison__list__item">
                    <div class="country__comparison__list__item__reference">Deaths</div>
                    <div class="country__comparison__list__item__value">${!isFinite(comparisonDeaths) ? 'no data' : (comparisonDeaths < 0 ? '' : '+') + comparisonDeaths + '%'}</div>
                    </li>
                    <li class="country__comparison__list__item">
                        <div class="country__comparison__list__item__reference">Vaccinations</div>
                        <div class="country__comparison__list__item__value">${!isFinite(comparisonVaccinations) ? 'no data' : (comparisonVaccinations < 0 ? '' : '+') + comparisonVaccinations + '%'}</div>
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

    // FIXME data-id could be a country name with spaces
    countryCardHTMLStructure = `
        <article class="full-country-data-container" data-id="${countryInfo.countryName === undefined ? 'Name-not-found' : countryInfo.countryName}">
        <main class="country-container">
        <div class="close-card-btn">
        <img src="./img/delete.png" alt="Close card icon" width="16px" height="16px"/>
                </div>
                <div class="country__flag-container">
                    <div class="country__flag__flag-empty"></div>
                    <div class="country__flag__title__container">
                    <div class="country__flag__title">${countryInfo.countryName === undefined ? 'Name not found' : countryInfo.countryName}</div>
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
                    <div class="country__infections__list__item__value">${!isFinite(countryInfo.infectConfirmed) ? 'no data' : new Intl.NumberFormat().format(countryInfo.infectConfirmed)
        }</div>
                    </li >
                    <li class="country__infections__list__item">
                                <div class="country__infections__list__item__reference">Recovered</div>
                                <div class="country__infections__list__item__value">${!isFinite(countryInfo.infectRecovered) ? 'no data' : new Intl.NumberFormat().format(countryInfo.infectRecovered)}</div>
                            </li>
                            <li class="country__infections__list__item">
                            <div class="country__infections__list__item__reference">Deaths</div>
                            <div class="country__infections__list__item__value">${!isFinite(countryInfo.infectDeaths) ? 'no data' : new Intl.NumberFormat().format(countryInfo.infectDeaths)}</div>
                            </li>
                            <li class="country__infections__list__item">
                            <div class="country__infections__list__item__reference">Population</div>
                            <div class="country__infections__list__item__value">${!isFinite(countryInfo.infectPopulation) ? 'no data' : new Intl.NumberFormat().format(countryInfo.infectPopulation)}</div>
                            </li>
                            </ul >
                            </div >
                </div >
    <div class="country__vaccinations-container">
        <div class="country__vaccinations__title">
            <h3>COVID-19 vaccinations</h3>
        </div>
        <div class="country__vaccinations__list-container">
            <ul>
                <li class="country__vaccinations__list__item">
                    <div class="country__vaccinations__list__item__reference">Administered</div>
                    <div class="country__vaccinations__list__item__value">${!isFinite(countryInfo.vaccAdministered) ? 'no data' : new Intl.NumberFormat().format(countryInfo.vaccAdministered)}</div>
                </li>
                <li class="country__vaccinations__list__item">
                    <div class="country__vaccinations__list__item__reference">Partially Vacc.</div>
                    <div class="country__vaccinations__list__item__value">${!isFinite(countryInfo.vaccPartially) ? 'no data' : new Intl.NumberFormat().format(countryInfo.vaccPartially)}</div>
                </li>
                <li class="country__vaccinations__list__item">
                    <div class="country__vaccinations__list__item__reference">Fully Vacc.</div>
                    <div class="country__vaccinations__list__item__value">${!isFinite(countryInfo.vaccFully) ? 'no data' : new Intl.NumberFormat().format(countryInfo.vaccFully)}</div>
                </li>
            </ul>
        </div>
    </div>
                            </main >
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

    checkCountryLimitReached();
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
        countries.push(countryInfo);
        displayCountryCard(countryInfo);
        displayResetButton();
    } catch (err) {
        // if (!countryInfo) {
        //     displayErrorMessage('getting COVID-19 data to build country statistics', new Error('The country you entered has no COVID-19 data'));
        // } else {
        // }
        displayErrorMessage('getting COVID-19 data to build country statistics', new Error(err));
    }
}

const getCovid19Data = async function (country) {

    // Get COVID-19 data (https://github.com/M-Media-Group/Covid-19-API)
    let countryCOVID19Data = []; // Array
    spinnerSearchingCOVID19Data('on');
    try {
        const covid19CurrentData = await fetch(`https://covid-api.mmediagroup.fr/v1/cases?country=${country}`).then(res => res.json()).then(data => {
            countryCOVID19Data.push(data.All.country);
            countryCOVID19Data.push(data.All.confirmed);
            countryCOVID19Data.push(data.All.recovered);
            countryCOVID19Data.push(data.All.deaths);
            countryCOVID19Data.push(data.All.population);
        });
    } catch (err) {
        // if (!covid19CurrentData) {
        displayErrorMessage('getting COVID-19 data to build country statistics', new Error('The country you entered has no COVID-19 data'));
        // } else {
        //     displayErrorMessage('getting COVID-19 data', new Error(err));
        // }
    }
    try {
        const covid19VaccinesData = await fetch(`https://covid-api.mmediagroup.fr/v1/vaccines?country=${country}`).then(res => res.json()).then(data => {
            countryCOVID19Data.push(data.All.administered);
            countryCOVID19Data.push(data.All.people_partially_vaccinated);
            countryCOVID19Data.push(data.All.people_vaccinated);
        });
    } catch (err) {
        // if (!covid19CurrentData) {
        displayErrorMessage('getting COVID-19 data to build country statistics', new Error('The country you entered has no COVID-19 vaccination data'));
        // } else {
        //     displayErrorMessage('getting COVID-19 data', new Error(err));
        // }
    }

    spinnerSearchingCOVID19Data('off');
    return countryCOVID19Data;
}

// SECTION Search country

const putCountryNameOnSearchBar = function (country) {
    document.querySelector('#search-bar__input__countryToSearch').value = country;
}

// SECTION Event listeners

// Hide spinner
document.querySelector('.spinner').setAttribute("style", "opacity: 0;");

// Automatic geolocation
navigator.geolocation.getCurrentPosition(getCurrentCoords, getCurrentCoordsError, currentGeolocationOptions);

// Add new country button
document.querySelector('.search-bar__btn').addEventListener('click', event => {
    event.preventDefault();
    const countryToSearch = document.querySelector('#search-bar__input__countryToSearch').value;
    // getCovid19Data(countryToSearch);
    buildCountryCard(countryToSearch);
    document.querySelector('#search-bar__input__countryToSearch').value = '';
});

// Reset button
document.querySelector('.reset-btn').addEventListener('click', () => {
    document.querySelector('.reset-btn').classList.add('hidden');
    document.querySelectorAll('.full-country-data-container').forEach(element => element.remove());
    countries.splice(0, countries.length);
    checkCountryLimitReached();
});

// SECTION Countries autocomplete (adapted from https://www.w3schools.com/howto/howto_js_autocomplete.asp)

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    let currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        let a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        let x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        let x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

let countriesListArr = [];
const getCountriesList = async function () {
    try {
        // const countriesList = await fetch('https://api.teleport.org/api/countries/').then(res => res.json()).then(data => data);
        // for (let i = 0; i < countriesList._links['country:items'].length; i++) {
        //     countriesListArr.push(countriesList._links['country:items'][i].name);
        // }
        // Using the same API as the one to get COVID-19 cases so no invalid country is displayed
        const countriesList = await fetch('https://covid-api.mmediagroup.fr/v1/cases').then(e => e.json()).then(data => data);
        for (const [key, value] of Object.entries(countriesList)) {
            // Excluding countries that do not have basic data
            if (value.All.hasOwnProperty('country') &&
                value.All.hasOwnProperty('confirmed') &&
                value.All.hasOwnProperty('recovered') &&
                value.All.hasOwnProperty('deaths') &&
                value.All.hasOwnProperty('population')) {
                countriesListArr.push(key);
            }
        }
    } catch (err) {
        displayErrorMessage('getting list of countries', new Error(err));
    }
};
getCountriesList();
/*initiate the autocomplete function on the "search-bar__input__countryToSearch" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("search-bar__input__countryToSearch"), countriesListArr);

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