import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import SelectRetreatListItem from './SelectRetreatListItem';
import AddRetreatModal from './AddRetreatModal';
import RemoveRetreatModal from './RemoveRetreatModal';
import {
    Spinner,
    ListGroup,
    ListGroupItem
} from 'reactstrap';

class SelectRetreat extends Component {

    get_body = () => {
        if(this.props.retreats.isLoading){
            return <div className='mx-auto'><Spinner /></div>
        } else if (this.props.retreats.retreats){
            return this.props.retreats.retreats.map(retreat => {
                return (<SelectRetreatListItem retreat={retreat} key={retreat.id} />)
            })
        }
    }

    render() {
        return (
            <Fragment>
                <h4 className='fade-in text-center open-sans text-muted'>Select a Retreat</h4>
                <ListGroup className='fade-in col-md-8 offset-md-2 col-sm-12 my-3'>
                    <ListGroupItem className='d-flex justify-content-around'>
                        <AddRetreatModal />
                        <RemoveRetreatModal retreats={this.props.retreats.retreats} />
                    </ListGroupItem>
                </ListGroup>
                <ListGroup className='fade-in col-md-8 offset-md-2 col-sm-12 mb-5'>
                    { this.get_body() }
                </ListGroup>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    retreats: state.retreats
})

export default connect(
    mapStateToProps
)(SelectRetreat);