import React, { Component } from 'react';
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
import { addGroup } from '../actions/groupActions';
import { connect } from 'react-redux';

class AddGroupModal extends Component {
    state = {
        modal: false,
        group_name: '',
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

        this.props.addGroup(this.state.group_name);

        if(this.state.modal){
            this.toggle();
        }
    }

    render() {
        return (
            <div>
                <Button onClick={this.toggle} 
                        color='primary'
                        className='mt-4'
                >Create New Group +</Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Create Group</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='firstname'>Group Name</Label>
                                <Input
                                    type='text'
                                    name='group_name'
                                    id='group_name'
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
            </div>
        );
    }
}

export default connect(
    null,
    { addGroup }
)(AddGroupModal);