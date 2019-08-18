import React, { Component } from 'react';
import { connect } from 'react-redux';

// Props
class TableSleep extends Component {
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

const mapStateToProps = state => ({
    clients: state.clients
})

export default connect(
    mapStateToProps
)(TableSleep);