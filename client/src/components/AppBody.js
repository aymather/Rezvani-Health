import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IsLoggedIn from './IsLoggedIn';
import NotLoggedIn from './NotLoggedIn';

class AppBody extends Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired
    }

    render() {
        return (
            <div>
                { 
                  this.props.isAuthenticated
                  ? <IsLoggedIn />
                  : <NotLoggedIn />
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated,
    error: state.error  
})

export default connect(
    mapStateToProps
)(AppBody);