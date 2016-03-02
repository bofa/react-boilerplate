import React, { Component } from 'react';

import Chart from './components/Chart';

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
                <Chart countries={this.state.countries} />
            </div>
        );
    }
    
}
