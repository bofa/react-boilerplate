import React, { Component } from 'react';

import Api from './components/api';

require('es6-promise').polyfill();
require('isomorphic-fetch');

export default class App extends Component {
    
    constructor() {
        super();
        this.state = {countries: ['NO']};
    }
    
    render() {
        
        return (
            <div>
                <Api countries={this.state.countries} />
                <h1>Hello, world.</h1>
                {JSON.stringify(this.state)}
            </div>
        );
    }
    
}
