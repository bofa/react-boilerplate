import React, { Component } from 'react';
import MaterialSlider from 'material-ui/lib/slider';
import TextField from 'material-ui/lib/text-field';

import IconButton from 'material-ui/lib/icon-button';

import PlayIcon from 'material-ui/lib/svg-icons/av/play-arrow';
import PauseIcon from 'material-ui/lib/svg-icons/av/pause';

import CardText from 'material-ui/lib/card/card-text';

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
        
        onChange(Math.round(year));
    }
    
    render() {
        
        const { min, max, year, onAnimate, animate } = this.props;
        const step = 1/(max - min);
        const value = (year - min)/(max - min);
        
        var play
        if (animate) {
            play = <PlayIcon onMouseDown={() => {}} />;
        } else {
            play = <PauseIcon onMouseDown={() => {}} />;
        }
        
        return (
            <div className="row">
                    
                <IconButton onMouseDown={onAnimate} className="col-xs-1">
                    {play}
                </IconButton>
                
                <CardText className="col-xs-1">{year}</CardText>
                
                <MaterialSlider className="col-xs-8" step={step} value={value} onChange={this.onSliderChange}	/>
            </div>
        );
    }
    
}