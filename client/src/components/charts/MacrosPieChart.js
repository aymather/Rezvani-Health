import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

class MacrosPieChart extends Component {
    state = {
        data: {
            labels: null,
            datasets: null
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: true
            }
        }
    }

    componentWillMount(){
        var { macros } = this.props;
        if(!this.state.data.datasets && macros){
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
    }

    render() {
        return (
            <div>
                {
                    this.state.data.datasets ?
                    <Pie data={this.state.data} 
                         options={this.state.options}
                         width={this.props.width ? this.props.width : 100}
                         height={this.props.height ? this.props.height : 100}
                    /> : null
                }
            </div>
        );
    }
}

export default MacrosPieChart;