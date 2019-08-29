import React, { Component } from 'react';
import {
    ListGroupItem,
    ListGroupItemHeading,
    Col,
    Container
} from 'reactstrap';
import OuraScores from './OuraScores';
import ClientInfoCard from './ClientInfoCard';
import { Link } from 'react-router-dom';

class ClientListItem extends Component {
    render() {
        return (
            <ListGroupItem key={this.props.client.id} className="justify-content-between">
                <ListGroupItemHeading className='d-flex justify-content-between align-items-center'>
                    <div className='text-center text-muted mx-auto my-2 darken-hover open-sans'>
                        <Link to={`/view/${this.props.client.id}`}>
                            {this.props.client.firstname + ' ' + this.props.client.lastname}
                        </Link>
                    </div>
                </ListGroupItemHeading>
                <Container className='offset-md-1'>
                    <Col md={{ size: 5 }} className='d-inline-block mx-auto text-center'>
                        <OuraScores client={this.props.client} className='mx-auto text-center'/>
                    </Col>
                    <Col md={{ size: 5 }} className='d-inline-block mx-auto text-center'>
                        <ClientInfoCard client={this.props.client} />
                    </Col>
                </Container>
            </ListGroupItem>
        );
    }
}

export default ClientListItem;