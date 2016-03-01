import React, { Component } from 'react';

require('es6-promise').polyfill();
require('isomorphic-fetch');

import {Map} from 'immutable';

function* rangeGen(from, to, step = 1) {
  for (let i = from; i <= to; i += step) {
    yield i;
  }
}

export default class Api extends Component {
    
    constructor() {
        super();
        this.state = {countries: {}};
    }
    
    render() {
        
        let data = "http://api.census.gov/data/timeseries/idb/5year?get=NAME,POP,CBR,CDR,E0,AREA_KM2&FIPS=NO&time=2012";
        
        let countries = this.state.countries;
        
        let c; 
        for (var key in this.state.countries) {
            c = countries[key];
            console.log("c", c);
        }
        
        return (
            <div>
                <h1>Hello, world.</h1>
                {}
            </div>
        );
    }
    
    componentDidMount() {
        
        let { countries } = this.props;
        let years = [...rangeGen(1960, 2060)];
                
        for(let c of countries) {
            
            for(let year of years) {
                fetch('//api.census.gov/data/timeseries/idb/5year?get=NAME,POP&FIPS=+' +c+ '&time=' + year)
                .then(function(response) {
                    if (response.status >= 400) {
                        throw new Error("Bad response from server");
                    }
                    return response.json();
                })
                .then(function(data) {
                    data = this.reMap(data);
                    
                    const newData = {};
                    newData[data.FIPS] = data;
                    this.setState(newData);
                    
                    console.log("State", this.state);
                    
                }.bind(this));
            }
        }
        
        
    }
    
    reMap(data) {
        let out = {};
        for(let i=0; i<data[0].length; ++i) {
            out[data[0][i]] = data[1][i]
        }
        return out;
    }
}
