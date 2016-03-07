import React, { Component } from 'react';

import Main from './components/Main';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


export default class App extends Component {
    
    constructor() {
        super();
        this.state = {};
        
    }
    
    render() {
        
        return (
            <div>
                <Main />
            </div>
        );
    }
    
}