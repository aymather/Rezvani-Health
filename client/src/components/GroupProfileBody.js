import React, { Component } from 'react';
import { removeGroup } from '../actions/groupActions';
import {
    Button
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EditGroupMemebersModal from './EditGroupMemebersModal';

class GroupProfileBody extends Component {

    onRemoveGroup = () => {
        if(window.confirm('You are about to delete this group and all the data associated with it, are you sure you want to do this?')){
            this.props.removeGroup(this.props.group.id, this.props.history);
        }
    }

    render() {
        return (
            <div className='container'>
                <h3 className='open-sans text-muted text-center'>
                    {this.props.group.name}
                </h3>
                <div className='d-flex justify-content-center'>
                    <EditGroupMemebersModal group={this.props.group} />
                    <Button className='mx-3 my-5' color='danger' onClick={this.onRemoveGroup}>Delete</Button>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(
    null,
    { removeGroup }
)(GroupProfileBody));