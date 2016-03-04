import axios from 'axios';
import LS from 'local-storage';

function* rangeGen(from, to, step = 1) {
  for (let i = from; i <= to; i += step) {
    yield i;
  }
}

export default class API {
    
    static generateAgeArray() {
        
        let out = [];
        for(let i=0; i<=95; i+=5) {
            out.push("FPOP" + i + "_" + (i+4));
            out.push("MPOP" + i + "_" + (i+4));
        }
        return out;
    }
    
    static reMap(data) {
        let out = {};
        for(let i=0; i<data[0].length; ++i) {
            if(data[0][i] && data[1][i])
               out[data[0][i]] = data[1][i];
        }
        return out;
    }
    
    static getCountry(country, years) {
        
        // LS.clear();
        
        const localStorage = LS.get(country);
        if(localStorage && localStorage.length > 0) {
            console.log("Fetching local storage.", country, localStorage);
            return Promise.resolve(JSON.parse(localStorage));
        }
       
        console.log("Running API", country, years);
        // Make a request for a user with a given ID
        
        const ageArray = API.generateAgeArray();
        const ageString = ageArray.reduce( (a,b) => a + "," + b);
        
        const apiKey = 'd3c3287ae1d0908d35faca6a0a67f7f741a3fb49';
        
        let promises = [];
        for(let year of years) {
            console.log("c:", country, "year:", year);
    
            let url = "http://api.census.gov/data/timeseries/idb/5year?key=+' + apiKey + '&get=NAME,POP,CBR,CDR,E0," + 
                        ageString + "&FIPS=" + country + "&time=" + year;
            
            promises.push(axios.get(url)
            .then(function (response) {
                let out = {};
                out[year] = API.reMap(response.data)
                return out;
            })
            .catch(function (response) {
                console.log(response);
                return undefined;
            }));
            
        }
        
        console.log("Promises", promises);
        
        let pOut = Promise.all(promises).then(values => { 
            console.log(values);
            return values.reduce( (a,b) => Object.assign(a,b) );
        }, f => console.log("API fail", f) );
        
        pOut.then( v => LS(country, JSON.stringify(v) ) );
        
        return pOut;
    }
}