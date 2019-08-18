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
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import PropTypes from 'prop-types';

class Login extends Component {
    state = {
        modal: false,
        username: '',
        password: '',
        msg: null
    }

    componentDidUpdate(prevProps){
        const { error, isAuthenticated } = this.props;
        if(error !== prevProps.error){
            if(error.id === 'LOGIN_FAIL'){
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        // If authenticated, close modal
        if (this.state.modal) {
            if(isAuthenticated) {
                this.toggle();
            }
        }
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
        this.props.clearErrors();
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const { username, password } = this.state;
        const user = {
            username,
            password
        };
        // Attempt to login
        this.props.login(user);
    }
    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href='#'>
                    Login
                </NavLink>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>
                        { this.state.msg
                          ? (<Alert color='danger'>{this.state.msg}</Alert>) 
                          : null }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='username'>Username</Label>
                                <Input 
                                    type='text'
                                    name='username'
                                    id='username'
                                    placeholder='Username'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />

                                <Label for='password'>Password</Label>
                                <Input 
                                    type='password'
                                    name='password'
                                    id='pasword'
                                    placeholder='Password'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />

                                <Button color='dark' style={{ marginTop: '2rem' }} block>
                                    Login
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
    { login, clearErrors }
)(Login);