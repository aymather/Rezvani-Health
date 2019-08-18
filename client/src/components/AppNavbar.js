import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
} from 'reactstrap';

import AppLogo from './AppLogo';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';

class AppNavbar extends Component {
    
    state = {
        isOpen: false
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        const { isAuthenticated, user } = this.props.user;

        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className='navbar-text mr-3'>
                        <strong>Welcome {user ? user.firstname : ''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <Register />
                </NavItem>
                <NavItem>
                    <Login />
                </NavItem>
            </Fragment>
        );

        return (
            <Navbar color='dark' dark expand='sm' className='mb-5'>
                <Container>
                    <NavbarBrand href='/'><AppLogo size='logo-wrap-sm' color='logo-white' /></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className='ml-auto' navbar>
                            {isAuthenticated ? authLinks : guestLinks}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(
    mapStateToProps,
    null
)(AppNavbar);