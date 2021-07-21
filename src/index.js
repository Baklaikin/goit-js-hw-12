import './sass/main.scss';
import debounce from 'lodash/debounce';
import fetchCountries from './fetchCountries';
import countrylist from './templates/countrylist.hbs';
import countryCard from "./templates/countryCard.hbs"

const refs = {
    inputField: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    wrapper: document.querySelector('.country-info')
}

const DEBOUNCE_DELAY = 300;
const country = new fetchCountries();


function onInput(e) {
    e.preventDefault();
    clearSearchResults();
    country.name = e.target.value.trim();
    if (country.name !== '') {
        country.findCountry().then(data => {
            if (data.length === 1) {
                return countryCardAdd(data[0])
            } else if (data.length > 10) {
                refs.countryList.innerHTML = '';
            }
            else {
                return addCountriesList(data)
            };

        })
    }


}


refs.inputField.addEventListener('input', debounce(
    onInput, DEBOUNCE_DELAY, {
    leading: false,
    trailing: true,
}));

function addCountriesList(data) {
    const markup = countrylist(data);
    refs.countryList.insertAdjacentHTML('beforeend', markup);
}

function countryCardAdd(data) {
    const countryMarkup = countryCard(data)
    refs.wrapper.insertAdjacentHTML('beforeend', countryMarkup);
}

function clearSearchResults() {
    refs.wrapper.innerHTML = '';
    refs.countryList.innerHTML = '';

}
