import React, { Component, Fragment } from 'react';
import { Alert } from 'reactstrap';

class Alerts extends Component {
    state = {
        msg: this.props.msg,
        color: this.props.color
    }

    componentDidUpdate(prevProps){
        if(prevProps !== this.props){
            this.setState({ ...this.props })
        }
    }

    render() {
        return (
            <Fragment>
                { this.state.msg ? (
                    <Alert color={this.state.color}
                            isOpen={this.state.visible}
                    >{ this.state.msg }</Alert>
                ) : null }
            </Fragment>
        );
    }
}

export default Alerts;