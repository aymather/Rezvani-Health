import React, { Component } from 'react';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import {
    Toast,
    ToastBody
} from 'reactstrap';

class SleepChart extends Component {

    get_options = title => {
        var yAxes = [];
        if(title === 'Sleep Cycle'){
            yAxes.push({
                afterTickToLabelConversion : function(q){
                    for(let i = 0; i < q.ticks.length; i++){
                      if(q.ticks[i] === '1.0'){
                          q.ticks[i] = 'Deep';
                      } else if (q.ticks[i] === '2.0'){
                          q.ticks[i] = 'Light';
                      } else if (q.ticks[i] === '3.0'){
                          q.ticks[i] = 'REM';
                      } else if (q.ticks[i] === '4.0'){
                          q.ticks[i] = 'Awake';
                      } else {
                          q.ticks[i] = '';
                      }
                    }
                }
            })
        }
        return {
            legend: {
                display: false
            },
            elements: {
                point: {
                    radius: 0
                },
                line: {
                    tension: 0
                }
            },
            title: {
                display: true,
                text: title,
                fontColor: "#333",
                fontSize: 14
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    gridLines: {
                        color: 'rgba(0, 0, 0, 0)'
                    }
                }],
                yAxes
            }
        }
    }

    createDataset = (bedtime_start, bedtime_end, data_array) => {
        var start = new moment(bedtime_start);
        var end = new moment(bedtime_end);

        var diff = end.diff(start, 'seconds');
        var seconds_2_add = diff / data_array.length;

        var data = [];
        for(let i = 0; i < data_array.length; i++){
            start.add(seconds_2_add, 'seconds');
            if(i === 0){
                data.push({
                    x: new moment(bedtime_start).format('YYYY-MM-DD HH:mm:ss'),
                    y: data_array[i]
                })
            } else if (i === data_array.length - 1){
                data.push({
                    x: new moment(bedtime_end).format('YYYY-MM-DD HH:mm:ss'),
                    y: data_array[i]
                })
            } else {
                data.push({
                    x: start.format('YYYY-MM-DD HH:mm:ss'),
                    y: data_array[i]
                })
            }
        }

        // Replace 0 values with null
        for(let i=0;i<data.length;i++){if(data[i].y===0)data[i].y=null};

        return data;
    }

    graphData = () => {
        return {
            datasets: [{
                label: this.props.name,
                borderColor: 'rgba(31, 230, 234, 0.8)',
                fill: false,
                data: this.createDataset(
                    this.props.bedtime_start,
                    this.props.bedtime_end,
                    this.props.data
                ),
                steppedLine: this.props.title === 'Sleep Cycle' ? true : false
            }]
        }
    }

    create_body = () => {
        return (
            <Toast className='mx-auto my-2 mw-100 p-4'>
                <ToastBody>
                    <Line data={this.graphData(this.props.data)} options={this.get_options(this.props.title)} />
                </ToastBody>
            </Toast>
        )
    }

    render() {
        return (
            <div>
                { this.create_body() }
            </div>
        );
    }
}

export default SleepChart;