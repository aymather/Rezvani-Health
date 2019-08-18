import React, { Component } from 'react';
import { Progress } from 'reactstrap';

class ScoreCard extends Component {
    get_body = () => {

        if(this.props.data){
            return (
                <div className='ml-2 mr-2 text-center'>
                    <h6>{this.props.data_type}</h6>
                    <h3>{this.props.data.score}</h3>
                    <Progress value={this.props.data.score} />
                </div>
            )
        } else {
            return (
                <div className='h-100'>Data pending...</div>
            )
        }
    }

    render() {
        return (<div className='my-auto h-100'>
                    { this.get_body() }
                </div>)
    }
}

export default ScoreCard;