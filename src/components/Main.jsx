import React, { Component } from 'react';
import Immutable, { Map } from 'immutable';

import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/DropDownMenu';

import Chart from './Chart';
import Slider from './Slider';

import API from '../services/api';

function* rangeGen(from, to, step = 1) {
  for (let i = from; i <= to; i += step) {
    yield i;
  }
}

const settings = {
    minYear: 2000,
    maxYear: 2015,
}

export default class Main extends Component {
    
    constructor(props) {
        super(props);
        
        this.fips1 = this.fips1.bind(this);
        this.fips2 = this.fips2.bind(this);
        this.getAPI = this.getAPI.bind(this);
        this.onSliderChange = this.onSliderChange.bind(this);
        
        function compare(a,b) {
            if (a.name < b.name)
                return -1;
            else if (a.name > b.name)
                return 1;
            else 
                return 0;
        }
        
        this.FIPS = [
            {
                FIPS: 'AA',
                name: 'Aruba'
            },
            {
                FIPS: 'AC',
                name: 'Antigua and Barbuda'
            },
            {
                FIPS: 'MX',
                name: 'Mexico'
            },
            {
                FIPS: 'BX',
                name: 'Brunei'
            },
            {
                FIPS: 'QA',
                name: 'Qatar'
            },
            {
                FIPS: 'SY',
                name: 'Syria'
            },
            {
                FIPS: 'PO',
                name: 'Portugal'
            },
            {
                FIPS: 'KN',
                name: 'Korea, North'
            },
            {
                FIPS: 'WS',
                name: 'Samoa'
            },
            {
                FIPS: 'SW',
                name: 'Sweden'
            },
            {
                FIPS: 'SZ',
                name: 'Switzerland'
            },
            {
                FIPS: 'UP',
                name: 'Ukraine'
            },
            {
                FIPS: 'KR',
                name: 'Kiribati'
            },
            {
                FIPS: 'NG',
                name: 'Niger'
            },
            {
                FIPS: 'NO',
                name: 'Norway'
            },
        ].sort(compare);
        
        this.FIPSData = this.FIPS.map( (c,i) => <MenuItem value={c.FIPS} key={i} primaryText={c.name} /> );
        
        this.state = {
            year: 2000,
            fips1: 'KR',
            fips2: 'WS',
            fipsData1: Map(),
            fipsData2: Map()
        };
        
        // console.log("SelectField", SelectField, "MenuItem", MenuItem);
        
    }
    
    fips1(event, index, value) {
        this.setState({ fips1: value});
        this.getAPI('fipsData1', this.FIPS[index].FIPS);
    }
    
    fips2(event, index, value) {
        this.setState({ fips2: value});
        this.getAPI('fipsData2', this.FIPS[index].FIPS);
    }
    
    onSliderChange(value) {
        this.setState({ year: value});
    }
    
    render() {

        console.log("State", this.state);

        return (
            <div>
                <div>
                    <Slider year={this.state.year} min={settings.minYear} max={settings.maxYear} onChange={this.onSliderChange} />
                </div>
                
                <div className="row">
                    <div className="col-xs-6">
                        <SelectField value={this.state.fips1} onChange={ this.fips1 }>
                            {this.FIPSData}
                        </SelectField>
                        <Chart year={this.state.year} country={this.state.fipsData1} />
                    </div>
                    
                    <div className="col-xs-6">
                        <SelectField value={this.state.fips2} onChange={ this.fips2 }>
                            {this.FIPSData}
                        </SelectField>
                        <Chart year={this.state.year}  country={this.state.fipsData2} />
                    </div>
                </div>

            </div>
        );
    }
    
    componentDidMount() {
        this.getAPI('fipsData1', this.state.fips1);
        this.getAPI('fipsData2', this.state.fips2);
    }
    
    getAPI(fipsKey, country) {
        
        console.log("Yooo", fipsKey, country);
        
        //let { country } = this.props;
        let years = [...rangeGen(settings.minYear, settings.maxYear, 1)];
        
        const p = API.getCountry(country, years);
        p.then( v => {
            v.name = name;
            const newState = {};
            newState[fipsKey] = Immutable.fromJS(v);
            this.setState(newState);
        })
        
    }
    
    
}