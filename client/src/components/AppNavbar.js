import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container,
    NavLink
} from 'reactstrap';
import ElementsLogo from './ElementsLogo';
import Logout from './Logout';
import { withRouter } from 'react-router-dom';

class AppNavbar extends Component {
    
    state = {
        isOpen: false
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    toRetreats = () => {
        this.props.history.push('/retreats');
    }

    render() {
        return (
            <Navbar expand='sm' className='mb-5'>
                <Container>
                    <NavbarBrand href='/'><ElementsLogo /></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className='ml-auto' navbar>
                            <NavItem>
                                <Logout />
                            </NavItem>
                            <NavItem>
                                <NavLink className='open-sans hover-text-muted' onClick={this.toRetreats}>Retreats</NavLink>
                            </NavItem>
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

export default withRouter(connect(
    mapStateToProps
)(AppNavbar));