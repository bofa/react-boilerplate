import React, { Component } from 'react';
import Immutable, { Map } from 'immutable';
import axios from 'axios';

global.Highcharts = require('highcharts');
//var HighchartsMore = require('highcharts-more');
//HighchartsMore(global.Highcharts);
var ReactHighcharts = require('react-highcharts');

export default class Chart extends Component {
    
    constructor() {
        super();
        this.state = {
        
        };
    }
    
    componentWillReceiveProps() {
        // this.componentDidMount();
    }
    
    render() {
        
        const { country, year } = this.props;
        
        const data = country.toJS();
        
        console.log("SDF", data);
        
        // const year = 2011;
        
        const ageArray = this.generateAgeArray();
        const menArray = ageArray.filter(e => e.charAt(0)==='M');
        const womanArray = ageArray.filter(e => e.charAt(0)==='F');
        
        //const demogrpyData = country.get() data[this.state.contry];
        
        if(!country) {
            return false;
        }
        
        const menData = menArray.map(e => -parseInt(country.getIn([''+year, e])));
        const womanData = womanArray.map(e => parseInt(country.getIn([''+year, e])));
        
        console.log("menData", menData);
        
        // Age categories
        const categories = ['0-4', '5-9', '10-14', '15-19',
                            '20-24', '25-29', '30-34', '35-39', '40-44',
                            '45-49', '50-54', '55-59', '60-64', '65-69',
                            '70-74', '75-79', '80-84', '85-89', '90-94',
                            '95-99', '100 + '];
        
        const config = {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Population pyramid for ' + this.state.name + ', ' + year
            },
            subtitle: {
                text: 'Source: <a href="http://populationpyramid.net/germany/2015/">Population Pyramids of the World from 1950 to 2100</a>'
            },
            xAxis: [{
                categories: categories,
                reversed: false,
                labels: {
                    step: 1
                }
            }, { // mirror axis on right side
                opposite: true,
                reversed: false,
                categories: categories,
                linkedTo: 0,
                labels: {
                    step: 1
                }
            }],
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return Math.abs(this.value);
                    }
                }
            },

            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                        'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                }
            },

            series: [{
                name: 'Male',
                data: menData,
                animation: false,
            }, {
                name: 'Female',
                data: womanData,
                animation: false,
            }]
        }
        
        
        return (
            <div>
                <ReactHighcharts config={config}></ReactHighcharts>
            </div>
        );
    }
    
    generateAgeArray() {
        
        let out = [];
        for(let i=0; i<=95; i+=5) {
            out.push("FPOP" + i + "_" + (i+4));
            out.push("MPOP" + i + "_" + (i+4));
        }
        return out;
    }
    
    reMap(data) {
        let out = {};
        for(let i=0; i<data[0].length; ++i) {
            if(data[0][i] && data[1][i])
               out[data[0][i]] = data[1][i];
        }
        return out;
    }
    
}