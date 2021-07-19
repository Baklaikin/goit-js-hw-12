import Notiflix from "notiflix";

export default class fetchCountries {
    costructor(countryName){
    
        this.country = '';
        
    }

    findCountry(countryName){
        const url = `https://restcountries.eu/rest/v2/name/${this.country}?fields=name;capital;population;flag;languages`;
        
        return fetch(url)
        .then(response => {
            if(response.status === 404){
                Notiflix.Notify.failure("Oops, there is no country with that name");
                throw new Error();
            }
           return response.json();
        })
        .then(data=> {
            if(data.length> 10){
               Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            }
            return data;
        })
    }
     
    get name(){
        return this.country;
    }

    set name(newName) {
        this.country = newName;
    }
}

