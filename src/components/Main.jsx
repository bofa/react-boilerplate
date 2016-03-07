import React, { Component } from 'react';

export default class Main extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            dummy: true
        };
        
    }
    
    render() {
        
        return (
            <div>
                Hello world!
            </div>
        );

    }
        
    componentDidMount() {
 
    }

}