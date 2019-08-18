import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink
} from 'reactstrap';
import { connect } from 'react-redux';
import { register } from '../actions/authActions';

class Register extends Component {
    state = {
        modal: false,
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        password2: '',
        msg: null
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const { firstname, lastname, username, email, password, password2 } = this.state;
        const newUser = {
            firstname,
            lastname,
            username, 
            email,
            password,
            password2
        }
        // Attempt to register the new user
        this.props.register(newUser);
    }
    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href='#'>
                    Register
                </NavLink>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='firstname'>First Name</Label>
                                <Input
                                    type='text'
                                    name='firstname'
                                    id='firstname'
                                    placeholder='First Name'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Label for='lastname'>Last Name</Label>
                                <Input
                                    type='text'
                                    name='lastname'
                                    id='lastname'
                                    placeholder='Last Name'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Label for='username'>Username</Label>
                                <Input
                                    type='text'
                                    name='username'
                                    id='username'
                                    placeholder='Username'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Label for='email'>Email</Label>
                                <Input
                                    type='email'
                                    name='email'
                                    id='email'
                                    placeholder='Email'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Label for='password'>Password</Label>
                                <Input
                                    type='password'
                                    name='password'
                                    id='password'
                                    placeholder='Password'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Label for='password2'>Confirm Password</Label>
                                <Input
                                    type='password'
                                    name='password2'
                                    id='password2'
                                    placeholder='Confirm Password'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Button color='dark' style={{ marginTop: '2rem' }} block>
                                    Register
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated,
    error: state.error
})

export default connect(
    mapStateToProps,
    { register }
)(Register);