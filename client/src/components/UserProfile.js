import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserProfileBody from './UserProfileBody';
import { 
    Spinner
} from 'reactstrap';

class UserProfile extends Component {
    state = {
        client: null
    }

    clientToState = id => {
        var found = false;
        // Get the correct client from state
        for(let client of this.props.clients.clients){
            if(client.id === id){
                this.setState({ client });
                found = true;
                break;
            }
        }
        if(!found) this.setState({ client: 'x' })
    }

    componentDidMount(){
        if(!this.state.client &&
            !this.props.clients.isLoading &&
            this.props.clients.clients
         ) {
             const { id } = this.props.match.params;
             this.clientToState(id);
         }
    }

    componentDidUpdate(){
        if(!this.state.client &&
           !this.props.clients.isLoading &&
           this.props.clients.clients
        ) {
            const { id } = this.props.match.params;
            this.clientToState(id);
        }
    }

    get_body = () => {
        if(!this.state.client){
            return <div className='text-center'><Spinner color='dark' /></div>
        } else if (this.state.client === 'x'){
            return <h1>404 Not Found</h1>
        } else return <UserProfileBody client={this.state.client} />;
    }

    render() {
        return (
            <div className='container'>
                { this.get_body() }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    clients: state.clients
})

export default connect(
    mapStateToProps
)(UserProfile);