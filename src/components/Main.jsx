import React, { Component } from 'react';
import Immutable, { Map } from 'immutable';

import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/DropDownMenu';

const {Grid, Row, Col} = require('react-flexbox-grid');

import Chart from './Chart';
import Slider from './Slider';

import API from '../services/api';
import FIPS from '../services/data';

function* rangeGen(from, to, step = 1) {
  for (let i = from; i <= to; i += step) {
    yield i;
  }
}

const settings = {
    minYear: 1980,
    maxYear: 2040,
}

export default class Main extends Component {
    
    constructor(props) {
        super(props);
        
        this.fips1 = this.fips1.bind(this);
        this.fips2 = this.fips2.bind(this);
        this.getAPI = this.getAPI.bind(this);
        this.onSliderChange = this.onSliderChange.bind(this);
        this.onAnimate = this.onAnimate.bind(this);
        
        
        this.FIPSData = FIPS
        .map( (c,i) => <MenuItem value={c.FIPS} key={i} primaryText={c.name} /> );
        
        this.state = {
            year: 2000,
            fips1: 'KR',
            fips2: 'WS',
            fipsData1: Map(),
            fipsData2: Map(),
            interval: -1
        };
        
        // console.log("SelectField", SelectField, "MenuItem", MenuItem);
        
    }
    
    fips1(event, index, value) {
        this.setState({ fips1: value});
        this.getAPI('fipsData1', FIPS[index].FIPS);
    }
    
    fips2(event, index, value) {
        this.setState({ fips2: value});
        this.getAPI('fipsData2', FIPS[index].FIPS);
    }
    
    onSliderChange(value) {
        this.setState({ year: value});
    }
    
    render() {

        console.log("State", this.state);
        
        const max = Math.max(this.state.fipsData1.get('maxYear'), this.state.fipsData2.get('maxYear'));
        
        return (
            <div>
            
                <div>
                    <Slider year={this.state.year} min={settings.minYear} max={settings.maxYear} onChange={this.onSliderChange} onAnimate={ this.onAnimate } />
                </div>
                
                <div className="row">
                    <div className="col-lg-6">
                        <SelectField value={this.state.fips1} onChange={ this.fips1 }>
                            {this.FIPSData}
                        </SelectField>
                        <Chart year={this.state.year} country={this.state.fipsData1} scale={0.1*this.state.fipsData1.get('maxYear')} />
                    </div>
                    
                    <div className="col-lg-6">
                        <SelectField value={this.state.fips2} onChange={ this.fips2 } >
                            {this.FIPSData}
                        </SelectField>
                        <Chart year={this.state.year}  country={this.state.fipsData2} scale={0.1*this.state.fipsData2.get('maxYear')}/>
                    </div>
                </div>

            </div>
        );
    }
    
    onAnimate() {
       
        console.log("On animate", this.state.interval);
        
        if(this.state.interval===-1) {
            clearInterval(this.interval);
            this.state.interval = setInterval( (state => {
                const newYear = this.state.year>=settings.maxYear ? settings.minYear : this.state.year+1;
                this.setState({year: newYear});
            }).bind(this), 500);
        }
        else {
            clearInterval(this.interval);
            this.state.interval = -1;
        }
    }
    
    
    componentDidMount() {
        this.getAPI('fipsData1', this.state.fips1);
        this.getAPI('fipsData2', this.state.fips2);
    
        document.addEventListener("visibilitychange", function() {
            clearInterval(this.state.interval);
            this.state.interval = -1;
        }.bind(this));
        
    }
    
    getAPI(fipsKey, country) {
        
        console.log("Yooo", fipsKey, country);
        
        //let { country } = this.props;
        let years = [...rangeGen(settings.minYear, settings.maxYear, 1)];
        
        // TODO max for max POP
        this.setState({[fipsKey]: Map()});
        const p = API.getCountry(country, years);
        p.then( v => {
            v.name = name;
            console.log("v", v);
            
            v.maxYear = Object.keys(v).reduce(function (previous, key) {
                console.log("v[key].POP", v[key].POP, key);
                const value = parseInt(v[key].POP);
                if( value && !isNaN(value) ) {
                    return Math.max(previous, value );
                } else {
                    return previous;
                }
            }, 0);
            
            const newState = {};
            newState[fipsKey] = Immutable.fromJS(v);
            this.setState(newState);
        })
        
        
        
        return p;
        
    }
    
    
}