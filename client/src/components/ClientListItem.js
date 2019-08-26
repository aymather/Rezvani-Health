import React, { Component } from 'react';
import {
    ListGroupItem,
    ListGroupItemHeading
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
                    {/* <div className='float-right'>
                        <Button color='info'
                                className='mr-3'
                                href={this.props.oura_uri}
                        >Authenticate</Button>
                        <Button onClick={this.props.handle_removeClient} 
                                name={this.props.client.id}
                                color='danger' 
                                className='mr-3'
                        >Remove</Button>
                    </div> */}
                </ListGroupItemHeading>
                <div className='d-flex justify-content-around align-items'>
                    <OuraScores client={this.props.client} />
                    {/* <MacrosPieChart macros={this.props.client.Macros} /> */}
                    <ClientInfoCard client={this.props.client} />
                </div>
            </ListGroupItem>
        );
    }
}

export default ClientListItem;