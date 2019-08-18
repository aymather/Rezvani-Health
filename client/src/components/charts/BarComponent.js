import React, { Component } from 'react';

class BarComponent extends Component {
    render() {
        const style = {
            height: '25px',
            backgroundColor: this.props.color,
            width: this.props.value > 570 ? 570 : this.props.value,
            borderRadius: '5px',
            display: 'inline-block'
        }
        return (
            <div className='m-2 d-flex align-items-center'>
                <div style={style}></div>
                <span className='ml-2 small text-muted'>{this.props.text}</span>
            </div>
        );
    }
}

export default BarComponent;