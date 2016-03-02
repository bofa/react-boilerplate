import React, { Component } from 'react';
import addons from 'react-addons';

require('es6-promise').polyfill();
require('isomorphic-fetch');
import axios from 'axios';

import Immutable, { Map } from 'immutable';

function* rangeGen(from, to, step = 1) {
  for (let i = from; i <= to; i += step) {
    yield i;
  }
}

export default class Api extends Component {
    
    constructor() {
        super();
        this.state = 
            {
                NO: Map()
            }
        ;
    }
    
    render() {
        return (
            <div>
                <h1>Hello, world.</h1>
                {
                    this.state.NO.map( (s,e) => (
                        <div><h3>{e}</h3>:{s}</div>
                    ))
                }
            </div>
        );
    }
    
    generateAgeArray() {
        
        let out = [];
        for(let i=0; i<=95; i+=5) {
            out.push("FPOP" + i + "_" + (i+4));
            out.push("MPOP" + i + "_" + (i+4));
        }
        return out;
    }
    
    componentDidMount() {
        
        // Make a request for a user with a given ID
        
        const ageArray = this.generateAgeArray();
        const ageString = ageArray.reduce( (a,b) => a + "," + b);
        
        console.log("ageString", ageString);
        
        let { countries } = this.props;
        //let years = [...rangeGen(1960, 2060), 5];
        let years = [...rangeGen(2011, 2011+10, 5)];
        
        for(let c of countries) {
            
            for(let year of years) {
                console.log("c:", c, "year:", year);
        
                let url = "http://api.census.gov/data/timeseries/idb/5year?key=09befa8408a54a731b74a37f7b816fee2346d506&get=NAME,POP,CBR,CDR,E0," + ageString + "&FIPS=NO&time=" + year;
                
                axios.get(url)
                .then(function (response) {

                    console.log(response.data);
                    const data = this.reMap(response.data);

                    const c = data.FIPS;
                    const t = data.time;
                    
                    console.log("state1", this.state, "data", data);
                    
                    const newState = {...this.state}
                    newState[c] = this.state[c].setIn([t], Map(data));
                    this.setState(newState);
                    
                    console.log("State2", newState);
                }.bind(this))
                .catch(function (response) {
                    console.log(response);
                });
                
            }
        }
        
        
    }
    
    reMap(data) {
        let out = {};
        for(let i=0; i<data[0].length; ++i) {
            if(data[0][i] && data[1][i])
               out[data[0][i]] = data[1][i];
        }
        return out;
    }
}
