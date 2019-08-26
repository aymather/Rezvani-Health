import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IsLoggedIn from './IsLoggedIn';
import NotLoggedIn from './NotLoggedIn';
import { clearErrors } from '../actions/errorActions';
import { loadUser } from '../actions/authActions';
import { withRouter } from 'react-router';


class AppBody extends Component {

    componentDidMount(){
        this.props.clearErrors();
        this.props.loadUser(this.props.history);
    }

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

export default withRouter(connect(
    mapStateToProps, 
    { loadUser, clearErrors }
)(AppBody));