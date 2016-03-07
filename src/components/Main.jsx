import React, { Component } from 'react';

export default class Main extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            dummy: true
        };
        
    }
    
    render() {
        
        const max = Math.max(this.state.fipsData1.get('maxYear'), this.state.fipsData2.get('maxYear'));
        
        return (
            <div>
            
            </div>
        );

    }
        
    componentDidMount() {
 
    }

}