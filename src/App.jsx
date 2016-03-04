import React, { Component } from 'react';

import Chart from './components/Chart';
import Main from './components/Main';

require('flexboxgrid/css/flexboxgrid.min.css');

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

require('es6-promise').polyfill();

export default class App extends Component {
    
    constructor() {
        super();
        this.state = {countries: ['NO', 'SW']};
    }
    
    render() {
        
        return (
            <div>
                <Main />
            </div>
        );
    }
    
}
