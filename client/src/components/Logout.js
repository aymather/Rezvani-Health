import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';

export class Logout extends Component {

    onSubmitFunc = () => {
        this.props.logout();
    }

    render(){
        return (
            <Fragment>
                <NavLink onClick={this.onSubmitFunc} href='#'>
                    Logout
                </NavLink>
            </Fragment>
        );
    }
}

export default connect(
    null,
    { logout }
)(Logout);