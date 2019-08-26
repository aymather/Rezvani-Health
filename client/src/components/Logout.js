import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';

export class Logout extends Component {

    onLogout = () => {
        this.props.logout();
    }

    render(){
        return (
            <NavLink onClick={this.onLogout}>
                Logout
            </NavLink>
        );
    }
}

export default connect(
    null,
    { logout }
)(Logout);