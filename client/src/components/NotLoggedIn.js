import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Form,
    FormGroup,
    Input,
    Alert
} from 'reactstrap';
import { login } from '../actions/authActions';
import ElementsLogo from './ElementsLogo';

class NotLoggedIn extends Component {
    state = {
        password: '',
        msg: null
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const { password } = this.state;

        // Attempt to login
        this.props.login(password);
    }

    componentDidUpdate(prevProps){
        if(
            prevProps.error !== this.props.error &&
            this.props.error.id === 'LOGIN_FAIL'
        ){
            this.setState({ msg: this.props.error.msg.msg })
        }
    }

    render() {
        return (
            <div style={{ height: '100vh' }}
                 className='container fade-in d-flex flex-column justify-content-center align-items-center w-25'>
                <ElementsLogo className='fade-in mb-5' />
                { this.state.msg
                    ? (<Alert className='w-100' color='danger'>{this.state.msg}</Alert>) 
                    : null }
                <Form className='w-100 fade-in' onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Input
                            type='password'
                            name='password'
                            id='pasword'
                            placeholder='Password'
                            className='mb-3'
                            onChange={this.onChange}
                        />
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    error: state.error
})

export default connect(
    mapStateToProps,
    { login }
)(NotLoggedIn);