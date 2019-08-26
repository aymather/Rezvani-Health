import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeClient } from '../actions/clientActions';
import { ListGroup } from 'reactstrap';
import { ouraConfig } from '../config';
import oura from 'oura';
import ClientListItem from './ClientListItem';
import { Input, Button } from 'reactstrap';

class ClientList extends Component {

    state = {
        searchText: null
    }

    handle_removeClient = e => {
        e.preventDefault();

        var ans = window.confirm("Are you sure you want to remove this client along with all their data?");

        if(ans){
            this.props.removeClient(e.target.name);
        };
    }

    get_oura_uri = client_id => {

        let state = {
            token: localStorage.getItem('token'),
            client_id
        }

        // Build options object for authentication
        let options = {
            clientId: ouraConfig.clientId,
            clientSecret: ouraConfig.clientSecret,
            redirectUri: ouraConfig.authCallbackUri,
            state: JSON.stringify(state)
        }

        let authClient = oura.Auth(options);

        return authClient.code.getUri();
    }

    get_body = () => {
        if(this.props.clients.clients){
            return this.props.clients.clients.map(client => {
                if(!this.state.searchText || this.state.searchText.length === 0){
                    return (
                        <ClientListItem client={client}
                                        handle_removeClient={this.handle_removeClient}
                                        oura_uri={this.get_oura_uri(client.id)}
                                        key={client.id}
                                    />
                    )
                } else {
                    const regex = new RegExp(`^${this.state.searchText}`, 'gi');
                    const name = client.firstname + ' ' + client.lastname;

                    if(name.match(regex)){
                        return (
                            <ClientListItem client={client}
                                            handle_removeClient={this.handle_removeClient}
                                            oura_uri={this.get_oura_uri(client.id)}
                                            key={client.id}
                                        />
                        )
                    }
                }
            })
        }
    }

    searchChange = e => {
        this.setState({ searchText: e.target.value })
    }

    render() {
        return (
            <div>
                <div className='d-flex justify-content-between mt-4 align-items-center'>
                    <Button href='/new-client'
                            color='primary'
                    >Create New Client +</Button>
                    <Input
                        type="search"
                        name="search"
                        placeholder="Search"
                        style={{ float: 'right' }}
                        className='d-inline-block w-25'
                        onChange={this.searchChange}
                    />
                </div>
                <ListGroup className='mt-4'>
                    {this.get_body()}
                </ListGroup>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    clients: state.clients
})

export default connect(
    mapStateToProps,
    { removeClient }
)(ClientList);