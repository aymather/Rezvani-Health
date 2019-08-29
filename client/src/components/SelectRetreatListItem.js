import React, { Component } from 'react';
import { selectRetreat } from '../actions/retreatActions';
import { connect } from 'react-redux';
import { ListGroupItem } from 'reactstrap';
import { withRouter } from 'react-router';

class SelectRetreatListItem extends Component {

    select_retreat = () => {
        this.props.selectRetreat(this.props.retreat, this.props.history);
    }

    render() {
        return (
            <ListGroupItem tag='button' 
                            href='#'
                            key={this.props.retreat.id}
                            action
                            className='d-flex justify-content-between'
                            onClick={this.select_retreat}
                        >
                <span>{this.props.retreat.name}</span>
                <span>
                    <span className='small'>
                        Start: { this.props.retreat.date_created }
                    </span>
                    <span className='ml-2 small text-success'>
                        { this.props.retreat.date_completed ? `Completed: ${this.props.retreat.date_completed}` : '(In Progress)'}
                    </span>
                </span>
            </ListGroupItem>
        );
    }
}

export default withRouter(connect(
    null,
    { selectRetreat }
)(SelectRetreatListItem));