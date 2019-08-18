import React, { Component } from 'react';
import {
    ListGroupItem,
    ListGroupItemHeading,
    Button
} from 'reactstrap';
import MacrosPieChart from './charts/MacrosPieChart';
import OuraScores from './OuraScores';
import ClientInfoCard from './ClientInfoCard';

class ClientListItem extends Component {
    render() {
        return (
            <ListGroupItem key={this.props.client.id} className="justify-content-between">
                <ListGroupItemHeading className='d-flex justify-content-between align-items-center'>
                    <div>
                        <span>{this.props.client.firstname + ' ' + this.props.client.lastname}</span>
                    </div>
                    <div className='float-right'>
                        <Button color='info'
                                className='mr-3'
                                href={this.props.oura_uri}
                        >Authenticate</Button>
                        <Button onClick={this.props.handle_removeClient} 
                                name={this.props.client.id}
                                color='danger' 
                                className='mr-3'
                        >Remove</Button>
                    </div>
                </ListGroupItemHeading>
                <div className='d-flex justify-content-around align-items-center'>
                    <OuraScores client={this.props.client} />
                    {/* <MacrosPieChart macros={this.props.client.Macros} /> */}
                    <ClientInfoCard client={this.props.client} />
                </div>
            </ListGroupItem>
        );
    }
}

export default ClientListItem;