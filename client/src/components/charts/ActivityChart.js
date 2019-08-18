import React, { Component } from 'react';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';
import {
    Toast,
    ToastBody
} from 'reactstrap';

class ActivityChart extends Component {

    get_options = () => {
        return {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Activity',
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
                yAxes: [{
                    ticks: {
                        stepSize: 1,
                        beginAtZero: true,
                        max: 14
                    },
                    afterTickToLabelConversion : function(q){
                        for(let i = 0; i < q.ticks.length; i++){
                          if (q.ticks[i] === "4"){
                              q.ticks[i] = 'Low';
                          } else if (q.ticks[i] === "7"){
                              q.ticks[i] = 'Moderate';
                          } else if (q.ticks[i] === "10"){
                              q.ticks[i] = 'High';
                          } else {
                              q.ticks[i] = '';
                          }
                        }
                    }
                }]
            }
        }
    }

    createDataset = (day_start, day_end, data_array) => {
        var start = new moment(day_start);
        var end = new moment(day_end);

        var diff = end.diff(start, 'seconds');
        var seconds_2_add = diff / data_array.length;

        var data = [];
        for(let i = 0; i < data_array.length; i++){
            start.add(seconds_2_add, 'seconds');
            if(i === 0){
                data.push({
                    x: new moment(day_start).format('YYYY-MM-DD HH:mm:ss'),
                    y: data_array[i]
                })
            } else if (i === data_array.length - 1){
                data.push({
                    x: new moment(day_end).format('YYYY-MM-DD HH:mm:ss'),
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

    getColors = data => {
        var colors = [];
        for(let obj of data){
            if(obj.y <= 1.05){
                colors.push('rgba(254, 219, 219, 0.75)')
            } else if (obj.y >= 1.05 && obj.y <= 2){
                colors.push('rgba(253, 133, 133, 0.75)')
            } else if (obj.y >= 2 && obj.y <= 3){
                colors.push('rgba(253, 58, 58, 0.75)')
            } else if (obj.y >= 3 && obj.y <= 6){
                colors.push('rgba(255, 0, 0, 0.75)')
            } else if (obj.y > 6){
                colors.push('rgba(255, 0, 0, 1)')
            }
        }
        return colors;
    }

    graphData = () => {
        var data = this.createDataset(
            this.props.day_start,
            this.props.day_end,
            this.props.data
        );
        var backgroundColor = this.getColors(data);
        return {
            datasets: [{
                label: this.props.name,
                backgroundColor,
                data
            }]
        }
    }

    create_body = () => {
        return (
            <Toast className='mx-auto mw-100 p-4'>
                <ToastBody>
                    <Bar data={this.graphData(this.props.data)} options={this.get_options()} />
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

export default ActivityChart;