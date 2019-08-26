import React, { Component, Fragment } from 'react';
import { addRetreat } from '../actions/retreatActions';
import { connect } from 'react-redux';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

class AddRetreatModal extends Component {
    state = {
        name: ''
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
        
        // Send action
        this.props.addRetreat(this.state.name);

        if(this.state.modal){
            this.setState({ modal: false })
        }
    }
    
    render() {
        return (
            <Fragment>
                <h1 className='pointer darken-hover my-auto text-center text-muted small w-50'
                    onClick={this.toggle}>
                    ADD
                </h1>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle} 
                                 className='open-sans'>
                            Create New Retreat
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='firstname'>Name</Label>
                                <Input
                                    type='text'
                                    name='name'
                                    placeholder='Who... are we?'
                                    className='mb-3'
                                    onChange={this.onChange}
                                />
                                <Button color='dark' style={{ marginTop: '2rem' }} block>
                                    Create
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </Fragment>
        );
    }
}

export default connect(
    null,
    { addRetreat }
)(AddRetreatModal);