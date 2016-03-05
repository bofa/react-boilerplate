import React, { Component } from 'react';
import MaterialSlider from 'material-ui/lib/slider';
import TextField from 'material-ui/lib/text-field';

import IconButton from 'material-ui/lib/icon-button';

export default class Slider extends Component {
    
    constructor() {
        super();
        this.state = {
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
        
        const { min, max, year, onAnimate } = this.props;
        const step = 1/(max - min);
        const value = (year - min)/(max - min);
        
        return (
            <div>
                
                <IconButton onMouseDown={onAnimate} iconClassName="muidocs-icon-custom-github" >
                    a
                </IconButton>
                
                <TextField
                    value={year}
                    hintText="Hint Text"
                />
                <MaterialSlider step={step} value={value} onChange={this.onSliderChange}	/>
            </div>
        );
    }
    
}