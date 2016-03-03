import React, { Component } from 'react';
import Immutable, { Map } from 'immutable';

import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/DropDownMenu';

import Chart from './Chart';

import API from '../services/api';

function* rangeGen(from, to, step = 1) {
  for (let i = from; i <= to; i += step) {
    yield i;
  }
}

export default class Main extends Component {
    
    constructor(props) {
        super(props);
        
        this.fips1 = this.fips1.bind(this);
        this.fips2 = this.fips2.bind(this);
        this.getAPI = this.getAPI.bind(this);
        
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
                FIPS: 'KR',
                name: 'Kiribati'
            },
        ]
        
        this.FIPSData = this.FIPS.map( (c,i) => <MenuItem value={c.FIPS} key={i} primaryText={c.name} /> );
        
        this.state = {
            fips1: 'KR',
            fips2: 'WS',
            value: 2,
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
    
    render() {

        console.log("State", this.state);

        return (
            <div>
            
                <SelectField value={this.state.fips1} onChange={ this.fips1 }>
                    {this.FIPSData}
                </SelectField>
                
                <SelectField value={this.state.fips2} onChange={ this.fips2 }>
                    {this.FIPSData}
                </SelectField>
            
                <Chart country={this.state.fipsData1} />
                <Chart country={this.state.fipsData2} />

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
        let years = [...rangeGen(2011, 2011+10, 5)];
        
        const p = API.getCountry(country, years);
        p.then( v => {
            v.name = name;
            const newState = {};
            newState[fipsKey] = Immutable.fromJS(v);
            this.setState(newState);
        })
        
    }
    
    
}