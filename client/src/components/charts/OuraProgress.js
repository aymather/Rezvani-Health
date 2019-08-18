import React, { Component } from 'react';
import { Progress } from 'reactstrap';

class OuraProgress extends Component {
    render() {
        return (
            <div className='w-100 text-center my-3'>
                <div className='d-flex justify-content-between w-75 mx-auto px-2'>
                    <h6 className='small text-muted'>{this.props.title.toUpperCase()}</h6>
                    <h6 className={`small text-${this.props.color}`}>{this.props.subtext}</h6>
                </div>
                <Progress className='w-75 mx-auto' color={this.props.color} value={this.props.val} />
            </div>
        );
    }
}

export default OuraProgress;