import React, { Component } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    ListGroupItemText,
    ListGroupItem,
    Button,
    ListGroup,
    Spinner
} from 'reactstrap';

import { editGroupMembers } from '../actions/groupActions';
import { connect } from 'react-redux';
import Checkbox from './Checkbox';

class EditGroupMembersModal extends Component {
    state = {
        modal: false,
        checkedItems: {}
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onSubmit = e => {
        e.preventDefault();

        this.props.editGroupMembers(this.props.group.id, this.state.checkedItems);

        if(this.state.modal){
            this.toggle();
        }
    }

    handleChange = (item, isChecked) => {
        var stateCopy = this.state.checkedItems;
        stateCopy[item] = isChecked;
        this.setState({ checkedItems: stateCopy });
    }

    createBody(){
        if(!this.props.clients.isLoading && this.props.clients.clients !== null){
            var name = null;
            return this.props.clients.clients.map(client => {
                name = client.firstname + ' ' + client.lastname;
                return (
                    <ListGroupItem className='d-flex justify-content-between align-items-center'
                                    key={client.id}
                    >
                        <ListGroupItemText className='mb-0'>{ name }</ListGroupItemText>
                        <Checkbox onChange={this.handleChange} type='checkbox' name={client.id} 
                                  checked={this.props.group.members.indexOf(client.id) !== -1 ? true : false} />
                    </ListGroupItem>
                );
            })
        } else {
            return (<ListGroupItem className='d-flex justify-content-center'><Spinner color='dark' /></ListGroupItem>);
        }
    }

    render() {
        return (
            <div>
                <Button onClick={this.toggle} 
                        color='info'
                        className='mr-3'
                >Edit</Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit Group Members</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <Button className='mb-3' block color='primary'>Submit</Button>
                            <ListGroup>
                                { this.createBody() }
                            </ListGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        clients: state.clients
    }
}

export default connect(
    mapStateToProps,
    { editGroupMembers }
)(EditGroupMembersModal);