import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

class MacrosPieChart extends Component {
    state = {
        macros: null,
        data: {
            labels: null,
            datasets: null
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false
            }
        }
    }

    componentWillReceiveProps({ macros }){
        var data = [];
        var labels = [];
        for(let [key, val] of Object.entries(macros)){
            labels.push(key);
            data.push(val * 100);
        }
        this.setState({
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ]
                }]
            }
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.data.datasets ?
                    <Pie data={this.state.data} 
                         options={this.state.options}
                         width={100}
                         height={100}
                        /> : null
                }
            </div>
        );
    }
}

export default MacrosPieChart;