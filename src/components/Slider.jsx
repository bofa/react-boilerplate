import React, { Component } from 'react';
import MaterialSlider from 'material-ui/lib/slider';
import TextField from 'material-ui/lib/text-field';

export default class Slider extends Component {
    
    constructor() {
        super();
        this.state = {
            year: 1960
        };
        
        this.onSliderChange = this.onSliderChange.bind(this);
    }
    
    componentWillReceiveProps() {
    
    }
    
    onSliderChange(event, value) {
        
        const { min, max, onChange } = this.props;
        let year = min + (max-min)*value;
        
        console.log("On change", min, max, value, year);
        
        onChange(Math.round(year));
    }
    
    render() {
        
        const { min, max, year } = this.props;
        const step = 1/(max - min);
        const value = (year - min)/(max - min);
        
        console.log("minmax", year, step, value);
        
        return (
            <div>
                <TextField
                    value={year}
                    hintText="Hint Text"
                />
                <MaterialSlider step={step} value={value} onChange={this.onSliderChange}	/>
            </div>
        );
    }
    
}