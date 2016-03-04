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
        
        console.log("On change", year);
        
        this.setState({year});
        onChange(value);
    }
    
    render() {
        
        const { min, max } = this.props;
        const step = 1/(max - min);
        const value = (this.state.year - min)/(max - min);
        
        
        return (
            <div>
                <TextField
                    value={this.state.year}
                    hintText="Hint Text"
                />
                <MaterialSlider step={step} value={value} onChange={this.onSliderChange}	/>
            </div>
        );
    }
    
}