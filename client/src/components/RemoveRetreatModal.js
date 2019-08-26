import React, { Component, Fragment } from 'react';
import { removeRetreat } from '../actions/retreatActions';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ListGroupItem,
    ListGroup
} from 'reactstrap';

class RemoveRetreatModal extends Component {
    state = {
        modal: false,
        nestedModal: false,
        closeAll: false,
        retreat_to_delete: null
    };

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    toggleNested = retreat => {
        this.setState({
            nestedModal: !this.state.nestedModal,
            closeAll: false,
            retreat_to_delete: retreat ? retreat : null
        });
    }

    toggleAll = () => {
        this.setState({
            nestedModal: !this.state.nestedModal,
            closeAll: true,
            retreat_to_delete: null
        });
    }

    onSubmit = e => {
        e.preventDefault();
        
        // Send action
        this.props.removeRetreat(this.state.retreat_to_delete.id);

        this.toggleAll();
    }

    get_list = () => {
        if(this.props.retreats){
            return this.props.retreats.map(retreat => {
                return (<ListGroupItem className='d-flex justify-content-between' key={retreat.id} >
                            <h1 className='text-muted small my-auto'>{retreat.name}</h1>
                            <h1 className='text-danger my-auto pointer hover-darken-red small'
                                onClick={() => { this.toggleNested(retreat) } }
                                name={retreat.id} >
                                remove
                                <FontAwesomeIcon icon={faTrash} className='ml-2'/>
                            </h1>
                        </ListGroupItem>)
            })
        }
    }
    
    render() {
        return (
            <Fragment>
                <h1 style={{ borderLeft: '1px solid #ccc' }} 
                    onClick={this.toggle}
                    className='pointer darken-hover my-auto text-center w-50 text-muted small'>
                    REMOVE
                </h1>
                
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle} className='open-sans'>Remove</ModalHeader>
                <ModalBody>
                    <ListGroup>
                        { this.get_list() }
                    </ListGroup>
                    <br />
                    <Modal isOpen={this.state.nestedModal} 
                           toggle={this.toggleNested} 
                           onClosed={this.state.closeAll ? this.toggle : undefined}>
                        <ModalHeader className='text-danger'>Warning!</ModalHeader>
                        <ModalBody>
                            <h6>You are about to remove the following retreat:</h6>
                            <h6 className='text-primary'>
                                {this.state.retreat_to_delete ? this.state.retreat_to_delete.name : null}
                            </h6>
                            <h6>Are you sure you want to delete this retreat and all the information associated with it?</h6>
                        </ModalBody>
                        <ModalFooter>
                            <Button color='dark' onClick={this.toggleNested}>Cancel</Button>{' '}
                            <Button color="danger" onClick={this.onSubmit}>Delete</Button>
                        </ModalFooter>
                    </Modal>
                </ModalBody>
                <ModalFooter>
                    <Button color="dark" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
                </Modal>
            </Fragment>
        );
    }
}

export default connect(
    null,
    { removeRetreat }
)(RemoveRetreatModal);