import React, { Component } from 'react';
import { Progress } from 'reactstrap';

class ScoreCard extends Component {

    render() {
        return (
            <div className='ml-2 mr-2 text-center height-80 '>
                <h6 className='text-muted small'>{this.props.data_type.toUpperCase()}</h6>
                <h3>{this.props.data.score}</h3>
                <Progress value={this.props.data.score} />
            </div>
        )
    }
}

export default ScoreCard;