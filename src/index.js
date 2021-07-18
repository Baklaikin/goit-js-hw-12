import './sass/main.scss';
import debounce from 'lodash/debounce';
import fetchCountries from './fetchCountries';
import countrylist from './templates/countrylist.hbs';
import countryCard from "./templates/countryCard.hbs"
// import Notiflix from "notiflix";

const refs ={
    inputField: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    wrapper: document.querySelector('.country-info')
}

const DEBOUNCE_DELAY = 300;
const country = new fetchCountries();


function onInput(e){
  e.preventDefault();
  clearSearchResults();
  country.name = e.target.value;
  

  country.findCountry().then(data=>{
      console.log(data.length)
      if(data.length===1){
       return countryCardAdd(data[0])
        }
         else{ return addCountriesList(data)
        };

}).finally(debounce(clearInput, DEBOUNCE_DELAY));
}


refs.inputField.addEventListener('input', debounce(
    onInput, DEBOUNCE_DELAY));

    function addCountriesList (data){
        const markup = countrylist(data);
        console.log(markup);
        refs.countryList.insertAdjacentHTML('beforeend', markup);
    }

    function countryCardAdd(data){
        const countryMarkup = countryCard(data)
        console.log(countryMarkup);
        refs.wrapper.insertAdjacentHTML('beforeend',countryMarkup);
    }

    function clearSearchResults(){
        refs.wrapper.innerHTML='';
        refs.countryList.innerHTML='';
    }

    function clearInput(){
        refs.inputField.value = '';
    }