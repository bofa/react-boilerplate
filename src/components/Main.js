import React, { Component } from 'react';
import Immutable, { Map } from 'immutable';

import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/DropDownMenu';

import Chart from './Chart';

export default class Main extends Component {
    
    constructor(props) {
        super(props);
        
        this.handleChange = this.handleChange.bind(this);
        
        this.state = {
            countries: ['NO', 'SW'],
            value: 2
        };
        
        // console.log("SelectField", SelectField, "MenuItem", MenuItem);
        
    }
    
    handleChange(event, index, value) {
        this.setState({value: value});
    }
    
    render() {

        const items = [];
        for (let i = 0; i < 100; i++ ) {
            items.push(<MenuItem value={i} key={i} primaryText={`Item ${i}`}/>);
        }

        return (
            <div>
            
                <SelectField value={this.state.value} onChange={this.handleChange}>
                    {items}
                </SelectField>
            
                <Chart country={this.state.countries[0]} />
                <Chart country={this.state.countries[1]} />

            </div>
        );
    }
    
    
}